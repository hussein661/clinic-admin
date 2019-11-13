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
// react component used to create charts
import ChartistGraph from "react-chartist";

import Card from "components/Card/Card.jsx";

// import { charts } from "variables/chartsVariables.jsx";



class Charts extends Component {

    

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
                <Col md={6}>
                  <Card
                    title='SMS Usage for past week'
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
                </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Charts;


const viewsChart = {
    type: "Bar",
    data: {
      labels: [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN",
      ],
      series: [[54, 44, 32, 78, 55, 45, 32]]
    },
    options: {
      seriesBarDistance: 10,
      classNames: {
        bar: "ct-bar ct-azure"
      },
      axisX: {
        showGrid: false
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ]
  };
