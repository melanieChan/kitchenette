import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import '../Page.css';
import './Cookbook.css';
import defaultImage from '../styles/undraw_breakfast.png'
import RecipePaper from '../components/cards/RecipePaper'
import MultiSelect from '../components/inputs/MultiSelect'

import { getSavedRecipes, unsaveRecipe } from '../api/provider';
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
    setPageNum((pageNum) => (pageNum + 1) % recipeSearchResults.length)
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
    unsaveRecipe(token, unsaved_recipe_id)
      .then( (response) => {
        console.log(response);

        // update UI to remove recipe from displayed list
        // after deletion, it will show the next item in list that comes after the deleted item
        // if deleting last item in list, next page shown will be first item
        if (pageNum === recipeSearchResults.length - 1) setPageNum(pageNum => 0)
        setRecipeSearchResults(recipeSearchResults.filter(recipe => recipe.recipe_id !== unsaved_recipe_id))
      })
      .catch(err => { console.log(err) });
  }

  // if there're no recipes saved
  if (!recipeSearchResults || recipeSearchResults.length === 0) {
    return (
      <div id="content" className="page-content center">
        <div style={{maxWidth: '50%'}}><img src={defaultImage}/></div>
        <h2 className="salmon-text">No recipes saved! Save a few through the Search page to see them in your cookbook.</h2>
      </div>
    );
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

        {recipeSearchResults[pageNum] && pageNum >= 0 &&
        /* image of the recipe */
        <div className="center" style={{width: '30%', minWidth: '300px'}} key={Math.random()}>
            <Image src={recipeSearchResults[pageNum] && recipeSearchResults[pageNum].image}/>
        </div>}

        <div style={{position: 'relative', minWidth: '600px', marginLeft: '30px'}} key={Math.random()}>
        {recipeSearchResults.length > 1 && pageNum >= 0 ?
          <> {/* stack of cookbook pages */}
            {/* top page */}
            <div className="flippable" ref={currentPageRef}
              style={{position:'absolute', zIndex: 2}}>
              {recipeSearchResults && (
                <RecipePaper
                  recipe={recipeSearchResults[pageNum]}
                  onClickUnsave={onClickUnsave}
                  />
              )}
            </div>

            {/* 2nd page */}
            <div style={{position:'absolute', zIndex: 1}}>
              {recipeSearchResults && <RecipePaper recipe={recipeSearchResults[(pageNum + 1) % recipeSearchResults.length]}/>}
            </div>
          </> :
          /* only shows page if there's 1 recipe saved */
          <div className="flippable" style={{position:'absolute', zIndex: 1}}>
            <RecipePaper
              recipe={recipeSearchResults[(pageNum) % recipeSearchResults.length]}
              onClickUnsave={onClickUnsave}
              />
          </div>
        }
        </div>

        {/* next button */
          recipeSearchResults.length > 1 &&
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button className="button" onClick={() => {
              // flip page
                  currentPageRef.current.classList.add('flip'); // animate current page turning
                  setTimeout(()=>{turnPage()}, 1500) // go to next page after 1.2 seconds
            }}>next ></button>
          </div>
        }
      </div>
    </div>
  );
}

export default Cookbook;
