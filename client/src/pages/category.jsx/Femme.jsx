import React, { useState } from 'react'
import Modal from '../../components/modal/NavModal'
const Femme = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const HandleCloseModal = () => {
        const [style, setStyle] = useState("hide");
        if (style !== "light") setStyle("light");
        else setStyle("dark");


        setShowModal(false);
    };
    return (
        <div>
            <button onClick={handleOpenModal} >Open Modal</button>
            <Modal className="w-screen h-200"show={showModal} handleClose={HandleCloseModal} >
                <h2 className='text-red-400'>Modal Title</h2>
                <p>This is the modal content.</p>
            </Modal>
        </div>
    )
}

export default Femme