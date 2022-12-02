import React, { useState, useEffect } from 'react'

const updatePost = (props) => {
    const [state, setState] = useState({
        username: '',
        content: ''

    })
    const {username, content} = state;

    useEffect(() => {
        axios.get(`http://localhost:8083/posts/${props.match.params.id}`)
        .then(res => {
            const post = res.data;
            setState({...state, username: post.username, content: post.content})
        })
        .catch(err => {
            console.log(err);
        })
    },[])



    const handleChange = name => event => {
        setState({...state, [name]: event.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        axios.put('http://localhost:8083/posts', state)
        .then(res => {
            console.log(res);
            console.log(res.data);
            setState({...state, content:'', username:''})
        })
        .catch(err => {
            console.log(err);
            alert(err.res.data.error)
        }
        )
    }
    const showUpdateForm =()=>{
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea
                        onChange={handleChange('content')}
                        value={content}
                        type="text"
                        className="form-control"
                        placeholder="Write something.."
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Username</label>
                    <input
                        onChange={handleChange('username')}
                        value={username}
                        type="text"
                        className="form-control"
                        placeholder="Your username"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        )
    }

  return (
     // need to call navbar below div
    <div className="container pb-5">
    <h1>UPDATE POST</h1>
    {showUpdateForm()}
</div>
  )
}

export default updatePost