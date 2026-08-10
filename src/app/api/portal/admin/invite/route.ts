import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, fullName, track } = await request.json();
  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Create user via admin API (sends invite email)
  const { data: newUser, error: createError } =
    await admin.auth.admin.createUser({
      email,
      email_confirm: false,
      user_metadata: { full_name: fullName },
    });

  if (createError) {
    return Response.json({ error: createError.message }, { status: 400 });
  }

  // Create profile
  const { error: profileError } = await admin.from("profiles").insert({
    id: newUser.user.id,
    full_name: fullName || null,
    role: "client",
    track: track || null,
  });

  if (profileError) {
    return Response.json({ error: profileError.message }, { status: 400 });
  }

  // Send password reset so client can set their password
  await admin.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://jsfinancials.com.au"}/auth/callback?next=/portal`,
    },
  });

  return Response.json({ ok: true, userId: newUser.user.id });
}
