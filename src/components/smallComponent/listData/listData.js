import React from 'react'
import styles from './listData.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const ListData = () => {
 
    const navigate = useNavigate();

    const { ListDataName, ListDataId } = useParams();
    // console.log(ListDataName)
    // console.log(ListDataId);
   


    const data1 = [
        {
            "id": 1,
            "title": "Empowerment of Women through Rural Empowerment",
            "date": "12 march",
            "description": "I love this job posting",
            "image": "https://newblog.indiaarticle24.com/images/1b.webp",
            "imageBig": "https://newblog.indiaarticle24.com/images/1b.webp",
            "categories": ["General", "Tech", "867645"],
            "author": "Satish1",
            "avatar": "https://newblog.indiaarticle24.com/images/1b.webp",
            "autherId": 1234,
        },
       
    ]

    const data2 = useSelector((state) => state.AllNewData) || { data1: [] };
    
    console.log(data2.data1)


    const [data, setData] = useState(data1)
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3

    const handleHeadingClick = (data) => {
        console.log(data)
        const output = data.title.replace(/\s+/g, '-');
        navigate(`/SinglePage/${output}/${data.articleId}`);
    }
    // Function to filter data based on author's name
    const filterDataByAuthor = (autherId) => {

        return data2.data1?.filter((item) => item.autherId.toString() === autherId.toString());
    };

    const filterDataByCategory = (categoryName) => {
        return data2.data1?.filter((item) => item.categories.includes(categoryName));
    }

    const handleAutherNameClicked = (autherId) => {
        navigate(`/${"author"}/${autherId}`);
        setCurrentPage(1)
    }
    const handleCategoryClick = (categoryName) => {
        const output = categoryName.replace(/\s+/g, '-');
        navigate(`/${"category"}/${output}`);
        setCurrentPage(1)
    }

    useEffect(() => {
        setData(data2.data1)
        const fetchData = () => {
           
            if (ListDataName === "author") {
                const filteredData = filterDataByAuthor(ListDataId);
                setData(filteredData);
            }
            if (ListDataName === "category") {
                var outputString = ListDataId.replace(/-/g, ' ').replace(/\b\w/g, function (match) {
                    return match;
                });
                const filteredData = filterDataByCategory(outputString);
                setData(filteredData);
            }
            if (ListDataName === "$all") {
                setData(data2.data1);
            }
        };
        fetchData();
    
    }, [ListDataName, ListDataId,data2.data1]);
 

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    // Filter the user data for the current page
    const dataOnCurrentPage = data?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data?.length / recordsPerPage);
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

console.log(data)
console.log(dataOnCurrentPage)
  



    return (
        <div>
            {dataOnCurrentPage?.map((singleData,index) =>
                <div className={styles.list} key={index}>
                    <div className={styles.listItem}>
                        <img src={singleData.image} alt={singleData.title} className={styles.listItemImage} loading="lazy" />
                        <div className={styles.listItemTexts}>
                            <h1 className={styles.listItemTitle} onClick={() => handleHeadingClick(singleData)} >
                                <a >{singleData.title}</a>
                            </h1>
                            <p className={styles.listItemDesc}>{singleData.description}</p>
                            <div className={styles.listItemDetail} key={index}>
                                <img src={singleData.avatar} loading="lazy" alt={singleData.author} className={styles.listItemAvatar} />
                                <span>
                                    <a className={styles.autherName} onClick={() => handleAutherNameClicked(singleData.autherId)}>{singleData.author}</a>
                                </span>
                                <time>{singleData.date}</time>
                            </div>
                            <div className={styles.listItemCategories}>
                                {
                                    singleData.categories.map((cate) =>
                                        <a className={styles.listItemCategory} onClick={() => handleCategoryClick(cate)}>{cate}</a>

                                    )

                                }
                            </div>

                        </div>
                    </div>

                </div>

            )}

            <div className={styles.pagination}>
                <button className={styles.pageItem}
                    onClick={() => goToPage(currentPage - 2)}
                    disabled={currentPage <=2}
                    style={currentPage <=2 ? { cursor: 'not-allowed' } : {}}
                    >
                    ««
                </button>
                <button className={styles.pageItem}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={currentPage === 1 ? { cursor: 'not-allowed' } : {}}
                    >
                    «
                </button>

                {/* previous end */}


                <button className={styles.pageItem}
                    onClick={() => goToPage(currentPage)}
                    >
                    {currentPage}
                </button>
               

                {/* next start  */}
                <button
                    className={styles.pageItem}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={currentPage === totalPages ? { cursor: 'not-allowed' } : {}}
                    >
                    »
                </button>
                <button
                    className={styles.pageItem}
                    onClick={() => goToPage(currentPage +2)}
                    disabled={currentPage+1>= totalPages}
                    style={currentPage + 1 >= totalPages ? { cursor: 'not-allowed' } : {}}
                  
                    >
                        
                    »»
                </button>
                <button
                    className={styles.pageItem}
                    // onClick={() => goToPage(currentPage + 1)}
                    style={{ cursor: 'not-allowed' }}
                    disabled >
                    {currentPage}/{totalPages}
                </button>
            </div>



        </div>
    )
}

export default ListData