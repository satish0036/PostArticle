import React from 'react';
import styles from './footer.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Footer = () => {

  const storedData = localStorage.getItem("userData");
  // Parse the JSON string back to an object
  const userData = JSON.parse(storedData);

  const navigate = useNavigate();
  const handleHeadingClick = () => {
    // navigating to homePage with parms /:{auther}/:{userId}
    // navigate(`/${"$all"}/${"all"}`);
    navigate("/")

  }
  const handleCategoriesClick = () => {
    navigate("/Categories")
  }
  const handleLoginClick = () => {
    navigate("/Login")
  }
  const handleWriteontent = () => {
    navigate("/WriteContent")
  }

  const handleLogout = async () => {
    try {
      // Making a POST request to the signup endpoint
      const res = await axios.post(`http://localhost:8800/api/auth/logout`)
      console.log(res)
      // reset the user data in local storage
      localStorage.setItem("userData", JSON.stringify(""));
      navigate("/")
    }
    catch (err) {
      // Handling errors and displaying the error message from the server
      console.log(err.response.data)
    }
  }
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <a onClick={handleHeadingClick}>Satish Article</a> |
          <a onClick={handleCategoriesClick}>Categories</a> |
          {userData ?
            <a onClick={handleLogout} >Logout</a> :
            <a onClick={handleLoginClick}>Login</a>}
          {userData ?
            <a onClick={handleWriteontent}>{" |"}WriteContent</a> :
            ""}

        </div>
        <div className={styles.social}>
          <a className={styles.socialIconSize} href="https://www.youtube.com/@CodeneticInsights/featured" target="_blank">
            <svg width="25" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="25"
              preserveAspectRatio="xMidYMid meet" version="1.0">
              <defs>
                <clipPath id="269647c057">
                  <path d="M 0.484375 0 L 29.515625 0 L 29.515625 29.03125 L 0.484375 29.03125 Z M 0.484375 0 "
                    clip-rule="nonzero" />
                </clipPath>
              </defs>
              <g clip-path="url(#269647c057)">
                <path fill="#e52d27"
                  d="M 29.515625 24.621094 C 29.515625 27.054688 27.539062 29.03125 25.105469 29.03125 L 4.894531 29.03125 C 2.460938 29.03125 0.484375 27.054688 0.484375 24.621094 L 0.484375 4.414062 C 0.484375 1.980469 2.460938 0 4.894531 0 L 25.105469 0 C 27.539062 0 29.515625 1.980469 29.515625 4.414062 Z M 29.515625 24.621094 "
                  fill-opacity="1" fill-rule="nonzero" />
              </g>
              <path fill="#ffffff"
                d="M 25.289062 14.746094 C 25.289062 16.351562 25.289062 18.050781 24.933594 19.605469 C 24.679688 20.703125 23.785156 21.503906 22.707031 21.625 C 20.15625 21.910156 17.570312 21.914062 15.003906 21.910156 C 12.429688 21.910156 9.851562 21.910156 7.300781 21.625 C 6.222656 21.503906 5.324219 20.703125 5.074219 19.605469 C 4.714844 18.050781 4.714844 16.351562 4.714844 14.746094 C 4.714844 13.140625 4.71875 11.4375 5.074219 9.882812 C 5.324219 8.789062 6.21875 7.984375 7.300781 7.863281 C 9.851562 7.578125 12.433594 7.578125 15.003906 7.578125 C 17.570312 7.578125 20.152344 7.578125 22.707031 7.863281 C 23.78125 7.984375 24.679688 8.789062 24.933594 9.882812 C 25.289062 11.4375 25.289062 13.140625 25.289062 14.746094 Z M 25.289062 14.746094 "
                fill-opacity="1" fill-rule="nonzero" />
              <path fill="#e52d27"
                d="M 12.835938 10.917969 L 12.835938 18.609375 L 18.808594 14.761719 Z M 12.835938 10.917969 "
                fill-opacity="1" fill-rule="nonzero" />
            </svg>
          </a>
          <a className={styles.socialIconSize} href="https://www.linkedin.com/in/satish0036kumar/" aria-label="LinkedIn" target="_blank">
            <svg height="25" width="25" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill="#0A66C2"
                  d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z">
                </path>
              </g>
            </svg>
          </a>
          <a className={styles.socialIconSize} href="https://github.com/satish0036/" aria-label="github" target="_blank">
            <img className={styles.socialIconSize} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
          </a>

        </div>
      </div>
    </div>
  );
}

export default Footer;
