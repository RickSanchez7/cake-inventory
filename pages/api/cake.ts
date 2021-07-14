import type { NextApiRequest, NextApiResponse } from 'next';
import { getCake, getSavedCakes } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function getAllCakes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);

  const id = req.body.data;
  const cake = await getCake(id);
  res.status(200).json(cake);
}
