import { useContext, useEffect, useRef, useState } from 'react';
import { Popover, Layer, Tabs, Icon, IconButton, Button, FixedZIndex } from 'gestalt';

import TabsMap from './TabsMap'
import './AppGuide.css'

import { UserContext } from '../../auth/UserContext'

const pathsMap = {
  '/pantry' : 0,
  '/search' : 1,
  '/cookbook' : 2
}

// shows username and logout option
const AppGuide = () => {
  const {userData, setUserData} = useContext(UserContext) // access user data

  const userBtnRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)

  const MODAL_Z_INDEX = new FixedZIndex(50); // used to position open button's tooltip

  var currentTabIndex = pathsMap[window.location.pathname] // get index based on current url
  // activeIndex will either be index of current route, or default to first index's route if we're on the Auth page
  const [activeIndex, setActiveIndex] = useState(currentTabIndex || 0);

  useEffect(() => {
    // route changes will also cause popover changes
    // reset tab to show data corresponding to current route
    setActiveIndex(pathsMap[window.location.pathname] || 0)
  }, [openPopover])

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };

  const onClickPopoverOpener = ( event ) => {
    event.stopPropagation()
    setOpenPopover(false)
  };

  const tabContent = [
    <>
      <p><b>Add</b> an ingredient by entering the name and quantity.</p>
      <p><b>Change</b> the quantity by using the plus or minus buttons.</p>
      <p>Ingredients will automatically be <b>deleted</b> when their quantity reaches 0.</p>
    </>,
    <>
      <p><b>Search for recipes based on ingredients</b> by entering at least one ingredient</p>
      <p>
        After clicking the 'search' button and seeing the search results, you have the option to <b>save a recipe search result</b>.
        Doing so will add the saved recipe to your collection of saved recipes, called a Cookbook.
      </p>
    </>,
    <>
      <b>Seeing Recipes</b>
      <p>See saved recipes in order of oldest to most recent.</p>
      <p>Only 1 recipe is shown at a time. To see other recipes in the Cookbook, click the right-facing arrow button for the next recipe.</p>
      <b>Use Recipe</b>
      <p>To help you update your pantry after cooking a recipe, the <b>Use Recipe</b> feature will try to find the recipe ingredients in your pantry. For ingredients you have, it will <b>lower the ingredient quantity by 1</b>.
        For ingredients you don't have, there will be no effect.</p>
      <p><b>Use Recipe</b> will also <b>add the new cooked dish</b> to your pantry with a starting quantity of 1. If you already have it in your pantry, it will increment the quantity by 1.</p>
      <b>Unsave Recipe</b>
      <p>You can also <b>Unsave</b> a recipe, and it will disappear from your Cookbook. </p>
    </>
  ]

  if (!userData) return <></>

  return (
    <>
      <IconButton
          ref={userBtnRef}
          onClick={() => setOpenPopover(!openPopover)}
          icon="question-mark"
          tooltip={{text: "Tutorial", zIndex: MODAL_Z_INDEX}}
        />

      {openPopover &&
        <Layer>
          <Popover
            anchor={userBtnRef.current}
            id="popover-user-btn"
            idealDirection="down"
            onDismiss={() => setOpenPopover(false) }
            positionRelativeToAnchor={false}
            size="xl"
            >
            <div className="popover-content">
              {/* header */}
              <div className="popover-header">
                <h1>Features</h1>

                {/* row of tabs */}
                <div className="row-tab-labels">
                  <TabsMap
                    activeTabIndex={activeIndex}
                    homeTabIndex={currentTabIndex}
                    onChange={handleChange}
                    tabs={[{text: "Pantry"}, {text: "Search"}, {text: "Cookbook"}]}
                    wrap
                    />
                </div>
              </div>

                {/* content under the current tab */}
                <div className="tab-content">
                  {tabContent[activeIndex]}
                 </div>
            </div>
          </Popover>
        </Layer>
      }
    </>
  );
}

export default AppGuide;
