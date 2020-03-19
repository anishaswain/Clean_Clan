import React from 'react';
import Button from 'react-bootstrap/button';
import { useSelector } from 'react-redux';
import LogoutButton from '../../components/LogoutButton';
import { LOGGED_IN } from '../../constants';
import './style.css';

const HomePage = () => {
  const authState = useSelector((state) => state.user.auth.status);
  const user = useSelector((state) => state.user.data);
  return (
    <div className="header-content cover-all have-background-img">
      <div className="header-content-inner center-vert-hor">
        <h1>CLEAN CLAN</h1>
        <hr />
        <p>
          An initiative to make Swachh Bharat program more of a game and lots of fun.
          <br />
          &quot;Ab khel khel me badlega Bharat&quot;
        </p>
        <div className="homepage-navigation">
          {authState === LOGGED_IN && user && user.name ? (
            <>
              <Button variant="primary" href="/profile" block>
                Continue as
                {' '}
                <strong>{user.name}</strong>
              </Button>
              <br />
              <LogoutButton />
            </>
          ) : (
            <Button variant="info" href="/login" block>
              <strong>SIGN IN</strong>
            </Button>
          )}
          <br />
          { authState !== LOGGED_IN
            ? (
              <Button variant="dark" href="/signup" block>
                <strong>NEW ACCOUNT</strong>
              </Button>
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
