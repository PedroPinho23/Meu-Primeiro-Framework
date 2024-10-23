import { NextApiRequest, NextApiResponse } from 'next';
import controleLivro from '../../../classes/controle/ControleLivros'; 

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        res.status(200).json(controleLivro.obterLivros());
    } else if (req.method === 'POST') {
        const novoLivro = req.body; 
        controleLivro.incluir(novoLivro); 
        res.status(201).json(novoLivro);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
