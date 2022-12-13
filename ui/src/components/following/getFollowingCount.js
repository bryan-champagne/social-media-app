import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import './followingSheet.css'
import Button from 'react-bootstrap/Button';


// The FollowerCount component.  This is the main component in this file.

export default function FollowingCount(props) {
export default function FollowingCount(props) {

  let navigate = useNavigate() 

  const params = useParams();
  const [followState, setFollowCount] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {

    // Gets the following count of the user.
    async function getFollowingCount() {

      const response = await fetch(`http://localhost:8085/following/${props.username}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      try{
      const fetchedFollowers = await response.json();

      setFollowCount(fetchedFollowers[0].following);  // Sets the fetched followings of the user.
      console.log(fetchedFollowers[0].following);
      }catch(error){
        setError(error)
      }

    }

    getFollowingCount();   

    return; 
  }, [followState.length]);  

  const followingRouteChange = () =>{ 
    navigate(`/following/${props.username}`); // To use in the following button to switch to the user's following list.
  }



  // This function is very important, it returns the following count.

   function FollowCount() {
    if (followState.length > 0){            
      return followState.length;
    }
    else{
      return 0;
    }
  }


  //if (!user) return (<div><h3>You are not authorized to view this page, Please Login in <Link to={'/login'}><a href='#'>here</a></Link></h3></div>)

  // Returns the Follow count of the user.
  return (<div><Button onClick={followingRouteChange}><FollowCount/> Following</Button></div>);
}