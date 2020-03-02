import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import data from '../ListMaitreBib.json';

let count = 1;

class Restaurant extends Component {
	render() {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Nom</th>
						<th>Adresse</th>
						<th>Telephone</th>
						<th>Prix</th>
						<th>Type</th>
						<th>Experience</th>
					</tr>
				</thead>
				{data.map(restaurant => (
					<tbody>
						<tr>
							<td>{count++}</td>
							<td>{restaurant.nom}</td>
							<td>{restaurant.adresse}</td>
							<td style={{'width': 160}}>{restaurant.telephone}</td>
							<td style={{'width': 110}}>{restaurant.prix}</td>
							<td>{restaurant.type}</td>
							<td>{restaurant.experience}</td>
						</tr>
					</tbody>
				))}
			</Table>
		);
	}
}

export default Restaurant;
