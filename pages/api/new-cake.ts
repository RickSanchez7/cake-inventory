import type { NextApiRequest, NextApiResponse } from 'next';
import { getData } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function getAllCakes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cake = await getData('cake');

  res.status(200).json(cake);
}