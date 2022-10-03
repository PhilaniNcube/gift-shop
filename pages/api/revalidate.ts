// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await res.revalidate('/products')

  const pathToRevalidate = `/products/${req.body?.record?.slug || req.body?.old_record?.slug}`

  await res.revalidate(pathToRevalidate)

  res.status(200).json({ revalidated: true })
}
