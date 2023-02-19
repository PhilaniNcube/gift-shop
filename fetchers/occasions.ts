import { Database } from "../db_types"
import supabase from "../lib/client"

type Occasion_Bundle = Database["public"]["Tables"]["occasion_bundles"]["Row"]

const getOccasions = async () => {

  const { data: occasion, error } = await supabase
  .from('occasion')
  .select('*')

  if (error) {
    throw new Error(error.details)
  }

  return occasion as IOccasion[]
}

const getOccasion = async (slug:string) => {

  const { data: occasion, error } = await supabase
  .from('occasion')
  .select('*').eq('slug', slug).single()

  if (error) {
    throw new Error(error.details)
  }

  return occasion as IOccasion
}


const getOccasionBundles = async () => {
  const {data:occasionBundles, error} = await supabase.from('occasion_bundles').select('*, occasion_id(*), bundle_id(*)')

  if(error) { throw new Error(error.details)}

  return occasionBundles as Occasion_Bundle[]
}


const getOccasionBundlesByOccasionId = async (id:string) => {
  const {data:occasionBundles, error} = await supabase.from('occasion_bundles').select('*, occasion_id(*), bundle_id(*)').eq('occasion_id', id)

  if(error) { throw new Error(error.details)}

  return occasionBundles as Occasion_Bundle[]
}


const getOccasionBundlesByBundleId = async (id:string) => {
  const {data:occasionBundles, error} = await supabase.from('occasion_bundles').select('*, occasion_id(*), bundle_id(*)').eq('bundle_id', id)

  if(error) { throw new Error(error.details)}

  return occasionBundles as Occasion_Bundle[]
}

export {getOccasions, getOccasionBundles, getOccasion, getOccasionBundlesByOccasionId, getOccasionBundlesByBundleId}
