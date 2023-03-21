import supabase from '../lib/client';

const getProducts = async () => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name,  details, details, size, price,cost,  main_image, slug, category(*)')

  if(error) {
    throw new Error(error.message)
  }


  return products

}

const getFeaturedProducts = async () => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name,  details, details, size, price,cost,  main_image, slug, category(*)').eq('featured', true)

  if(error) {
    throw new Error(error.message)
  }


  return products

}


const getSingleProducts = async (slug:string) => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name,  details, details, size, price,cost,  main_image, slug, category(*)').eq('slug', slug).single()

  if(error) {
    throw new Error(error.message)
  }


  return products

}

const getSingleProductById = async (id:string) => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name,  details, details, size, price,cost,  main_image, slug, category(*)').eq('id', id).single()

  if(error) {
    throw new Error(error.message)
  }


  return products

}

const getCategories = async  () => {
const { data: categories, error } = await supabase
  .from('categories')
  .select('*')

    if(error) {
    throw new Error(error.message)
  }

    return categories

}


const getCategoryProducts = async (id:string) => {

   const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name,  details, details, size, price,  main_image, slug, category(*)').eq('category', id)

  if(error) {
    throw new Error(error.message)
  }
  return products

}

export {getProducts, getCategories, getCategoryProducts, getSingleProducts, getFeaturedProducts, getSingleProductById}
