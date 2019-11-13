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
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import UserCard from "components/Card/UserCard.jsx";
// import Button from "components/CustomButton/CustomButton.jsx";
import { PUBLIC_URL, API_PREFIX } from "../config";
import Axios from "axios";
// import moment from "moment";

// import avatar from "assets/img/default-avatar.png";
import UserPanel from "./UserPanel";

class UserPage extends Component {
  state = {
    user:{},
    businesses:[
      {id:1,name:'busness n one'},{id:2,name:'busness n one'},{id:3,name:'busness n thre'},{id:4,name:'busness nfour'}
    ]
  };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails() {
    const { user_id } = this.props.match.params;
    const URL = PUBLIC_URL + API_PREFIX + `admin/user/${user_id}`;
    Axios.get(URL).then(r => {
      const {user,businesses} = r.data
      this.setState({user,businesses})
    })
  }


  render() {
    const {name,mobile,country_code} = this.state.user
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={9}>
              <UserPanel email={this.state.user.email} businesses={this.state.businesses} />
            </Col>
           
            <Col md={3}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={'https://www.docsapp.in/website_assets/main-page/Dr.+Shubhanshu+Gupta.jpg'}
                name={name}
                userName={country_code + " " + mobile}
                description={
                  <span>
                  {this.state.businesses.map(bn=>
                  <span  key={bn.id}>
                    <br/>
                    {bn.name}
                  </span>
                  )}
                  </span>
                }
                socials={
                  <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <span>
                      {/* <i className="fa fa-facebook-square" /> */}
                     265 <i className="fa fa-envelope" /> 
                    </span>
                    <span>
                      251 <i className="fa fa-calendar" /> 
                    </span>
                    <span>
                      136 <i className="fa fa-users" /> 
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

export default UserPage;
