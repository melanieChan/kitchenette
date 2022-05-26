import { useContext, useRef, useState } from 'react';
import { Popover, Layer } from 'gestalt';

import { UserContext } from '../../auth/UserContext'

// shows username and logout option
const UserButton = () => {
  const {userData, setUserData} = useContext(UserContext) // access user data

  const userBtnRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)

  function logout() {
    setUserData(null)
    setOpenPopover(false)
  }

  if (!userData) return <></>

  return (
    <>
      <button className="button"
        ref={userBtnRef}
        onClick={() => setOpenPopover(!openPopover) }
        >{userData ? userData.user.username : 'log in'}</button>

      {openPopover &&
        <Layer>
          <Popover
            anchor={userBtnRef.current}
            id="popover-user-btn"
            idealDirection="down"
            onDismiss={() => setOpenPopover(false) }
            positionRelativeToAnchor={false}
            size="lg"
            >
            <button className="logout-btn" onClick={logout}>logout</button>
          </Popover>
        </Layer>
      }
    </>
  );
}

export default UserButton;
