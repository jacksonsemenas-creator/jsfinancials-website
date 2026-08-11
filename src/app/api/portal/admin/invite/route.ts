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
  let userId: string;

  // Try to create user, handle "already exists" gracefully
  const { data: newUser, error: createError } =
    await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

  if (createError) {
    if (
      createError.message.includes("already been registered") ||
      createError.status === 422
    ) {
      // User exists, find them
      let page = 1;
      let found: string | undefined;
      while (!found) {
        const { data: batch } = await admin.auth.admin.listUsers({
          page,
          perPage: 500,
        });
        if (!batch?.users.length) break;
        found = batch.users.find(
          (u) => u.email?.toLowerCase() === email.toLowerCase()
        )?.id;
        page++;
      }
      if (!found) {
        return Response.json(
          { error: "User exists but could not be found" },
          { status: 400 }
        );
      }
      userId = found;
    } else {
      return Response.json({ error: createError.message }, { status: 400 });
    }
  } else {
    userId = newUser.user.id;
  }

  // Create or update profile
  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: userId,
      full_name: fullName || null,
      role: "client",
      track: track || null,
      current_period: 1,
    },
    { onConflict: "id" }
  );

  if (profileError) {
    return Response.json({ error: profileError.message }, { status: 400 });
  }

  return Response.json({ ok: true, userId });
}
