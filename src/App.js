import './App.css';
import Navbar from './components/smallComponent/navbar/navbar';
import ListData from './components/smallComponent/listData/listData';
import Footer from './components/smallComponent/footer/footer';
import SinglePage from './components/smallComponent/singlePage/singlePage';
import Categories from './components/smallComponent/categories/categories';
import { addData } from './redux/features/allDataSlice/allDataSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Login from './components/adminComponent/login/login';
import SignUp from './components/adminComponent/signUp/signUp';
import WriteContent from './components/adminComponent/writeContent/writeContent';
import axios from 'axios';
// Defining a layout component with Navbar, content (Outlet), and Footer
const Layout = () => {
  return (<>
    <Navbar />
    <Outlet />
    <Footer />
  </>)
}
// Creating the main router configuration with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ListData />
      },
      {
        path: "/:ListDataName/:ListDataId",
        element: <ListData />
      },
      {
        path: "/SinglePage/:objectHeding/:objectId",
        element: <SinglePage/>
      },
      {
        path: "/Categories",
        element: <Categories />
      },
      {
        path:"/Login",
        element:<Login/>
      },
      {
        path:"/SignUp",
        element:<SignUp/>
      },
      {
        path:"/WriteContent",
        element:<WriteContent/>
      }
      
      // {
      //   path:"/notFound",
      //   element:<NotFound/>
      // }
    ]
  },

]);


function App() {
const[data1,setData1]=useState(
 [
    {
        "articleId": 1,
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
    {
        "articleId": 2,
        "title": "Women’s Premier League 2024 Set to Kick Off on February 23",
        "date": "12 march",
        "description": "I love this job posting",
        "image": "https://newblog.indiaarticle24.com/images/1b.webp",
        "imageBig": "https://newblog.indiaarticle24.com/images/1b.webp",
        "categories": ["General", "Tech", "YouTube"],
        "author": "Satish 2",
        "avatar": "https://newblog.indiaarticle24.com/images/1b.webp",
        "autherId": 1235,
    },
    {
        "articleId": 3,
        "title": "Empowerment of Women through Rural Empowerment",
        "date": "12 march",
        "description": "I love this job posting",
        "image": "https://newblog.indiaarticle24.com/images/1b.webp",
        "imageBig": "https://newblog.indiaarticle24.com/images/1b.webp",
        "categories": ["general news", "tech", "867645"],
        "author": "Satish 3",
        "avatar": "https://newblog.indiaarticle24.com/images/1b.webp",
        "autherId": 1236
    },
    {
        "articleId": 4,
        "title": "Empowerment of Women through Rural Empowerment",
        "date": "12 march",
        "description": "I love this job posting",
        "image": "https://i.pinimg.com/originals/d3/b7/bf/d3b7bf96b1e3613fb9968fbcc3f5e864.jpg",
        "imageBig": "https://i.pinimg.com/originals/d3/b7/bf/d3b7bf96b1e3613fb9968fbcc3f5e864.jpg",
        "categories": ["General Love", "Tech", "867645"],
        "author": "Satish1",
        "avatar": "https://i.pinimg.com/originals/d3/b7/bf/d3b7bf96b1e3613fb9968fbcc3f5e864.jpg",
        "autherId": 1234,
    },
    {
      "articleId": 5,
      "title": "Hello of Women through Rural Empowerment",
      "date": "12 march",
      "description": "I love this job posting",
      "image": "https://i.pinimg.com/originals/d3/b7/bf/d3b7bf96b1e3613fb9968fbcc3f5e864.jpg",
      "imageBig": "https://i.pinimg.com/originals/d3/b7/bf/d3b7bf96b1e3613fb9968fbcc3f5e864.jpg",
      "categories": ["General Love", "Tech", "867645"],
      "author": "Satish1",
      "avatar": "https://i.pinimg.com/originals/d3/b7/bf/d3b7bf96b1e3613fb9968fbcc3f5e864.jpg",
      "autherId": 1234,
  },
])

const dispatch=useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const postDataaResponse = await axios.get(`http://localhost:8800/api/post/getHeading`);
        const newData = postDataaResponse.data.map(item => {
          const categoriesArray = item.categories.split('_').map(category => category.trim());
          return {
            ...item,
            categories: categoriesArray
          };
        });
        setData1(newData)
        
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };
    fetchUserData();
  },[]);

  dispatch(addData({ data1 }));


  return (
  
      <div className="container">
      <RouterProvider router={router} />
    </div>
  
  );
}

export default App;
