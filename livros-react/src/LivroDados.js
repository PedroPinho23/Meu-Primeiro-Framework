import React, { useState } from 'react';
import ControleEditora, { editoras } from './controle/ControleEditora'; 
import controleLivro from './controle/ControleLivros'; 
import { useNavigate } from 'react-router-dom';

const controleEditora = new ControleEditora(editoras);

const LivroDados = () => {
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));
    
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes.length > 0 ? opcoes[0].value : '');

    const navigate = useNavigate();

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event) => {
        event.preventDefault();
        const novoLivro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora
        };
        controleLivro.incluir(novoLivro);
        navigate('/'); 
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Cadastro de Livro</h1>
            <form onSubmit={incluir} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-75">
                    <label className="form-label">Título:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="mb-3 w-75">
                    <label className="form-label">Resumo:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                    />
                </div>
                <div className="mb-3 w-75">
                    <label className="form-label">Autores (um por linha):</label>
                    <textarea
                        className="form-control"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                    />
                </div>
                <div className="mb-3 w-75">
                    <label className="form-label">Editora:</label>
                    <select className="form-select" value={codEditora} onChange={tratarCombo}>
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-75">Salvar Dados</button>
            </form>
        </div>
    );
};

export default LivroDados;
