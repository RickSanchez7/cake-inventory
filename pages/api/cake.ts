import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCake, getCake, getSavedCakes } from '../../utils/constantes';

type Data = {
  name: string;
};

export default async function getAllCakes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);

  //delete cakes
  if (req.method === 'DELETE') {
    console.log(req.body);
    const response = await deleteCake(req.body.cake_name);
    console.log('res', response);
    if (response === 'OK') {
      return res.status(200).json('OK');
    } else {
      return res.status(200).json('Not OK');
    }
  }

  //find cake with id
  const id = req.body.data;
  const cake = await getCake(id);

  if (cake.length > 0) {
    res.status(200).json(cake);
  } else {
    res.status(200).json('No cake found');
  }
}
