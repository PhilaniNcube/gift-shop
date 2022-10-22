import supabase from "../lib/client"

const getOccasions = async () => {

  const { data: occasion, error } = await supabase
  .from('occasion')
  .select('*')

  if (error) {
    throw new Error(error.details)
  }

  return occasion as IOccasion[]
}

export {getOccasions}
