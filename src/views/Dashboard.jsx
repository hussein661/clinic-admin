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
import { Grid, Col, Row } from "react-bootstrap";
// react component used to create charts
import ChartistGraph from "react-chartist";
import Tasks from "components/Tasks/Tasks.jsx";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";

import Card from "components/Card/Card.jsx";
import StatsCard from "components/Card/StatsCard.jsx";
import { API_PREFIX, PUBLIC_URL } from "../config";
import Axios from "axios";

import {
  dataPie,
  dataSales,
  optionsSales,
  responsiveSales,
  dataBar,
  optionsBar,
  responsiveBar,
  // table_data,
  getFlag
} from "variables/Variables.jsx";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

class Dashboard extends Component {
  state = {
    usersCount: 0,
    table_data:[],
    allSmsCounts:0
  };

  componentDidMount() {
    this.getUsersCount();
    this.getCountriesStats()
    this.getSmsCount()
  }

  getUsersCount() {
    const URL = PUBLIC_URL + API_PREFIX + "admin/users/usersCount";
    Axios.get(URL).then(r => {
      if (r.data) {
        this.setState({ usersCount: r.data.users.total });
      }
    });
  }

  getSmsCount(){
   const URL =  'https://dev.montymobile.com/api/messageAnalysis'
   Axios.get(URL).then(r=>{
     const users = r.data
     let arr = []
     for(var i = 0;i<=users.length -1;i++){
       arr.push(users[i].count)
     }
     let allSmsCounts = arr.reduce((a,b)=>(a+b))
     this.setState({allSmsCounts})
   })
  }

  getCountriesStats(){
    const URL = PUBLIC_URL + API_PREFIX + "admin/statsByCountries";
    Axios.get(URL).then(r => {
      if (r.data) {
        this.setState({ table_data: r.data.countries });
      }
    });
  }



  createTableData() {
    var tableRows = [];
    let table_data = this.state.table_data
    for (var i = 0; i < table_data.length; i++) {
      tableRows.push(
        <tr key={i}>
          <td>
            <div className="flag">
              <img src={getFlag(table_data[i].country.code)} alt="us_flag" />
            </div>
          </td>
          <td>{table_data[i].country.name}</td>
          <td className="text-right">{table_data[i].count}</td>
          <td className="text-right">{table_data[i].percentage}%</td>
        </tr>
      );
    }
    return tableRows;
  }
  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="Users"
                statsValue={this.state.usersCount}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-mail text-danger" />}
                statsText="SMS"
                statsValue={this.state.allSmsCounts}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Global Sales by Top Locations"
                category="All products that were shipped"
                content={
                  <Row>
                    <Col md={5}>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>{this.createTableData()}</tbody>
                        </table>
                      </div>
                    </Col>
                    <Col md={6} mdOffset={1}>
                      <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          width: "100%",
                          height: "280px"
                        }}
                        containerClassName="map"
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                          }
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial"
                            }
                          ]
                        }}
                      />
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card
                title="Email Statistics"
                category="Last Campaign Performance"
                content={<ChartistGraph data={dataPie} type="Pie" />}
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Open
                    <i className="fa fa-circle text-danger" /> Bounce
                    <i className="fa fa-circle text-warning" /> Unsubscribe
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-clock-o" /> Campaign sent 2 days ago
                  </div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                title="Users Behavior"
                category="24 Hours performance"
                content={
                  <ChartistGraph
                    data={dataSales}
                    type="Line"
                    options={optionsSales}
                    responsiveOptions={responsiveSales}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Open
                    <i className="fa fa-circle text-danger" /> Click
                    <i className="fa fa-circle text-warning" /> Click Second
                    Time
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                title="2014 Sales"
                category="All products including Taxes"
                content={
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Tesla Model S
                    <i className="fa fa-circle text-danger" /> BMW 5 Series
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-check" /> Data information certified
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                content={
                  <table className="table">
                    <Tasks />
                  </table>
                }
                stats={
                  <div>
                    <i className="fa fa-history" /> Updated 3 minutes ago
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

export default Dashboard;
