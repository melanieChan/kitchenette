import { useRef, useState } from 'react';
import { Tabs, Icon } from 'gestalt';

/* built on top of Gestalt's Tabs component to display an icon next to the current tab,
  and a location indicator icon next to a fixed tab
  one extra prop is added to mark the tab representing the current webpage
*/
export default function TabsMap(props) {
  // get data from parameters
  const {
    activeTabIndex, // to know which tab index to put the icon on
    onChange, // to rerender the tabs the icon in the correct place
    tabs, // to construct tab objects based on data of these tab names
    homeTabIndex // a home tab wouldn't change no matter which tab is selected, it's used to indicate the default/original tab
  } = props

  // array of tab indices and their corresponding tab name based on the tab list parameter
  // will be used for reference when creating tabs
  const indexToLabel = tabs.map((tabObj) => tabObj.text)

  // creates a tab object that can be fed into the gestalt Tabs component to render a single tab
  // constructs tab based on its index and option to add a location icon on the right side
  const constructTabObj = (tabIndex, includeIcon) => {
    return ({text:
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        {indexToLabel[tabIndex] /* name of tab */ }
        {// location or pin icon
          tabIndex === homeTabIndex ?
          // shows location icon if it's the home tab
          <div className="location-icon"><Icon icon="location" inline color="default" /></div>
          : <> {
            // shows pin icon if this is the current tab
            includeIcon &&  <Icon icon="pin" inline color="default" />
          } </> || <></>
        }
      </div>
    });
  }

  // tabs without icons
  const unvisitedTabs = tabs.map((...[,index]) => constructTabObj(index, false))

  // construct an array of tab data that shows the current tab with an icon
  const constructTabsArray = (activeIndex) => {
    return [...unvisitedTabs.slice(0,activeIndex), // reset elements before target
      constructTabObj(activeIndex, true), // add icon to current tab
      ...unvisitedTabs.slice(activeIndex + 1, unvisitedTabs.length) // reset elements after
    ]
  }

  // these are the data of the current tabs being displayed
  // similar to original tabs list, but these tabs will show an icon for the current tab
  const [tabsInternal, setTabsInternal] = useState(constructTabsArray(activeTabIndex));

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();

    // show current tab with icon
    setTabsInternal(constructTabsArray(activeTabIndex))

    onChange({ activeTabIndex, event }) // call function passed from parent
  };

  return (
    <Tabs {...props}
        onChange={handleChange}
        tabs={tabsInternal}
      />
  );
}
