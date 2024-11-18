import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "../../config.js";
if (!SUPABASE_URL)
    throw Error("No SUPABASE_URL");
if (!SUPABASE_SERVICE_KEY)
    throw Error("No SUPABASE_SERVICE_KEY");
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
export default supabase;
