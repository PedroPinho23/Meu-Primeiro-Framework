import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { codEditora } = req.query;
        const editora = controleEditora.getNomeEditora(Number(codEditora));

        if (editora) {
            res.status(200).json({ nome: editora });
        } else {
            res.status(404).json({ message: 'Editora não encontrada' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
