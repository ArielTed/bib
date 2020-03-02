import React, { Component } from 'react';
import maitre from '../images/maitre.jpg';
import bib from '../images/bib.jpg';
import x from '../images/x.png';
import { Navbar, Nav, Form, FormControl, Button, Row, Col, Image } from 'react-bootstrap';

const layout = {
  'display': 'inline-block',
  'vertical-align': 'top',
  'width': '80px',
  'height': '50px',
  'margin-right': '20px',
	'margin-top': '0px',
	'margin-left': '240px'
}

const layout2 = {
  'display': 'inline-block',
  'vertical-align': 'top',
  'width': '40px',
  'height': '25px',
  'margin-right': '20px',
  'margin-top': '20px'
}

const layout3 = {
  'display': 'inline-block',
  'vertical-align': 'top',
  'width': '80px',
  'height': '50px',
  'margin-right': '20px',
	'margin-top': '0px'
}

class Header extends Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#accueil">MaitreBib</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#accueil">Accueil</Nav.Link>
					<Nav.Link href="#restaurants">Restaurants</Nav.Link>
					<Nav.Link href="#infos">Infos</Nav.Link>
				</Nav>
				<Col>
					<Row xs={6} md={4}>
						<Image src={maitre} thumbnail style={layout}/>
						<Image src={x} roundedCircle style={layout2}/>
						<Image src={bib} thumbnail style={layout3}/>
					</Row>
				</Col>
				<Form inline>
					<FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
					<Button variant="outline-info">Rechercher</Button>
				</Form>
			</Navbar>
		);
	}
}

export default Header;
