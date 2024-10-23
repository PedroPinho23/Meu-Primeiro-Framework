import React from 'react';

interface Livro {
    codigo: number;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

interface LinhaLivroProps {
    livro: Livro;
    excluir: () => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    return (
        <tr>
            <td>{props.livro.titulo}</td>
            <td>{props.livro.autores.join(', ')}</td>
            <td>
                <button className="btn btn-danger" onClick={props.excluir}>
                    Excluir
                </button>
            </td>
        </tr>
    );
};
