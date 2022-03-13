import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, Navbar, NavbarBrand} from 'reactstrap'

function App() {
  const apiUrl = process.env.REACT_APP_API_URL!!
  const [message, setMessage] = useState("")
  useEffect(() => {
    
    fetch(apiUrl)
        .then(response => response.text())
        .then(text => setMessage(text))
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);


  return (
<>
<Navbar
    color="light"
    container="md"
    expand="md"
    light
  >
    <NavbarBrand href="/">
    <h1><img src="logo.svg" width="120" height="120"/>
      Little Hills Home Brewery</h1>
    </NavbarBrand>
    </Navbar>


    <Container className='container-md'
    >
      <Card>
      <CardBody>
        <CardTitle tag="h5">
          Info from Backend
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Response from {process.env.REACT_APP_API_URL}
        </CardSubtitle>
        <CardText>
          {message}
        </CardText>
        <Button>
          Gimme
        </Button>
      </CardBody>
      </Card>
    </Container>
    </>
  );
}

export default App;
