import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../schema";


const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


if (!url || !anonKey ) {
    throw new Error('Missing parameters for supabase client')
}



const supabase = createBrowserSupabaseClient<Database>();

export default supabase
