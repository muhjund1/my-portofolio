import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method tidak diizinkan." }, 405);
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return jsonResponse({ error: "Login admin diperlukan." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const mailFrom = Deno.env.get("MAIL_FROM");
  if (!supabaseUrl || !anonKey || !resendApiKey || !mailFrom) {
    return jsonResponse({ error: "Konfigurasi server belum lengkap." }, 500);
  }

  let payload: { messageId?: unknown; reply?: unknown };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Data permintaan tidak valid." }, 400);
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ error: "Data permintaan tidak valid." }, 400);
  }
  const messageId = payload.messageId;
  const reply = typeof payload.reply === "string" ? payload.reply.trim() : "";
  if (typeof messageId !== "number" || !Number.isSafeInteger(messageId) || messageId <= 0 || !reply || reply.length > 5000) {
    return jsonResponse({ error: "ID pesan atau isi balasan tidak valid." }, 400);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  if (userError || !user) {
    return jsonResponse({ error: "Sesi login tidak valid." }, 401);
  }

  const { data: admin, error: adminError } = await userClient
    .from("admin")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (adminError) {
    return jsonResponse({ error: "Gagal memeriksa akses admin." }, 500);
  }
  if (admin?.role !== "admin") {
    return jsonResponse({ error: "Akses admin diperlukan." }, 403);
  }

  const { data: message, error: messageError } = await userClient
    .from("messages")
    .select("id, name, email, subject")
    .eq("id", messageId)
    .maybeSingle();
  if (messageError) {
    return jsonResponse({ error: "Gagal membaca pesan." }, 500);
  }
  if (!message) {
    return jsonResponse({ error: "Pesan tidak ditemukan." }, 404);
  }

  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(`${messageId}:${reply}`),
  );
  const idempotencyKey = `message-reply-${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from: mailFrom,
      to: [message.email],
      reply_to: message.email,
      subject: `Re: ${message.subject || "Pesan dari portfolio"}`,
      text: `Halo ${message.name},\n\n${reply}\n\nSalam,\nMuhammad Jundi`,
    }),
  });
  if (!emailResponse.ok) {
    const detail = await emailResponse.text();
    console.error("Resend email request failed:", emailResponse.status, detail);
    return jsonResponse({ error: "Email gagal dikirim. Periksa konfigurasi Resend dan domain pengirim." }, 502);
  }

  const { error: updateError } = await userClient
    .from("messages")
    .update({ status: "confirmed", reply, replied_at: new Date().toISOString() })
    .eq("id", messageId);
  if (updateError) {
    console.error("Email sent but message status update failed:", updateError);
    return jsonResponse({ error: "Email terkirim, tetapi status pesan gagal diperbarui. Periksa dashboard sebelum mencoba mengirim ulang." }, 500);
  }

  return jsonResponse({ ok: true }, 200);
});

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
