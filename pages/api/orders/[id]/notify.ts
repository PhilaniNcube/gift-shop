// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceRole } from '../../../../lib/client'




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {id} = req.query

  const payload = req.body

  const { data, error } = await serviceRole
  .from('orders')
  .update({ payment_details: payload })
  .eq('id', id).single()

  console.log({data, error})

  res.status(200).json({message: id});
}
