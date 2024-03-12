import React, { useState, useEffect } from 'react'
import styles from './singlePage.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShowTextEditor from '../../adminComponent/textEditor/ShowTextEditor';
import axios from 'axios';
const SinglePage = () => {
    const navigate = useNavigate();
    const { objectHeding, objectId } = useParams();
    console.log(objectHeding)
    console.log(objectId);

    const data =
    {
        "id": 1,
        "title": "Government Schemes in India: Lack of Awareness and Challenges in Schemes for the Poor and Underprivileged",
        "date": "Mar 5, 2024",
        "description": "Government Schemes in India: Lack of Awareness and Challenges in Schemes for the Poor and Underprivileged",
        "image": "https://newblog.indiaarticle24.com/images/1b.webp",
        "imageBig": "https://newblog.indiaarticle24.com/images/1b.webp",
        "categories": ["general", "tech", "gfd"],
        "author": "11Satish",
        "avatar": "https://newblog.indiaarticle24.com/images/1b.webp",
        "autherId": 123
    }

    const [singlePageData, setSinglePageData] = useState(data);
    const data2 = useSelector((state) => state.AllNewData)
    const allArticle = useSelector((state) => state.AllNewArticle)
    const [fetchContentData,setFetchContentData]=useState(
     allArticle.map((article)=>{
            
        if(article.articleId===singlePageData.articleId ){
            // setFetchContentData(article.content)
            console.log(article.content)
            return article.content
        }
    }))
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const postDataaResponse = await axios.get(`http://localhost:8800/api/post/getContent/${objectId}`);
            console.log(postDataaResponse.data.content)
            setFetchContentData(postDataaResponse.data.content)
          } catch (error) {
            console.error('Failed to fetch Content data:', error);
          }
        };
        fetchUserData();
      },[]);
    




    useEffect(() => {
        console.log(data2.data1)
        data2.data1?.forEach((da) => {
            console.log(da)
            if (da.articleId?.toString() === objectId) {
                setSinglePageData(da);
            }
        });
    }, [fetchContentData]);
   
    const handleAutherNameClick = (data) => {
        // console.log(data)
        // navigating to homePage with parms /:{auther}/:{autherId}
        navigate(`/${"author"}/${data.autherId}`);
    }

    const handleCategoryClick = (category) => {
        const output = category.replace(/\s+/g, '-');
        navigate(`/${"category"}/${output}`);

    }

 const handleDelete= async()=>{
    try {
        const postDataaResponse = await axios.delete(`http://localhost:8800/api/post/deletePost/${objectId}`);
       navigate("/")
      } catch (error) {
        console.error('Failed to dlete Content data:', error);
      }
 }

    return (
        <div>

            <div className={styles.single}>
                <div className={styles.singleHead}>
                    <div className={styles.singleHeadTexts}>
                        <h1 className={styles.singleHeadTitle}>{singlePageData.title}</h1>
                        {/* <p className={styles.singleHeadDesc}>{singlePageData.description}</p> */}
                        <div className={styles.singleHeadDetail}>
                            <img src={singlePageData.avatar} loading="lazy" alt="" className={styles.singleAvatar} />
                            <span>
                                <a onClick={() => handleAutherNameClick(singlePageData)}>{singlePageData.author}</a>
                            </span>

                            {
                                singlePageData.categories.map((cate) =>
                                    <a onClick={() => handleCategoryClick(cate)} className={styles.singleCategory}>{cate}</a>
                                )
                            }

                        </div>
                        <div className={styles.timedatebox}>
                        <time>{singlePageData.date}</time>
                        <div className={styles.delete} onClick={handleDelete}>Delete</div>
                        </div>
                    </div>
                    <img src={singlePageData.imageBig} alt={singlePageData.title} className={styles.singleHeadImg} />
                </div>
                <div className={styles.singleBottom}>
                    <div className={styles.singleContent}>
                        <div>
                        <ShowTextEditor value={fetchContentData}  className="showtext" />
                        </div>

                    </div>
                    <div className={styles.singleRightBar}>
                        right part
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SinglePage