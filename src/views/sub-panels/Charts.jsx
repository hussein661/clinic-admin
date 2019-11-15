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
import Loader from 'react-loader-spinner';

import { Grid, Row, Col } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// import { getLastSevenDaysSms } from '../stats';
import Card from 'components/Card/Card.jsx';
import Axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
// import { charts } from "variables/chartsVariables.jsx";

class Charts extends Component {
	state = {
		lastSevenSmsCounts: [],
		loading: true,
	};	

	componentDidMount() {
		setTimeout(() => {
			if(this.state.loading){
				this.setState({loading:false})
			}
		}, 3000);
	}
	

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.email !== this.props.email) {
			this.setLastSeven();
		}
		// this.setLastSeven()
	}

	setLastSeven = async () => {
		let today = new Date();
		let lastSevenSmsCounts = [];
		for (var i = 6; i >= 0; i--) {
			let startOfOldDay = new Date(
				moment(today)
					.subtract(i, 'days')
					.startOf('day')
			);
			let endOfOldDay = new Date(
				moment(today)
					.subtract(i, 'days')
					.endOf('day')
			);
			const URL = 'https://dev.montymobile.com/api/messageAnalysis';
		await Axios.post(URL, {
				client: this.props.email,
				startDate: startOfOldDay,
				endDate: endOfOldDay,
			})
				.then(r => lastSevenSmsCounts.push(r.data[0].quantity))
				.catch(e => lastSevenSmsCounts.push(0));
			// .then(r => this.setState({lastSevenSmsCounts:[...this.state.lastSevenSmsCounts,r.data[0].quantity]}))
			// .catch(e => this.setState({lastSevenSmsCounts:[...this.state.lastSevenSmsCounts,0]}))
		}

		this.setState({ lastSevenSmsCounts,loading:false });

	};

	loading = () => {
		if (this.state.loading) {
			return (
				<div style={{ position: 'absolute', top: '50%', right: '50%' }}>
					<Loader
						type="Oval"
						color="#00BFFF"
						height={100}
						width={100}
						//  timeout={3000} //3 secs
					/>
				</div>
			);
		}
	};

	render() {
		const viewsChart = {
			type: 'Bar',
			data: {
				labels: getLastSevenDays(),
				series: [this.state.lastSevenSmsCounts],
			},
			options: {
				seriesBarDistance: 10,
				classNames: {
					bar: 'ct-bar ct-azure',
				},
				axisX: {
					showGrid: false,
				},
			},
			responsiveOptions: [
				[
					'screen and (max-width: 640px)',
					{
						seriesBarDistance: 5,
						axisX: {
							labelInterpolationFnc: function(value) {
								return value[0];
							},
						},
					},
				],
			],
		};

		return (
			<div className="main-content">
				<Grid fluid>
					<Row>
						<Col md={6}>
							{this.loading()}
							{!this.state.loading ? (
								<Card
									title="SMS Usage for past week"
									// category='Bar Chart'
									content={
										<ChartistGraph
											data={viewsChart.data}
											type={viewsChart.type}
											options={viewsChart.options}
											responsiveOptions={viewsChart.responsiveOptions}
										/>
									}
									legend={viewsChart.legend}
								/>
							) : (
								''
							)}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { email: state.userDetails.user.email };
};

export default connect(mapStateToProps)(Charts);

var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saterday', 'sunday'];
var goBackDays = 7;
const getLastSevenDays = () => {
	var today = new Date();
	var daysSorted = [];

	for (var i = 0; i < goBackDays; i++) {
		var newDate = new Date(today.setDate(today.getDate() - 1));
		daysSorted.push(days[newDate.getDay()]);
	}

	daysSorted[daysSorted.indexOf('monday')] = 'MON';
	daysSorted[daysSorted.indexOf('tuesday')] = 'TUE';
	daysSorted[daysSorted.indexOf('wednesday')] = 'WED';
	daysSorted[daysSorted.indexOf('thursday')] = 'THU';
	daysSorted[daysSorted.indexOf('friday')] = 'FRI';
	daysSorted[daysSorted.indexOf('saterday')] = 'SAT';
	daysSorted[daysSorted.indexOf('sunday')] = 'SUN';
	daysSorted.reverse();
	return daysSorted;
};
