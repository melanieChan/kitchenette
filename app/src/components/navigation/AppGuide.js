import { useContext, useEffect, useRef, useState } from 'react';
import { Popover, Layer, Tabs, Icon, IconButton, Button, FixedZIndex } from 'gestalt';

import TabsMap from './TabsMap'

import { UserContext } from '../../auth/UserContext'

// shows username and logout option
const AppGuide = () => {
  const {userData, setUserData} = useContext(UserContext) // access user data

  const userBtnRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)

  const MODAL_Z_INDEX = new FixedZIndex(50); // used to position open button's tooltip

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };

  const onClickPopoverOpener = ( event ) => {
    event.stopPropagation()
    setOpenPopover(false)
  };

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
            <div style={{paddingLeft: '40px', paddingRight: '20px'}}>
              {/* header */}
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                <h1>Features</h1>

                {/* row of tabs */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <TabsMap
                    activeTabIndex={activeIndex}
                    onChange={handleChange}
                    tabs={[{text: "Pantry"}, {text: "Search"}, {text: "Cookbook"}]}
                    wrap
                    />
                </div>
              </div>

                {/* content under the current tab */}
                <div style={{width: '350px', color: 'black'}}>
                  {(() => {
                     switch (activeIndex) {
                        case 0:
                              return (<>
                                Pantry
                              </>)
                        case 1:
                              return (<>
                                <p><b>Search for recipes based on ingredients</b> by entering at least one ingredient</p>
                                <p>
                                  After clicking the 'search' button and seeing the search results, you have the option to <b>save a recipe search result</b>.
                                  Doing so will add the saved recipe to your collection of saved recipes, called a Cookbook.
                                </p>
                              </>)
                        default:
                              return <></>
                     }
                   })()}
                 </div>
            </div>
          </Popover>
        </Layer>
      }
    </>
  );
}

export default AppGuide;
