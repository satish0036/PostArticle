import React from 'react'
import styles from "./writeContent.module.css"
import { useState } from 'react';
import TextEditor from '../textEditor/textEditor';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../../../redux/features/allDataSlice/allDataSlice';
import { addNewArticle } from '../../../redux/features/articleSlice/articleSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const WriteContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const storedData = localStorage.getItem("userData");
    // Parse the JSON string back to an object
    const userData = JSON.parse(storedData);


    const [content, setContent] = useState('');
    const [message, setMessage] = useState()
    const [newarticleId,setnewArticleId]=useState("")
    const handleContentChange = (value) => {
        setContent(value);
    };
    const getCurrentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();

        return `${dd}-${mm}-${yyyy}`;
    };
    const [formData, setFormData] = useState({
        title: '',
        date: getCurrentDate(),
        description: '',
        image: '',
        imageBig: '',
        categories: [],
        author: userData.autherName,
        avatar: userData.autherPicture,
        autherId:userData.autherId,
        id: Math.floor(Math.random() * 1000000),
        articleId: Math.floor(Math.random() * 10000000),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "categories") {
            // Assuming value is an array or a comma-separated string
            const categoriesArray = Array.isArray(value) ? value : value;

            setFormData((prevData) => ({
                ...prevData,
                [name]: categoriesArray,
            }));
        }
        else {

            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit =async (event) => {
        event.preventDefault();
        // Add logic to handle form submission (e.g., send data to a server)
        console.log(formData);
        const check = Object.values(formData).every(value => value !== '');
        if (check === true && formData.categories.length !== 0 && content !== "") {
            try {
                // Making a POST request to the signup endpoint
                const res = await axios.post(`http://localhost:8800/api/post/addHeading`, formData)
                // console.log(res)
                setFormData((prevData) => ({
                    ...prevData,
                    ["articleId"]: res.data,
                }));
                setnewArticleId(res.data)
               
                console.log(res.data)
            }
            catch (err) {
                // Handling errors and displaying the error message from the server
                console.log(err.response.data)
                setMessage(err.response.data)
            }
        }
        else {
            setMessage("Either Content or any Field is messing!")
        }
    };

    const handleContentSubmit= async()=>{
        const allnewArtic = {
            "content": content,
            "articleId": formData.articleId
        }

        try {
            // Making a POST request to the signup endpoint
            const res = await axios.post(`http://localhost:8800/api/post/addContent`,allnewArtic)
            console.log(res)
            dispatch(addNewPost({ formData }));
            // dispatch(addNewArticle(allnewArtic))
            navigate("/")
        }
        catch (err) {
            console.log(allnewArtic)
            // Handling errors and displaying the error message from the server
            console.log(err.response.data)
            setMessage(err.response.data)
        }
    }

    console.log(content)
    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentBoxLeft}>
                <div>Make Your Post Here...</div>
                <TextEditor value={content} onChange={handleContentChange} />
                {/* <ShowTextEditor value={content} className="showtext" /> */}
                {/* <div>{content}</div> */}
            </div>
            <div className={styles.contentBoxRight} >
                <div className={styles.blogPostForm} >
                    <label className={styles.formLabel} >
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Date:
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            // onChange={handleChange}
                            placeholder="Enter date"
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Image URL:
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Big Image URL:
                        <input
                            type="text"
                            name="imageBig"
                            value={formData.imageBig}
                            onChange={handleChange}
                            placeholder="Enter big image URL"
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Categories (underscore-separated):
                        <input
                            type="text"
                            name="categories"
                            value={formData.categories}
                            onChange={handleChange}
                            placeholder="Enter categories"
                            required
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Author:
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            // onChange={handleChange}
                            placeholder="Enter author"
                        />
                    </label>

                    <label className={styles.formLabel} >
                        Avatar URL:
                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            placeholder="Enter avatar URL"
                        />
                    </label>

                    <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Post Heading</button>
                    <button className={styles.submitButton} type="submit" onClick={handleContentSubmit}>Post Content</button>
                    {message !== "" ?
                        <p className={styles.errorMessage}>
                            {message}
                        </p> : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default WriteContent