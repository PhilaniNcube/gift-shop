import supabase from "../lib/client"

const isAdmin = async () => {

  const { data, status, error } = await supabase.rpc("is_admin")


  if(error) {
    throw new Error(error.message)
  }


  return {
    data, status, error
  }

}

export {isAdmin}
