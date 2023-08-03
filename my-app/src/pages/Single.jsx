import React , {useContext, useEffect , useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../image/edit.png"
import Delete from "../image/delete.png"
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
    const [post,setPost] = useState({});

    const location = useLocation(); 

    const navigate = useNavigate() ; 

    const postId = location.pathname.split("/")[2]

    const {currentUser}  = useContext(AuthContext)
    
    
    useEffect(() => {
        const fetchData = async () => {
        try {
          const res = await axios.get(`/posts/${postId}`);
          setPost(res.data);
        } catch(err){
          console.log(err);
        }
      };
    fetchData();
  }, [postId]);

    const handledelete = async ()=>{
      try {
        await axios.delete(`/posts/${postId}`);
        navigate("/")
      } catch(err){
        console.log(err);
      }
    }

    return (
        <div className='single'>
            <div className="content">
                <img 
                    src= {`../upload/${post?.image}`} 
                    alt="" />
            <div className="user">
                <img 
                  src = "https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png" 
                  alt = ""/>
            <div className="info">
                <span>{post.username} </span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
              <div className="edit">
                <Link to= {`/write?edit=2`} state ={post}>
                    <img src = {Edit} alt = ""/>
                </Link>
                <img onClick={handledelete}src = {Delete} alt = ""/>
            </div>
            )}
            </div>
            <h1>{post.title}</h1>
                {post.description}
            </div>
          <Menu cat = {post.cat}/>
        </div>
    )
}

export default Single