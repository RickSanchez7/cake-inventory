import type { NextApiRequest, NextApiResponse } from 'next';
import { newIngredient } from '../../utils/constantes';

export default async function newIngredientFunc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = req.body;
  console.log('data', data);

  let response = await newIngredient(data.ingredient, data.uni);
  if (response === 'OK') {
    res.status(200).json('OK');
  } else {
    res.status(400).json('Ocorreu um erro');
  }
}
