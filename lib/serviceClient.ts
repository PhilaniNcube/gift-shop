import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL

const serviceKey = process.env.SUPABASE_SERVICE_ROLE

if (!url || !serviceKey) {
    throw new Error('Missing parameters for supabase client')
}

const serviceRole = createClient(url, serviceKey)

export default serviceRole
