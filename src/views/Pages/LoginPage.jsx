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
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'components/CustomButton/CustomButton.jsx';
// import Checkbox from 'components/CustomCheckbox/CustomCheckbox.jsx';
import firebase from '../../firebase/auth'
import {connect} from 'react-redux'
import {setAdminLoggedIn} from '../../redux/actions'

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardHidden: true,
			email: '',
      password: '',
      logging:false
		};
	}
	componentDidMount() {
		setTimeout(
			function() {
				this.setState({ cardHidden: false });
			}.bind(this),
			700
		);
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	login = e => {
    this.setState({logging:true})
    e.preventDefault();
    
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
      this.props.setAdminLoggedIn(res.user.email)
      this.props.history.push('/admin/dashboard')
    })
    .catch(e=>this.setState({logging:false,err_message:e.message}))
  }
  
	render() {
		return (
			<Grid>
				<Row>
					<Col md={4} sm={6} mdOffset={4} smOffset={3}>
						<form onSubmit={this.login}>
							<Card
								hidden={this.state.cardHidden}
								textCenter
								title="Login"
								content={
									<div>
                    
										<FormGroup>
											<ControlLabel>Email address</ControlLabel>
											<FormControl
												placeholder="Enter email"
                        // type="email"
                        value={this.state.email}
												name="email"
												onChange={this.handleChange}
											/>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Password</ControlLabel>
											<FormControl
												placeholder="Password"
                        type="password"
                        value={this.state.password}
												name="password"
												autoComplete="off"
												onChange={this.handleChange}
											/>
										</FormGroup>
										{/* <FormGroup>
											<Checkbox number="1" label="Subscribe to newsletter" />
										</FormGroup> */}
									</div>
								}
								legend={
									<Button type='submit' bsStyle="info" fill wd>
										{!this.state.logging ? 'Login' : 'logging...'}
									</Button>
								}
								ftTextCenter
							/>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setAdminLoggedIn:userDetails=> dispatch(setAdminLoggedIn(userDetails))
})

export default connect(null,mapDispatchToProps)(LoginPage);
