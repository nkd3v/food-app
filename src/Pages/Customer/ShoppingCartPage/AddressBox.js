import React, { useRef } from 'react';
import './AddressBox.css'; // Import CSS file
function AddressBox() {
  const addressRef = useRef('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send address data to server or perform other actions
    console.log(addressRef.current.value);
    addressRef.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <label>
        จุดส่งอาหาร:
        <textarea ref={addressRef} className="address-textarea" />
      </label>
    </form>
  );
}

export default AddressBox;