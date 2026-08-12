import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ModelTracker from "./ModelTracker";

export const metadata: Metadata = {
  title: "Model Development | Mentorship",
};

export default async function ModelPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("model_projects")
    .select("*")
    .eq("client_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Model Development
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Track the progress of your trading model from initial idea through to
        live deployment readiness.
      </p>

      <div className="mt-8">
        {projects && projects.length > 0 ? (
          <div className="space-y-8">
            {projects.map((project) => (
              <ModelTracker key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
            <p className="text-gray-500 text-sm">
              No model project yet. Jackson will create your project tracker
              once you begin the model development phase of the mentorship.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
