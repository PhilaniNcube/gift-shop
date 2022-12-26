import { Database } from '../db_types';
import supabase from '../lib/client';

type Bundle = Database["public"]["Tables"]["bundles"]["Row"]
type Product = Database["public"]["Tables"]["products"]["Row"]
type BundleProduct = Database["public"]["Tables"]["bundle_products"]["Row"]
type Category = Database["public"]["Tables"]["categories"]["Row"]



const getBundles = async () => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )')

  if(error) {
    throw new Error(error.message)
  }


  return bundles as Bundle[]

}

const getBundleById = async (id:string) => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*,category(id, name, created_at, image, slug )').eq('id', id).single()

  if(error) {
    throw new Error(error.message)
  }


  return bundles as Bundle

}

const getBundleBySlug = async (slug:string) => {

  const { data: bundles, error } = await supabase
  .from('bundles')
  .select('*, category(id, name, created_at, image, slug )').eq('slug', slug).single()

  if(error) {
    throw new Error(error.message)
  }


  return bundles as Bundle

}


const getBundleProducts = async (bundleId: string) => {


   const { data: bundles, error } = await supabase
  .from('bundle_products')
  .select('*, product_id(*)').eq('bundle_id', bundleId)


    if(error) {
    throw new Error(error.message)
  }

  return bundles as BundleProduct[]

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
    bundle_id: Bundle;
    category_id: Category;
  }[]

}

const countBundles = async ():Promise<number> => {

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




export {getBundles, getBundleById, getBundleProducts, getBundleCategories, getBundleBySlug, getBundlesByCategoryId, countBundles}
