import React, { Component } from "react";
import { Col, Nav, NavItem, Tab } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import PersonalDetails from "./sub-panels/PersonalDetails";
import Calendar from "./sub-panels/Calendar";
import Charts from "./sub-panels/Charts";
import TableSMS from "./sub-panels/TableSMS";
import Axios from 'axios'

class UserPanel extends Component {

  state = {
    recordsData:[],
    pages:0
  }

  smsHistoryClick = current =>{
    Axios.post(`https://dev.montymobile.com/api/messageAnalysis/messages/user/${current}`, {
    email:this.props.email
      
    })
    .then(r => {
        let {recordsData,current,pages,count} = r.data
      this.setState({recordsData,current,pages,count})
  })
  }

  onPageChange= (e,data) =>{
    this.smsHistoryClick(data.activePage)
  }

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
            <NavItem eventKey="sms-history" onClick={()=>this.smsHistoryClick(1)}>
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
            <Card
              title="calendar of product"
              category="Here is some text"
              content={<Calendar businesses={this.props.businesses}/>}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="statistics">
            <Card
              title="statistics items"
              category="More information here"
              content={<Charts email={this.props.email }/>}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="sms-history" >
            <Card
            
              title="SMS History"
              category="More information here"
              content={<TableSMS recordsData={this.state.recordsData} totalPages={this.state.pages} onPageChange={this.onPageChange}

              />}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="activity">
            <Card
              title="activity center"
              category="More information here"
              content={
                <div>
                  <p>
                    From the seamless transition of glass and metal to the
                    streamlined profile, every detail was carefully considered
                    to enhance your experience. So while its display is larger,
                    the phone feels just right.
                  </p>
                  <p>
                    Another Text. The first thing you notice when you hold the
                    phone is how great it feels in your hand. The cover glass
                    curves down around the sides to meet the anodized aluminum
                    enclosure in a remarkable, simplified design.
                  </p>
                </div>
              }
            />
          </Tab.Pane>
        </Tab.Content>
<div>


    </div>


      </div>
    </Tab.Container>
  )};

  render() {
    return <Col>{this.pageSubcategories()}</Col>;
  }
}

export default UserPanel;
