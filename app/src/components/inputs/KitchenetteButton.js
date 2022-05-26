import { useState, useEffect } from 'react';
import Toast from '../feedback/Toast'

// custom button for app that displays a text, executes a function onclick, and shows feedback in a toast after click event occurs
export default function KitchenetteButton({displayLabel, onClick, toastData = null}) {
  const [showToast, setShowToast] = useState(false)

  function handleButtonClick() {
    // execute function passed from parent component, and get response from API
    const successful = onClick()

    if (successful) // show feedback as a toast
      setShowToast(true)
  }

  return (
    <>
      {// toast shows after button click
        <Toast toastData={toastData} 
          showToast={showToast}
          onClickHideToast={() => setShowToast(false)}
          />}

      <button className="button" onClick={handleButtonClick}>{displayLabel}</button>
    </>
  );
}
