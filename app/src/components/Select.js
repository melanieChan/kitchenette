import React, { useState, useEffect } from 'react';

import { ComboBox } from 'gestalt';

/*
  An input field to type in text, or select from a given list of text options
 - shows a list of options
 - manages user input by sending data of updated user input back to parent component
*/
export default function Select({placeholder, selection, setSelection}) {
  const optionsList = [
    'apple',
    'blueberries',
    'cranberries',
    'dark chocolate',
  ];

  const options = optionsList.map((option, index) => ({
    label: option,
    value: 'value' + index,
  }));

  // user types their own input
  const handleChange = (data) => {
    setSelection(data.value)
  }

  // user clicks on an option
  const handleSelect = (data) => {
    setSelection(data.item.label)
  }

  // user clicks 'x' button to erase their input
  const handleClear = (data) => {
    setSelection('')
  }

  return (
    <div style={{width: '80%'}}>
      <ComboBox
        className="ComboBox"
        accessibilityClearButtonLabel="Clear category value"
        errorMessage={''}
        id="controlled"
        label="Choose a category to display top search trends"
        labelDisplay="hidden"
        noResultText="No results for your selection"
        onBlur={() => {}}
        onClear={handleClear}
        onChange={handleChange}
        onSelect={handleSelect}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
}
