import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ChangeRestaurantModal({handleClick, price, quantity, hasItemFromOtherRestaurant}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <button className='button_addToCard' onClick={hasItemFromOtherRestaurant() ? handleShow : handleClick}>
                Add to cart ฿{price * quantity}
            </button>

            <Modal  
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>เปลี่ยนร้านอาหาร</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    คุณต้องการเปลี่ยนร้านอาหารหรือไม่ รายการอาหารในตะกร้าจะถูกลบทั้งหมด
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={() => {handleClick(); handleClose()}}>เปลี่ยน</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeRestaurantModal;