import supabase from '../lib/client';

type BundlesFilters = {
  category? : string;
}

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

const getBundleBySlug = async (slug:string) => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*').eq('slug', slug).single()

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



const getBundlesByCategoryId = async (id:string) => {

 const { data: category_bundles, error } = await supabase
  .from('category_bundles')
  .select('bundle_id(*), category_id(*)').eq('category_id', id)

    if(error) {
    throw new Error(error.message)
  }

  return category_bundles as {
    bundle_id: IBundle;
    category_id: ICategory;
  }[]

}




export {getBundles, getBundleById, getBundleProducts, getBundleCategories, getBundleBySlug, getBundlesByCategoryId}
