import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleHeadingClick = () => {
    // navigating to homePage with parms /:{auther}/:{userId}
    // navigate(`/${"$all"}/${"all"}`);
    navigate("/")

  }
  const handleCategoriesClick = () => {
    navigate("/Categories")
  }
  const [dark, setDark] = useState(true)

  const handleBallClick = () => {
    setDark(!dark)
  }
  useEffect(() => {
    // This will run after the state has been updated
    document.body.className = dark ? '' : 'light';
  }, [dark]);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.indiaarticle}  onClick={handleHeadingClick}>
            Post Article
          </div>
          {/* <div style={{ fontSize: '16px' }}>News First</div> */}
        </div>
        <div className={styles.links}>

          <div className={styles.toggle}>
            <svg width="20px" height="20px" viewBox="-0.14 0 20.03 20.03" fill="#000000">
              <g id="moon-alt" transform="translate(-2.25 -2)">
                <path id="secondary" fill="#ffe01b"
                  d="M21,12A9,9,0,0,1,3.25,14.13,6.9,6.9,0,0,0,8,16,7,7,0,0,0,11.61,3H12a9,9,0,0,1,9,9Z"></path>
              </g>
            </svg>
            {dark ? (
              <div onClick={handleBallClick} className={styles.ball}></div>
            ) : (
              <div onClick={handleBallClick} className={styles.ballLight}></div>
            )}

            <svg width="20px" height="20px" viewBox="0 0 20 20" fill="#000000">
              <g id="sun" transform="translate(-2 -2)">
                <circle id="secondary" fill="#ffe01b" cx="4" cy="4" r="4" transform="translate(8 8)"></circle>
                <path id="primary"
                  d="M12,3V4M5.64,5.64l.7.7M3,12H4m1.64,6.36.7-.7M12,21V20m6.36-1.64-.7-.7M21,12H20M18.36,5.64l-.7.7M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"
                  fill="none" stroke="#ffe01b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                </path>
              </g>
            </svg>
          </div>
          <a onClick={handleHeadingClick}>Homepage</a>
          <a onClick={handleCategoriesClick}>Categories</a>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
