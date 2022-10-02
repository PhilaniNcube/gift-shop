import supabase from '../lib/client';

const getProducts = async () => {

  let { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price,cost, brand, main_image, slug, category(*)')

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct[]

}
const getSingleProducts = async (id:string) => {

  let { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price,cost, brand, main_image, slug, category(*)').eq('id', id).single()

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct

}

const getCategories = async  () => {
let { data: categories, error } = await supabase
  .from('categories')
  .select('*')

    if(error) {
    throw new Error(error.message)
  }

    return categories as ICategory[]

}


const getCategoryProducts = async (id:string) => {

  console.log({id})

   let { data: products, error } = await supabase
  .from('products')
  .select('id, created_at, name, ingredients, details, details, weight, price, brand, main_image, slug, category(*)').eq('category', id)

  if(error) {
    throw new Error(error.message)
  }


  return products as IProduct[]

}

export {getProducts, getCategories, getCategoryProducts, getSingleProducts}
