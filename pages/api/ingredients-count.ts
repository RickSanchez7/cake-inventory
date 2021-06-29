import type { NextApiRequest, NextApiResponse } from 'next';
import { getIngredientsCount } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function getAllCakes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cake = await getIngredientsCount();

  res.status(200).json(cake);
}
