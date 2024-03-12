import React from 'react'
import styles from "./signUp.module.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const SignUp = () => {
    const navigate = useNavigate()
    const handleNewPerson = () => {
        navigate("/Login")
    }
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        autherName: "",
        mobileNumber: '',
        password: '',
        passCode: "",
        autherpicture: ""
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
    const handleSubmit = async() => {
        console.log(formData)
        const check = Object.values(formData).every(value => value !== '');
        if (check === true && isPasswordValid() === true) {


            try {
                // Making a POST request to the signup endpoint
                console.log(formData)
                const res = await axios.post(`http://localhost:8800/api/auth/signup`, formData)
                navigate("/Login")
                console.log(res.data)
            }
            catch (err) {
                // Handling errors and displaying the error message from the server
                console.log(err.response.data)
                setMessage(err.response.data)
            }




            setFormData({
                // autherName: "",
                // mobileNumber: '',
                password: '',
                passCode: "",
                // autherpicture: ""
            })
        }
        else {
            setMessage("Fill it carefully")
        }


    }
    console.log(formData)

    return (
        <div className={styles.loginLayout}>
            <div className={styles.loginBox}>
                <h2>SignUp Page</h2>

                <input
                    className={styles.inputText}
                    type="text"
                    name="autherName"
                    value={formData.autherName}
                    onChange={handleChange}
                    placeholder="Enter Auther Name"
                />
                <input
                    className={styles.inputText}
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                />
                <input
                    className={styles.inputText}
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                />


                {formData.password && !isPasswordValid() && (
                    <p className={styles.errorText}>
                        Password must be at least 8 characters, including one number and one special symbol.
                    </p>
                )}
                 <input
                    className={styles.inputText}
                    type="text"
                    name="autherpicture"
                    value={formData.autherpicture}
                    onChange={handleChange}
                    placeholder="Enter autherpicture url"
                />
                <input
                    className={styles.inputText}
                    type="text"
                    name="passCode"
                    value={formData.passCode}
                    onChange={handleChange}
                    placeholder="Enter passCode"
                />

                <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
                {message !== "" ?
                    <p className={styles.errorMessage}>
                        {message}
                    </p> : ""
                }
                <span className={styles.newHere} onClick={handleNewPerson} >I have Account ! Login...</span>
            </div>
        </div>
    )
}

export default SignUp