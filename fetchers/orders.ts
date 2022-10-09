import serviceRole from "../lib/serviceClient"


const getOrders = async () => {

  const { data: orders, error } = await serviceRole
  .from('orders')
  .select('id, order_items, created_at, profile_id, order_subtotal, shipping, total, city, postal_code, first_name, last_name, delivery_method,   email_address, phone_number, street_address, paid, shipped ' )

    if(error) {
    throw new Error(error.message)
  }

  return orders as IOrder[]

}


const getOrderById = async (id:string) => {

  const { data: orders, error } = await serviceRole
  .from('orders')
  .select('id, order_items, created_at, profile_id, order_subtotal, shipping, total, city, postal_code, first_name, last_name, delivery_method,   email_address, phone_number, street_address, paid, shipped ' ).eq('id', id).single()

    if(error) {
    throw new Error(error.message)
  }

  return orders as IOrder

}


export {getOrders, getOrderById}
