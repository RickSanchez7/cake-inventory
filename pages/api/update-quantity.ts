import type { NextApiRequest, NextApiResponse } from 'next';
import { updateQuantity } from '../../utils/constantes';

export default async function updateQuantityFunc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = req.body;
  console.log('data', data);

  let response = await updateQuantity(data.id, data.quantity);
  if (response === 'OK') {
    res.status(200).json('OK');
  } else {
    res.status(400).json('Ocorreu um erro');
  }
}
