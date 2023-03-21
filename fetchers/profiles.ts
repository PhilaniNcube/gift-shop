
import { Database } from "../db_types"
import supabase from "../lib/client"


const getProfiles = async () => {

const { data: profiles, error } = await supabase
  .from('profiles')
  .select('*')

  if(error) {
    throw new Error(error.message)
  }

  return profiles as Database['public']['Tables']['profiles']['Row'][]

}



export {getProfiles}
