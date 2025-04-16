import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) throw new Error(error.message);
    return Response.json(data);
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred.";
    return Response.json({ error: message }, { status: 400 });
  }
}
