import type { NextApiRequest, NextApiResponse } from 'next';
import { getCakes } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function getAllCakes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const cake = await getCakes();

  res.status(200).json({ ey: 'hello' });
}
