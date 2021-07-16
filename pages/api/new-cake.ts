import type { NextApiRequest, NextApiResponse } from 'next';
import { newCakeName, newCake, getCakeByName } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function newCakeFunc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cake = req.body;
  const cakeName = cake.data.cake_name;

  try {
    await newCakeName(cakeName);
    let id = await getCakeByName(cakeName);

    if (id) {
      cake.data.ingredients.forEach(async (c: any) => {
        await newCake(id, c.ingredientId, c.quantity);
      });
    }
    res.status(200).json('OK');
  } catch (error) {
    res.status(400).json('NotOk');
  }
}
