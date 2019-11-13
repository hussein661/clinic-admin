import React, { Component } from "react";
import { Table, Col, Row, Grid } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
// import Axios from 'axios'
class TableSMS extends Component {

  state = {
  }

 componentDidMount() {
   
}

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                tableFullWidth
                content={
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>to</th>
                        <th>plain text</th>
                        <th>date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.recordsData.map(rd=><tr key={rd.id}>
                        <td>{rd.destinationAddress}</td>
                        <td>{rd.message}</td>
                        <td>{rd.DateSent}</td>

                      </tr>)}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableSMS;
