import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function dicePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 h-full">
      <iframe 
        src="https://n5ntqy57w.goldslotpalace.com/casino/games/dice.html"
        width="100%" 
        height="800px" 
        style={{ border: "none" }} 
        //sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
