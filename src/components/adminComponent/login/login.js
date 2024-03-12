import React, { useState } from 'react'
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const handleNewPerson = () => {
    navigate("/SignUp")
  }
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setMessage("")
  }
  const isPasswordValid = () => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(formData.password);
  };
  const handleSubmit = async () => {
    const check = Object.values(formData).every(value => value !== '');
    if (check === true && isPasswordValid() === true) {
      try {
        // Making a POST request to the login endpoint
        const res = await axios.post(`http://localhost:8800/api/auth/login`, formData, { withCredentials: true })
        navigate("/WriteContent")


        // Storing the user data in local storage
        localStorage.setItem("userData", JSON.stringify(res.data));


      }
      catch (err) {
        // Handling errors and displaying the error message from the server
        console.log(err.response.data)
        setMessage(err.response.data)
      }
    }
    else {
      setMessage("Bhai Dekh lo ek baar!")
    }

  }
  console.log(formData)
  return (
    <div
      className={styles.loginLayout}>
      <div className={styles.loginBox}>
        <h2>Login Page</h2>
        <input
          className={styles.inputText}
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Enter MobileNumber"
        />
        <input
          className={styles.inputText}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter Password'
        />

        <button className={styles.submitButton} onClick={handleSubmit} >Submit</button>
        {message !== "" ?
          <p className={styles.errorMessage}>
            {message}
          </p> : ""
        }
        <span className={styles.newHere} onClick={handleNewPerson} >New to IndiaArticle24?</span>
      </div>
    </div>
  )
}

export default Login