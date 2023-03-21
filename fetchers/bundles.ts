
import supabase from '../lib/client';


const getBundles = async () => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )')

  if(error) {
    throw new Error(error.message)
  }


  return bundles

}

const getFeaturedBundles = async () => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )').eq('featured', true)

  if(error) {
    throw new Error(error.message)
  }


  return bundles

}

const getBundleById = async (id:string) => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*,category(id, name, created_at, image, slug )').eq('id', id).single()

  if(error) {
    throw new Error(error.message)
  }


  return bundles

}

const getBundleBySlug = async (slug:string) => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )').eq('slug', slug).single()

  if(error) {
    throw new Error(error.message)
  }


  return bundles

}


const getBundleProducts = async (bundleId: string) => {


   const { data: bundles, error } = await supabase
  .from('bundle_products')
  .select('*, product_id(*)').eq('bundle_id', bundleId)


    if(error) {
    throw new Error(error.message)
  }

  return bundles

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

  return category_bundles

}

const countBundles = async () => {

    const { count, error } = await supabase
    .from("bundles")
    .select("*", { count: "exact", head: true });

    if(error) throw new Error(error.details)

   if(typeof count !== "number") {
    return 0
   } else if(typeof count === "number") {
    return count
   }

   return 0

}

const getBundlesForHer = async () => {
   const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )').eq('gender', 'her')

  if(error) {
    throw new Error(error.message)
  }


  return bundles
}

const getBundlesForHim = async () => {
   const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )').eq('gender', 'him')

  if(error) {
    throw new Error(error.message)
  }


  return bundles
}




export {getBundles, getBundleById, getBundleProducts, getBundleCategories, getBundleBySlug, getBundlesByCategoryId, getFeaturedBundles, countBundles, getBundlesForHim, getBundlesForHer}
