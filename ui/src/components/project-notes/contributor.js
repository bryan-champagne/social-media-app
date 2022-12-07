import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const Contributor = (props) => {
    const  contributor  = props.record;

    const deleteContributor = async (contributor) => {
      axios.delete(`http://localhost:8095/project_notes/contributor/${contributor._id}`)
          .then(response => {
              alert('Contributor deleted.')
          })
          .catch(error => alert('Error deleting contributor'))
    }

    return(
      <Card body outline color="success" className="mx-1 my-2" style={{ width: '30rem' }}>
        <Card.Body> 
            <Stack> 
              <div><h4>{contributor.name}</h4></div>
              <div>{contributor.position}</div>
              <div>
                <Button variant="primary" className="mx-1 my-1" href={`/project-notes/editContributor/${contributor._id}`} >Edit</Button>
              </div>
              <div>
                <Button variant="primary" className="mx-1 my-1" onClick={() => deleteContributor(contributor)}>Delete</Button>
              </div>
            </Stack>
        </Card.Body>
      </Card>
    )
};

export default Contributor;