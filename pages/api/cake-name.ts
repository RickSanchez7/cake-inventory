import type { NextApiRequest, NextApiResponse } from 'next';
import { getData, newCake } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function cakename(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let cakes = req.body;
  let cakeName = req.body[0].cake;

  let response = await console.log('cakes', cakes);

  // cakes.forEach(async c => {
  //   await newCake(c.cake, c.ingrediente, c.quantidade);
  // });

  res.status(200).json('Ok');
}
