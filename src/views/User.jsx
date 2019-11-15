/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import UserCard from 'components/Card/UserCard.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import { PUBLIC_URL, API_PREFIX } from '../config';
import Axios from 'axios';
// import moment from "moment";
import {connect} from 'react-redux'
import {set_user_to_track} from '../redux/actions'

// import avatar from "assets/img/default-avatar.png";
import UserPanel from './UserPanel';

class UserPage extends Component {
	state = {
		profileDetails: {},
		businesses: [],
	};

	componentDidMount() {
		this.getUserDetails();
	}

	getUserDetails() {
		const { user_id } = this.props.match.params;
		const URL = PUBLIC_URL + API_PREFIX + `admin/user/${user_id}`;
		Axios.get(URL).then(r => {
			const userDetails = r.data;
			this.props.set_user_to_track(userDetails)
		});
	}
	
	render() {
		const { name, mobile, country_code } = this.props.userDetails.user;
		const { smsCounts, usersCounts, appsCounts } = this.props.userDetails.profileDetails;
		let businessNames = [];
		this.state.businesses.map(b => businessNames.push(b.name));
		return (
			<div className="main-content">
				<Grid fluid>
					<Row>
						<Col md={9}>
							<UserPanel/>
						</Col>

						<Col md={3}>
							<UserCard
								bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
								avatar={'https://www.docsapp.in/website_assets/main-page/Dr.+Shubhanshu+Gupta.jpg'}
								name={name}
								userName={country_code + ' ' + mobile}
								description={
									<span style={{ textAlign: 'left' }}>
										BUSINSSES
										<span href='#' style={{ display: 'flex' }}>
											{this.state.businesses.map(bn => (
												<Button key={bn.name} bsSize="sm" fill style={{cursor:'default',margin:'2px'}}>
													{bn.name}
												</Button>
											))}
										</span>
									</span>
								}
								socials={
									<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
										<span>
											{/* <i className="fa fa-facebook-square" /> */}
											{smsCounts} <i className="fa fa-envelope" />
										</span>
										<span>
											{appsCounts} <i className="fa fa-calendar" />
										</span>
										<span>
											{usersCounts} <i className="fa fa-users" />
										</span>
									</div>
								}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	set_user_to_track:userDetails=> dispatch(set_user_to_track(userDetails))
})

const mapStateToProps = state =>({
	userDetails:state.userDetails
})

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);
