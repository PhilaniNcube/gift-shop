import supabase from '../lib/client';

const getProducts = async () => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price,cost, brand, main_image, slug, category(*)')

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct[]

}

const getFeaturedProducts = async () => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price,cost, brand, main_image, slug, category(*)').eq('featured', true)

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct[]

}


const getSingleProducts = async (slug:string) => {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price,cost, brand, main_image, slug, category(*)').eq('slug', slug).single()

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct

}

const getCategories = async  () => {
const { data: categories, error } = await supabase
  .from('categories')
  .select('*')

    if(error) {
    throw new Error(error.message)
  }

    return categories as ICategory[]

}


const getCategoryProducts = async (id:string) => {

  console.log({id})

   const { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price, brand, main_image, slug, category(*)').eq('category', id)

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct[]

}

export {getProducts, getCategories, getCategoryProducts, getSingleProducts, getFeaturedProducts}
