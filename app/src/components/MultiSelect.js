import React, { useState, useEffect, useRef } from 'react';

import { ComboBox, Tag } from 'gestalt';

/*
  An input field to type in multiple texts, or select multiple from a given list
 - shows a list of options
 - manages user input by sending data of updated user input back to parent component

 code from Gestalt
*/
export default function MultiSelect({label, placeholder}) {
  const ref = useRef();
  const [selected, setSelected] = useState([]); // items user has selected
  const [searchTerm, setSearchTerm] = useState(''); // new item name that user types

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

  const [suggestedOptions, setSuggestedOptions] = useState(options.filter((pronoun) => !selected.includes(pronoun.value)));

  // checks if a string is valid to add, and adds it to the selected list
  const handleAdd = (newLabel) => {
    if (!selected.includes(newLabel)) {
      // add item to selected list
      const newSelected = [...selected, newLabel];
      setSelected(newSelected);

      // remove option just selected form list of options
      setSuggestedOptions(options.filter((option) =>
          !newSelected.includes(option.label)
        ));
      setSearchTerm(''); // reset
    }
  }

  // user clicks on an option or types one
  const handleOnSelect = (e) => {
    /* When user hits enter, function was getting called because it auto-selects the closest match (possibly a gestalt feature)
      Since this implementation allows users to make their own option, this function will return early when the auto-select calls this */
    if (e.event.keyCode === 13 /* keycode for 'enter' */) return

    const { item: { label } } = e // get value that was selected
    handleAdd(label)
  };

  // when a user presses a key on the keyboard
  const handleOnChange = ({ value }) => {
    setSearchTerm(value); // store search term

    // sets autofill suggestions
    const autofill = value ?
      // find potential autofill matches to the user's search input
      suggestedOptions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      )
      : // if no input is given, goes through all options to find ones not selected
      options.filter((option) => !selected.includes(option.value))

    setSuggestedOptions(autofill);
  };

  // clear all selected items
  const handleClear = () => {
    setSelected([]);
    setSuggestedOptions(options);
  };

  const handleOnKeyDown = (e) => {
    const {
      event: { // get info about user input
        keyCode,
        target: { selectionEnd },
      },
      value // get input value
    } = e

    // Remove tag on backspace if the cursor is at the beginning of the field
    if (keyCode === 8 /* Backspace */ && selectionEnd === 0) {
      const newSelected = [...selected.slice(0, -1)];
      setSelected(newSelected);

      const newOptions = options.filter((option) => !newSelected.includes(option.label));
      setSuggestedOptions(newOptions);
    }

    // Adds item if user hits 'enter'
    else if (keyCode === 13) {
      handleAdd(value)
    }
  };

  // removes an option from list of selected by usings its display name
  const handleRemoveTag = (removedValue) => {
    const newSelected = selected.filter((tagValue) => tagValue !== removedValue);
    setSelected(newSelected);
    setSuggestedOptions(options.filter((option) => !newSelected.includes(option.label)));
  };

  // display list of tags
  const renderedTags = selected.map((option) => (
    <Tag
      key={option}
      onRemove={() => handleRemoveTag(option)}
      removeIconAccessibilityLabel={`Remove ${option} tag`}
      text={option}
    />
  ));

  return (
    <div style={{width: '80%'}}>
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        id="tags"
        ref={ref}

        noResultText="No results for your selection"
        label={label}
        placeholder={selected.length > 0 ? '' : placeholder}

        inputValue={searchTerm}
        options={suggestedOptions}

        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        onClear={handleClear}
        onSelect={handleOnSelect}

        tags={renderedTags}
        />
    </div>
  );
}
