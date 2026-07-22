import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export type Product =
  | "daily_report"
  | "macro_course"
  | "discord"
  | "bootcamp"
  | "prediction_markets";

export async function hasEntitlement(
  userId: string,
  products: Product[],
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entitlements")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .in("product", products)
    .limit(1);

  if (error) {
    console.error("Entitlement check failed:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("user_id", userId)
    .limit(1);

  if (error) {
    console.error("Admin check failed:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
}
