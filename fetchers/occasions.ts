
import supabase from "../lib/client"



const getOccasions = async () => {

  const { data: occasion, error } = await supabase
  .from('occasion')
  .select('*')

  if (error) {
    throw new Error(error.details)
  }

  return occasion
}

const getOccasion = async (slug:string) => {

  const { data: occasion, error } = await supabase
  .from('occasion')
  .select('*').eq('slug', slug).single()

  if (error) {
    throw new Error(error.details)
  }

  return occasion
}


const getOccasionBundles = async () => {
  const {data:occasionBundles, error} = await supabase.from('occasion_bundles').select('*, occasion_id(*), bundle_id(*)')

  if(error) { throw new Error(error.details)}

  return occasionBundles
}


const getOccasionBundlesByOccasionId = async (id:string) => {
  const {data:occasionBundles, error} = await supabase.from('occasion_bundles').select('*, occasion_id(*), bundle_id(*)').eq('occasion_id', id)

  if(error) { throw new Error(error.details)}

  return occasionBundles
}


const getOccasionBundlesByBundleId = async (id:string) => {
  const {data:occasionBundles, error} = await supabase.from('occasion_bundles').select('*, occasion_id(*), bundle_id(*)').eq('bundle_id', id)

  if(error) { throw new Error(error.details)}

  return occasionBundles
}

export {getOccasions, getOccasionBundles, getOccasion, getOccasionBundlesByOccasionId, getOccasionBundlesByBundleId}
