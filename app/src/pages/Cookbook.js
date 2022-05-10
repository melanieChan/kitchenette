import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import '../Page.css';
import './Cookbook.css';
import defaultImage from '../styles/undraw_breakfast.png'
import RecipePaper from '../components/cards/RecipePaper'
import MultiSelect from '../components/inputs/MultiSelect'

import { getSavedRecipes } from '../api/provider';
import { UserContext } from '../auth/UserContext'

const Cookbook = () => {
  document.title = "Cookbook Recipes"

  const { userData } = useContext(UserContext) // get user data
  var { token } = userData ? userData : {token: 'token123'} // set a valid token for now

  const currentPageRef = useRef(null)

  const [recipeSearchResults, setRecipeSearchResults] = useState(null);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    // find recipes the user already saved
    getSavedRecipes(token)
      .then( (response) => {
        console.log(response);

        // after data received, update UI
        setRecipeSearchResults(response)
      })
      .catch(err => { console.log(err) });

  }, [])

  async function turnPage() {
    setPageNum((pageNum + 1) % recipeSearchResults.length)
    // currentPageRef.current.classList.remove('flip')
  }

  // display for the recipe's image
  const Image = ({src}) => {
    function isValidUrl(urlString) {
      try {
        let url = new URL(urlString);
      } catch (_) {
        return false;
      }
      return true;
    }

    if (!isValidUrl(src)) return (<></>);
    return (
      <img src={src} alt="" onError={(e) => e.target.src = defaultImage}/>
    );
  }

  function onClickUnsave(unsaved_recipe_id) {
    setRecipeSearchResults(recipeSearchResults.filter(recipe => recipe.recipe_id !== unsaved_recipe_id))
  }

  return (
    <div id="content" className="page-content">

      {/* contains cookbook and its button */}
      <div style={{
          width: '100vw',
          height: '80vh',
          paddingTop: '50px',
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'
        }}>

        <div className="center" style={{width: '30%', minWidth: '300px'}} key={pageNum}>
          {recipeSearchResults && recipeSearchResults.length > 0 &&
            <Image src={recipeSearchResults[pageNum].image}/>}
        </div>

        {/* contains cookbook pages */}
        <div style={{position: 'relative', minWidth: '600px', marginLeft: '30px'}}>
          {/* top page */}
          <div className="flippable" ref={currentPageRef} key={pageNum}
            style={{position:'absolute', zIndex: 2}}>
            {recipeSearchResults && (
              <RecipePaper recipe={recipeSearchResults[pageNum]}
                onClickUnsave={onClickUnsave}
                />
            )}
          </div>

          {/* 2nd page */}
          <div style={{position:'absolute', zIndex: 1}}>
            {recipeSearchResults && <RecipePaper recipe={recipeSearchResults[(pageNum + 1) % recipeSearchResults.length]}/>}
          </div>
        </div>

        {/* next button */}
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button className="button" onClick={() => {
            // flip page
            var promise = Promise.resolve('promise resolved');
            promise.then(() => {
                currentPageRef.current.classList.add('flip'); // animate current page turning
                setTimeout(()=>{turnPage()}, 1200) // go to next page after 1.2 seconds
            })
          }}>next ></button>
        </div>
      </div>
    </div>
  );
}

export default Cookbook;
