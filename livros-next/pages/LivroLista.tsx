import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { LinhaLivro } from '../componentes/LinhaLivro';
import { Menu } from '../componentes/Menu';

interface Livro {
    codigo: number;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

const baseURL = "http://localhost:3000/api/livros";

const LivroLista = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    const obterLivros = async () => {
        const response = await fetch(baseURL);
        const data = await response.json();
        setLivros(data);
        setCarregado(true);
    };

    const excluirLivro = async (codigo: number) => {
        const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
        if (response.ok) {
            setLivros(livros.filter(livro => livro.codigo !== codigo));
        } else {
            console.error("Erro ao excluir o livro:", response.statusText);
        }
    };

    useEffect(() => {
        obterLivros();
    }, []);

    return (
        <div className="container mt-4">
            <Menu />
            <h1>Lista de Livros</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autores</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {carregado ? (
                        livros.map(livro => (
                            <LinhaLivro
                                key={livro.codigo}
                                livro={livro}
                                excluir={() => excluirLivro(livro.codigo)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Carregando...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LivroLista;
