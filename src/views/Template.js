import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import {
	Route,
	NavLink,
	BrowserRouter
} from "react-router-dom";


import OhlcChart from "./financial charts/OHLC Chart";
import LiveOhlcChart from "./financial charts/Live OHLC Chart"



class Template extends Component {

	render() {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
					<button className="d-lg-none toggle-sidebar"><span className="navbar-toggler-icon"></span></button>
					<Navbar.Brand href="/">Upstox assignment</Navbar.Brand>
				</Navbar>
				<BrowserRouter>
					<Row>
						<Nav to="/" className="flex-sm-column" id="sidebar">
							<ListGroup className="nav nav-sidebar flex-sm-column">

								<ListGroup.Item>
									<a href="#financialCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>FINANCIAL CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="financialCharts">
										<ListGroup.Item> <NavLink to="/live-chart">Live Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/ohlc-chart">OHLC Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>

							</ListGroup>
						</Nav>

						<Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
							<Container>
								<div className="content">
									<Route path="/ohlc-chart" component={OhlcChart} />
									<Route path="/live-chart" render={props => <LiveOhlcChart {...props} />} />
								</div>
							</Container>
						</Col>
					</Row>
				</BrowserRouter>
			</div>
		);
	}
}

export default Template;