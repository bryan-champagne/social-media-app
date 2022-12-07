import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const getAllPost = () => {
  
    const [posts, setPosts] = useState([])


    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:8083/posts/getAllPosts')
            .then(res => {
                setPosts(res.data)
            })
            .catch(error => alert('error fetching data'))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const deleteConfirm = posts => {
        let answer = window.confirm('Are you sure you want to delete your post?')
        if (answer) {
            deletePost(posts)
        }
    }

    const deletePost = async (posts) => {
        axios.delete(`http://localhost:8083/posts/deletePost/${posts._id}`)
            .then(response => {
                alert('Post deleted successfully')
                fetchPosts()
            })
            .catch(error => alert('Error deleting post'))
    }

    return (
        <div>
            <h1>All Posts</h1>
            {posts.map((posts, index) => (
                <div key={index}>
                    <Card style={{ width: '18rem' , marginTop:'1cm', marginLeft:'21cm'}}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title><h5>Username:</h5>{posts.username}</Card.Title>
                            <Card.Text><h3>Content:</h3>
                                {posts.content}
                            </Card.Text>
                            <Link style={{ marginRight: '1cm' }} to={`/updatepost/${posts._id}`}><Button variant="primary">Update</Button></Link>
                            <Button variant="danger" onClick={() => deleteConfirm(posts)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}
  


export default getAllPost
