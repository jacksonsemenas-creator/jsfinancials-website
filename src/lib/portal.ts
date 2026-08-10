import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface Profile {
  id: string;
  full_name: string | null;
  role: "client" | "admin";
  track: string | null;
  current_period: number;
  created_at: string;
}

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/portal/login");
  }

  return profile as Profile;
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (profile.role !== "admin") {
    redirect("/portal");
  }
  return profile;
}
