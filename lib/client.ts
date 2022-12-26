import { createClient } from "@supabase/supabase-js";
import { Database } from "../db_types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


if (!url || !anonKey ) {
    throw new Error('Missing parameters for supabase client')
}



const supabase = createClient<Database>(
    url, anonKey,
);

export default supabase
