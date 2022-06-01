import React, { useState, useEffect, useContext } from 'react';
import '../Page.css';
import searchingImg from '../styles/undraw_researching.svg'

import RecipeCard from '../components/cards/RecipeCard'
import MultiSelect from '../components/inputs/MultiSelect'
import Toast from '../components/feedback/Toast'
import Modal from '../components/feedback/Modal'

import { searchRecipesByIngredients } from '../api/provider';
import { UserContext } from '../auth/UserContext'

const RecipeSearchPage = () => {
  document.title = "Search Recipes"
  const {userData} = useContext(UserContext) // access user data
  const {token} = userData ? userData : {token: 'wrong token'}

  const [selected, setSelected] = useState([]); // items user has selected
  const [recipeSearchResults, setRecipeSearchResults] = useState(null);

  const [showToast, setShowToast] = useState(false)
  const [toastData, setToastData] = useState(null)

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // takes list of ingredients selected from MultiSelect input component and uses them as the search query
  function search() {
    // input check
    if (selected.length == 0) {
      openModal('Only nonempty inputs are valid')
      return
    }

    // call api
    searchRecipesByIngredients(token, selected)
      .then((response) => {
        console.log(response);

        // update ui
        setRecipeSearchResults(response)
      })
      .catch(err => { console.log(err) });
  }

  // sets toast content and makes it visible to user
  function toast(toastDataFromRecipeCard) {
    setToastData(toastDataFromRecipeCard)
    setShowToast(true)
  }

  // hides toast from view and resets its content
  function onClickHideToast() {
    setToastData(null)
    setShowToast(false)
  }

  // set modal content and visibility
  function openModal(message) {
    setModalMessage(message)
    setShowModal(true)
  }

  // reset and hide modal
  function closeModal() {
    setModalMessage(null)
    setShowModal(false)
  }

  return (
    <div className="content">

      {/* section to add item */}
      <div className="content-head">
        <div className="searchbar-section">
          <img src={searchingImg} width="150" height="150" alt="" />

          <p>Enter ingredients to search</p>
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', minWidth: '500px'}}>
              <MultiSelect
                placeholder="ingredients"
                selected={selected}
                setSelected={setSelected}
                />

              {/* submit button */}
              <button className="button" style={{height: '2.5em'}}
                onClick={search}>search</button>
            </div>
          </div>
        </div>
      </div>

      {/* list of items */}
      <div className="list">
        {recipeSearchResults &&
          <>
            {recipeSearchResults.length > 0 ?
              <>
                {recipeSearchResults.map(item =>
                  <RecipeCard recipe={item}
                    toast={toast}/>
                  )}
              </>
              : <p>No results :(</p>
            }
          </>
        }
      </div>

      {// message to user after an action
        toastData &&
        <Toast
          toastData={toastData}
          showToast={showToast}
          onClickHideToast={() => setShowToast(false)}
        />}

      {/* popup for error messages */}
      <Modal showModal={showModal} onDismissCloseModal={closeModal}
        messageToUser={modalMessage}/>

    </div>
  );
}

export default RecipeSearchPage;
