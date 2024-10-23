import { NextApiRequest, NextApiResponse } from 'next';
import controleLivro from '../../../classes/controle/ControleLivros';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;

    if (req.method === 'GET') {
        const livro = controleLivro.obterLivros().find(l => l.codigo === Number(codigo));
        if (livro) {
            res.status(200).json(livro);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    } else if (req.method === 'DELETE') {
        controleLivro.excluir(Number(codigo));
        res.status(204).end(); 
    } else {
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
