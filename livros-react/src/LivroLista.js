import React, { useState, useEffect } from 'react';
import ControleEditora, { editoras } from './controle/ControleEditora';
import controleLivro from './controle/ControleLivros';

const controleEditora = new ControleEditora(editoras);

const LinhaLivro = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td>
                <div>{livro.titulo}</div>
                <button 
                    className="btn btn-danger"
                    onClick={() => excluir(livro.codigo)}
                >
                    Excluir
                </button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            const livrosObtidos = controleLivro.obterLivros();
            setLivros(livrosObtidos);
            setCarregado(true);
        }
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main>
            <h1>Catálogo de Livros</h1>
            <table style={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: 'black', color: 'white' }}>
                        <th style={{ width: '25%' }}>Título</th>
                        <th style={{ width: '40%' }}>Resumo</th>
                        <th style={{ width: '20%' }}>Editora</th>
                        <th style={{ width: '15%' }}>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
