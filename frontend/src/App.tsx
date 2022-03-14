import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { BeerCard, CardItem } from './components/BeerCard';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL!!
  const [items, setItems] = useState([] as CardItem[])
  useEffect(() => {

    fetch(apiUrl)
      .then(response => response.json())
      .then(json => setItems(json))
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
          <h1><img src="logo.svg" width="120" height="120" />
            Little Hills Home Brewery</h1>
        </NavbarBrand>
      </Navbar>
      

      <Container className='container-md'>
        {items.map(item => <BeerCard {...item}></BeerCard>) }

      </Container>
    </>
  );
}

export default App;
