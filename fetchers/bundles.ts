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


const getBundleProducts = async (bundleId: string) => {


   const { data: bundles, error } = await supabase
  .from('bundle_products')
  .select('*, product_id(*)').eq('bundle_id', bundleId)


    if(error) {
    throw new Error(error.message)
  }

  return bundles as IBundleProduct[]

}


const getBundleCategories = async (id:string) => {

 const { data: category_bundles, error } = await supabase
  .from('category_bundles')
  .select('bundle_id(*), category_id(*)').eq('bundle_id', id)

    if(error) {
    throw new Error(error.message)
  }

  return category_bundles

}

export {getBundles, getBundleById, getBundleProducts, getBundleCategories}
