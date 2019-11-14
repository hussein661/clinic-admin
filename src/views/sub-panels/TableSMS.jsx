import React, { Component } from "react";
import { Table, Col, Row, Grid } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import moment from "moment";
import { Icon, Pagination } from 'semantic-ui-react'

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
                      {this.props.recordsData.map((rd,key)=><tr key={key}>
                        <td>{rd.destinationAddress}</td>
                        <td>{rd.message}</td>
                        <td>{moment(rd.DateSent).format('LLLL')}</td>

                      </tr>)}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
        <Pagination
    defaultActivePage={1}
    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
    prevItem={{ content: <Icon name='angle left' />, icon: true }}
    nextItem={{ content: <Icon name='angle right' />, icon: true }}
    totalPages={this.props.totalPages}
    onPageChange={this.props.onPageChange}
    />
      </div>
    );
  }
}

export default TableSMS;
