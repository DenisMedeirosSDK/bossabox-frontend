import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { FiLink, FiHash } from "react-icons/fi";
import Modal from 'react-modal';

import api from "../../services/api";

import "./styles.css";

interface ITool {
  _id: string;
  title: string;
  description: string;
  link: string;
  tags: string;
}

const Dashboard: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [tools, setTools] = useState<ITool[]>([]);
  
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  function openModal(): void {
    setModalIsOpen(true);
  }

  function closeModal(): void {
    setModalIsOpen(false);
  }

  function handleDelete(id:String):void {
    api.delete(`tools/${id}`).then(response => response.data);

    setTools(tools.filter(tool => tool._id !== id));
  }

  async function handleAddTool(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    const schema = Yup.object().shape({
      title: Yup.string().required('Titulo obrigatorio'),
      description: Yup.string().required('Descrição obrigatoria'),
      link: Yup.string().required('Link obrigatorio'),
      tags: Yup.string().required('Tag obrigatoria')
    });

    const data = {
      title,
      description,
      link,
      tags
    };

    await schema.validate(data);

    await api.post('tools', data);

    setModalIsOpen(false);
  }

  useEffect(() => {
    api.get('tools').then((response) => {
      setTools(response.data);
    });
  }, [tools]);

  return (
    <div className="container">
      <header>
        <h1>Very Useful Tools to Remember</h1>
      </header>

      <nav>
        <div className="group-nav">
          <div className="search">
            <input type="text" placeholder="Pesquise uma ferramenta"  />
          </div>
          <div className="add-tool">
            <button onClick={openModal}>Adicionar ferramenta</button>
          </div>
        </div>
      </nav>

      <Modal className="modal"  isOpen={modalIsOpen}>
        <button onClick={closeModal} >Fechar modal</button>
        <form onSubmit={handleAddTool} >
          <div className="form-group">
            <label htmlFor="title">Titulo</label>
            <input 
              id="title"
              name="title" 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Digite o nome da ferramenta" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input 
              id="description" 
              name="description" 
              type="text" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Descrição" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input 
              id="link" 
              name="link" 
              type="text" 
              value={link} 
              onChange={e => setLink(e.target.value)} 
              placeholder="Apenas url"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input 
              id="tags" 
              name="tags" 
              type="text" 
              value={tags} 
              onChange={e => setTags(e.target.value)} 
              placeholder="Ex: node, javascript" 
            />
          </div>
          <button type="submit" >Salvar ferramenta</button>
        </form>
      </Modal>

      <main>
        <ul className="group-card">
          {tools.map((tool) => (
            <li key={tool._id}>
              <h1>{tool.title}</h1>
              <button onClick={() => handleDelete(tool._id)} >Remover</button>
              <p>{tool.description}</p>
              <a href={tool.link}>
                {" "}
                <FiLink color="#43B1F7" /> {tool.title}
              </a>
              <p>
                <FiHash />
                {tool.tags}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
