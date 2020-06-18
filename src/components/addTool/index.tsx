import React from 'react';
import Modal from 'react-modal';

interface IModal {
  closeModal: () => {};
  openModal: true;
}

const addTool: React.FC<IModal> = ({ closeModal, openModal }) => {
  return (
    <Modal isOpen={openModal} >
      <button onClick={closeModal}>Fechar modal</button>
        <form action="">
          <div className="">
            <label htmlFor="">Titulo</label>
            <input type="text" placeholder="Digite o titulo" />
          </div>
          <div className="">
            <label htmlFor="">Descrição</label>
            <textarea name="" id="" placeholder="De uma descrição"></textarea>
          </div>
          <div className="">
            <label htmlFor="">Link</label>
            <input type="text" placeholder="Digite a url" />
          </div>
          <div className="">
            <label htmlFor="">Tags</label>
            <input type="text" placeholder="Digite uma tag" />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
    </Modal>
  )
}

export default addTool;