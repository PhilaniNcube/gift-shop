// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../../../lib/serviceClient'





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {id} = req.query

  const payload = req.body

  const payment_status = payload?.payment_status

  if(payment_status === "COMPLETE") {
      const { data, error } = await serviceRole
  .from('orders')
  .update({ payment_details: payload, paid:true })
  .eq('id', id).single()

   res.status(200).json({message: "OK", data:data, error:error});
   return
  }

  const { data, error } = await serviceRole
  .from('orders')
  .update({ payment_details: payload })
  .eq('id', id).single()



  res.status(200).json({message: id});
}
