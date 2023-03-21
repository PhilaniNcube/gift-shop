import { createClient } from "@supabase/supabase-js";
import { Database } from "../schema";


const url = process.env.NEXT_PUBLIC_SUPABASE_URL

const serviceKey = process.env.SUPABASE_SERVICE_ROLE

if (!url || !serviceKey) {
    throw new Error('Missing parameters for supabase client')
}

const serviceRole = createClient<Database>(url, serviceKey)

export default serviceRole
