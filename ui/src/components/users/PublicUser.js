import React, { useState, useEffect, useContext } from 'react';
import { Image } from "react-bootstrap";
import {Row, Col} from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {UserContext} from "../../App"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from "moment";
import getUserInfo from '../../utilities/decodeJwt';
import Form from 'react-bootstrap/Form';
import Post from '../post/post';
import PostList from '../post/feedPage';



const PublicUser = () => {
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const user = useContext(UserContext)
	const username = getUserInfo().username
	const [form, setValues] = useState({content : ""})
	const [posts, setPosts] = useState([])
	const navigate = useNavigate();



	const fetchPosts = async () => {
	  const res = await axios.get(`http://localhost:8083/posts/getAllPosts/${posts}`)
		  .then(res => {
			  setPosts(res.data)
		  })
		  .catch(error => alert('error fetching data'))
	}

	useEffect(() => {
		  fetchPosts()
	}, [])


return(
	<div class="container">
		<div class="col-md-12 text-center">

<h1>{Post && Post.PostList}</h1>
        
			<div class="col-md-12 text-center">
			</div>
			<div class = "col-md-12 text-center">
			</div>
		</div>
	
<Card.Header>{Post && Post.PostList}</Card.Header>
          <div>
          <h3>All Posts</h3>
				  <Row>
			</Row>
			<Card style={{ width: '5rem' }}></Card>
   </div>
   <div>
            {posts.map((posts, index) => (
                <div key={index}>
                    <Card style={{ width: '18rem' , marginTop:'1cm', marginLeft:'.5cm',background:'aliceblue'}}>
                        
                        <Card.Body>
                            <Card.Title><h5>User:</h5><Link to={'/publicprofilepage'}>{posts.username}</Link>{}</Card.Title>
                                {posts.content}
                            <p>{moment(posts.createdAt).format("MMM DD yyyy")}</p>
                            
                        </Card.Body>
                    </Card>
                </div>
                
            ))}
   </div>
  </div>
)


}

export default PublicUser