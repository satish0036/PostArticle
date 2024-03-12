import React, { useState, useEffect } from 'react'
import styles from './categories.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Categories = () => {
    const navigate = useNavigate();
    const data2 = useSelector((state) => state.AllNewData) || { data1: [] };
    console.log(data2.data1)

    const [totalCategories, setTotalCategories] = useState(
        [{
            name: "",
            count: ""
        }])
    const countCategories = (data) => {
        const categoryCounts = {};
        data?.forEach((item) => {
            item.categories.forEach((category) => {
                if (categoryCounts[category]) {
                    categoryCounts[category]++;
                } else {
                    categoryCounts[category] = 1;
                }
            });
        });
        const result = Object.entries(categoryCounts).map(([name, count]) => ({
            name,
            count,
        }));
        return result;
    };
    useEffect(() => {
   
        const categoryCounts = countCategories(data2.data1);
        console.log(categoryCounts);
        setTotalCategories(categoryCounts)
    }, [data2.data1]);

    const handleCategoryClick = (category) => {
        const output = category.replace(/\s+/g, '-');
        navigate(`/${"category"}/${output}`);

    }

    return (
        <div >
            <div className={styles.categoriesLayout}>
                {
                    totalCategories.map((data) =>

                        <div className={styles.categoriesBox} onClick={() => handleCategoryClick(data.name)} >{data.name}{" #("}{data.count}{")"}</div>
                    )
                }
            </div>
        </div>
    )
}

export default Categories