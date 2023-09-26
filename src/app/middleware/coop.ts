// middleware/coop.ts

import { NextApiResponse, NextApiRequest } from 'next';

export default (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
};
