import supabase from '../lib/client';

const getBundles = async () => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*')

  if(error) {
    throw new Error(error.message)
  }


  return bundles as IBundle[]

}

const getBundleById = async (id:string) => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*').eq('id', id).single()

  if(error) {
    throw new Error(error.message)
  }


  return bundles as IBundle

}

export {getBundles, getBundleById}
