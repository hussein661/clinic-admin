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
// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";
import { PUBLIC_URL, API_PREFIX } from "../../config";
import {withRouter} from 'react-router-dom'
import Card from "components/Card/Card.jsx";

// import { events } from "variables/Variables.jsx";
import Axios from "axios";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      alert: null,
      businesses:[]
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  selectedEvent(event) {
    alert(event.title);
  }

  getUserEvents(busiess_id) {
    const URL = PUBLIC_URL + API_PREFIX + "admin/calendar/" + busiess_id;
    Axios.get(URL).then(r => this.setState({events:r.data.events}));


  }

  componentDidMount() {
      this.getUserBusinesses()
  }

  addNewEventAlert(slotInfo) {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Input something"
          onConfirm={e => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
        />
      )
    });
  }

  getUserBusinesses = () =>{
        const { user_id } = this.props.match.params;
        const URL = PUBLIC_URL + API_PREFIX + `admin/user/${user_id}`;
        Axios.get(URL).then(r => {
          const {businesses} = r.data
          this.setState({businesses})
        })
  }

  businessList = () => {
    const {businesses} = this.state
    return (
      <div>
        {businesses.map(bl => (
          <li key={bl.id} onClick={() => this.getUserEvents(bl.id)}>
            {bl.name}
          </li>
        ))}
      </div>
    );
  };

  addNewEvent(e, slotInfo) {
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    this.setState({
      alert: null,
      events: newEvents
    });
  }
  eventColors(event, start, end, isSelected) {
    var backgroundColor = "rbc-event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  render() {
    return (
      <div className="main-content">
        {this.state.alert}
        {this.businessList()}
        <Grid fluid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Card
                calendar
                content={
                  <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.events}
                    defaultView="month"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => this.selectedEvent(event)}
                    onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
                    eventPropGetter={this.eventColors}
                  />
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Calendar);
