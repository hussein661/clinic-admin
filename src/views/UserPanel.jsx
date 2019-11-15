import React, { Component } from 'react';
import { Col, Nav, NavItem, Tab } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import PersonalDetails from './sub-panels/PersonalDetails';
import Calendar from './sub-panels/Calendar';
import Charts from './sub-panels/Charts';
import TableSMS from './sub-panels/TableSMS';
import Axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

class UserPanel extends Component {
	state = {
		recordsData: [],
		pages: 0,
	};

	smsHistoryClick = current => {
		Axios.post(`https://dev.montymobile.com/api/messageAnalysis/messages/user/${current}`, {
			email: this.props.email,
		}).then(r => {
			let { recordsData, current, pages, count } = r.data;
			this.setState({ recordsData, current, pages, count });
		});
	};

	onPageChange = (e, data) => {
		this.smsHistoryClick(data.activePage);
	};

	pageSubcategories = () => {
		return (
			<Tab.Container id="nav-with-icons" defaultActiveKey="statistics">
				<div>
					<div className="nav-container">
						<Nav bsStyle="tabs" bsClass="nav nav-icons">
							<NavItem eventKey="statistics">
								<i className="fa fa-bar-chart" />
								<br />
								Statistics
							</NavItem>
							<NavItem eventKey="personal-info">
								<i className="fa fa-info-circle" />
								<br /> Personal details
							</NavItem>
							{/* <NavItem eventKey="calendar">
              <i className="fa fa-calendar"></i>
              <br /> Calendar
            </NavItem> */}
							<NavItem eventKey="activity">
								<i className="fa fa-tasks"></i>
								<br /> Activity
							</NavItem>
							<NavItem eventKey="sms-history" onClick={() => this.smsHistoryClick(1)}>
								<i className="fa fa-envelope"></i>
								<br /> SMS history
							</NavItem>
						</Nav>
					</div>
					<Tab.Content>
						<Tab.Pane eventKey="personal-info">
							<Card
								title="personal-info about product"
								category="More information here"
								content={<PersonalDetails />}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey="calendar">
							<Card title="calendar of product" category="Here is some text" content={<Calendar />} />
						</Tab.Pane>
						<Tab.Pane eventKey="statistics">
							<Card title="statistics items" category="More information here" content={<Charts />} />
						</Tab.Pane>
						<Tab.Pane eventKey="sms-history">
							<Card
								title="SMS History"
								category="More information here"
								content={
									<TableSMS
										recordsData={this.state.recordsData}
										totalPages={this.state.pages}
										onPageChange={this.onPageChange}
									/>
								}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey="activity">
							<Card
								title="activityss center"
								category="More information here"
								content={
									<div>
										<div>
											<h2>Activity Feed</h2>
											<div className="activity-feed">
												{this.props.userActivity.map(al => (
													<div key={al.id} className="feed-item">
														<div className="date">{moment(al.created_at).format('LL')}</div>
														<div className="text">
														<b>{this.props.name}</b> has been <span  style={{color:al.activity === 'logged in' ? 'green' : 'red'}}> {al.activity} </span> at {moment(al.created_at).format("hh:mm a")}
															{/* <a href="single-need.php">“Volunteer opportunity”</a> */}
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								}
							/>
						</Tab.Pane>
					</Tab.Content>
					<div></div>
				</div>
			</Tab.Container>
		);
	};

	render() {
		return <Col>{this.pageSubcategories()}</Col>;
	}
}

const mapStateToProps = state => ({
  email: state.userDetails.user.email,
	name: state.userDetails.user.name,
  
	userActivity: state.userDetails.userActivity,
});
export default connect(mapStateToProps)(UserPanel);
