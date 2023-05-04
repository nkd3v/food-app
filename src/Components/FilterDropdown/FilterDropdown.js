import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function FilterDropdown(props) {
  const [selectedOption, setSelectedOption] = useState('เลือกโรงอาหาร');

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    // Call a callback function passed as props to filter data based on the selected option
    props.onSelect(eventKey);
  };

  const dropdownItems = props.options;

  return (
    <DropdownButton id="filter-dropdown" title={selectedOption} variant="secondary">
      {dropdownItems.map((option) => (
        <Dropdown.Item key={option} eventKey={option} active={selectedOption === option} onClick={() => handleSelect(option)}>
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default FilterDropdown;