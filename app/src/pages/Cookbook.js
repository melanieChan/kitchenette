import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../Page.css';
import './Cookbook.css';
import RecipePaper from '../components/cards/RecipePaper'
import MultiSelect from '../components/inputs/MultiSelect'

const Cookbook = () => {
  document.title = "Cookbook Recipes"

  const currentPageRef = useRef(null)

  const [recipeSearchResults, setRecipeSearchResults] = useState(null);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    setRecipeSearchResults([
      {name: 'recipe1'},
      {name: 'recipe2'},
      {name: 'recipe3'},
    ])

  }, [])

  async function turnPage() {
    setPageNum((pageNum + 1) % recipeSearchResults.length)
    // currentPageRef.current.classList.remove('flip')
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

        <div style={{width: '30%', minWidth: '300px', backgroundColor: 'peachpuff'}}>
          <p></p>
        </div>

        {/* contains cookbook pages */}
        <div style={{position: 'relative', minWidth: '600px', marginLeft: '30px'}}>
          {/* top page */}
          <div className="flippable" ref={currentPageRef} key={pageNum}
            style={{position:'absolute', zIndex: 2}}>
            {recipeSearchResults && (
              <RecipePaper recipe={recipeSearchResults[pageNum]}/>
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
