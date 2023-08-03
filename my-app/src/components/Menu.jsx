import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({cat}) => {
    const [posts,setPosts] = useState([]);

    // const cat = useLocation().search
    
    useEffect(() => {
        const fetchData = async () => {
        try {
          const res = await axios.get(`/posts/?cat=${cat}`);
          setPosts(res.data);
        } catch(err){
          console.log(err);
        }
      };
    fetchData();
  }, [cat]);
  

    // const posts = [
    //     {
    //         id:1 ,
    //         title: "Latest toolkit for android developers is Jetpack Compose" , 
    //         desc: "Latest news headlines ", 
    //         img: "https://i.pinimg.com/736x/cd/0c/13/cd0c13629f217c1ab72c61d0664b3f99.jpg"
    //     },
    //     {
    //         id:2 ,
    //         title: "Latest toolkit for android developers is Jetpack Compose" , 
    //         desc: "Latest news headlines ", 
    //         img: "https://wallpapers.com/images/featured/720p-nature-background-te0eo4yinuw49nh1.jpg"
    //     },
    //     {
    //         id:3 ,
    //         title: "Latest toolkit for android developers is Jetpack Compose" , 
    //         desc: "Latest news headlines ", 
    //         img: "https://blog.depositphotos.com/wp-content/uploads/2017/07/Soothing-nature-backgrounds-2.jpg.webp"
    //     },
    //     {
    //         id:4 ,
    //         title: "Latest toolkit for android developers is Jetpack Compose" , 
    //         desc: "Latest news headlines ", 
    //         img: "https://wallpapers.com/images/featured/waterfall-v6v13a5e1ir9jizw.jpg"
    //     },
    // ];

    return (
        <div className='menu'>
            <h1>Other Posts you may like</h1>
{posts.map((post) => ( 
        <div className="post" key={post.id}> {/* Provide a unique key */}
          <img src={post.image} alt={post.title} /> {/* Add the alt attribute */}
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
        </div>
    )
}

export default Menu