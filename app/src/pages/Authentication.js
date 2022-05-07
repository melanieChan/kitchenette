import React, { useState, useEffect } from 'react';
import '../Page.css';

const Authentication = () => {
  document.title = "Welcome"

  return (
    <div id="content" className="page-content">
      <div style={{display: 'flex', height: '100vh', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        <div style={{minWidth: '500px', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection: 'column'}}>
            <p>Username</p>
            <input className="input"/>

            <br/>
            <p>Password</p>
            <input className="input"/>

            <br/>
            <div style={{display: 'flex', minWidth: '300px', alignItems: 'center', justifyContent: 'space-around', marginTop: '20px'}}>
              <button className="button">login</button>
              <button className="button">sign up</button>
            </div>
        </div>
        <div style={{minWidth: '500px', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <h1 className="coral-text">Welcome</h1>
          <p>find recipes</p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
