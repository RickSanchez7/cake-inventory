import type { NextApiRequest, NextApiResponse } from 'next';
import { getCake, getSavedCakes } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function getCakesCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cake = await getSavedCakes();

  res.status(200).json(cake);
}
