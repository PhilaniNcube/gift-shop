// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../../../lib/serviceClient'

import 'dotenv/config';
import { MailerSend, Sender, Recipient ,EmailParams } from "mailersend";
import { Database } from '../../../../schema';



const mailerSend = new MailerSend({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiKey: process.env.MAILERSEND_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {id} = req.query

  const {data:order, error:orderError} = await serviceRole.from("orders").select("*, profile_id(*)").eq('id', id).single()

  const payload = req.body



  const payment_status = payload?.payment_status

  if(payment_status === "COMPLETE") {

    const sentFrom = new Sender("orders@allthingsgifts.co.za", "All Things Gifts");

    const recipients = [
  new Recipient(`${order?.email_address}`, `${order?.first_name} ${order?.last_name}`)
];
const cc = [
  new Recipient("orders@allthingsgifts.co.za", "All Things Gifts")
];

const variables = [
  {
    email: `${order?.email_address}`,
    substitutions: [
      {
        var: 'order_number',
        value: `${order?.id}`
      },

    ],
  }
];


const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setCc(cc).setSubject("Order Confirmation").setTemplateId('v69oxl58mnrl785k').setVariables(variables);


      const { data, error } = await serviceRole
  .from('orders')
  .update({ payment_details: payload, paid:true })
  .eq('id', id).select('*').single()

   await mailerSend.email.send(emailParams);

   res.status(200).json({message: "OK", data:data, error:error});
   return
  }

  const { data, error } = await serviceRole
  .from('orders')
  .update({ payment_details: payload })
  .eq('id', id).single()



  res.status(200).json({message: id});
}
