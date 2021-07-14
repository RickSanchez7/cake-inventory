import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteIngredient, newIngredient } from '../../utils/constantes';

export default async function deleteIngredientFunc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = req.body;

  let response = await deleteIngredient(data.id);
  if (response === 'OK') {
    res.status(200).json('OK');
  } else {
    res.status(400).json('Ocorreu um erro');
  }
}
