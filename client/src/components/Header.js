import React, { Component } from 'react';
import img from '../images/MaitreEtBib.png';
import { Navbar, Nav, Form, FormControl, Button, Row, Col, Image } from 'react-bootstrap';

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
						<Image src={img} rounded style={{"width": "10%", "marginLeft": "300px"}}/>
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
