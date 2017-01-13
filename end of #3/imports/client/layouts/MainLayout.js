import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

const MainLayout = ({children}) => {
  return (
    <div className='main-layout'>
      <header>
        <h1>Level Up Voting</h1>
        <LoginButtons />
      </header>
      {children}
    </div>
  )
}
export default MainLayout;
