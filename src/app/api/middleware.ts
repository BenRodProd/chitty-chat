import { NextApiHandler } from 'next';
import coopMiddleware from '../middleware/coop';

const middleware: NextApiHandler = (req, res) => {
  coopMiddleware(req, res, () => {
    // Additional middleware logic, if needed
    res.end();
  });
};

export default middleware;