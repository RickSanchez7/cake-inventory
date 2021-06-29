import type { NextApiRequest, NextApiResponse } from 'next';
import { getData } from '../../utils/constantes';

export default async function getAllIngredients(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ingredient = await getData('Ingredientes');

  res.status(200).json(ingredient);
}
