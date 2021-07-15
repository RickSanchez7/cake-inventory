import type { NextApiRequest, NextApiResponse } from 'next';
import { newCakeName, newCake, getCakeByName } from '../../utils/constantes';
import cakename from './cake-name';

type Data = {
  name: string;
};

export default async function newCakeFunc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let cakes = req.body;
  console.log('cakes', cakes);
  let cakeName = cakes[0].cake;
  console.log(cakeName);

  let response = await newCakeName(cakeName);
  console.log('cakes', cakes);
  let id = await getCakeByName(cakeName);

  if (id) {
    cakes.forEach(async c => {
      await newCake(id, c.ingrediente, c.quantidade);
    });
  }

  res.status(200).json('Ok');
}
