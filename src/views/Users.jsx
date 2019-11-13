import React, { Component } from "react";
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";
import { PUBLIC_URL, API_PREFIX } from "../config";
import Card from "components/Card/Card.jsx";
import Axios from "axios";
import moment from "moment";
import Switch from "react-bootstrap-switch";

import Button from "components/CustomButton/CustomButton.jsx";
class Users extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getUsers(1);
  }

  getUsers(current) {
    const URL = PUBLIC_URL + API_PREFIX + "admin/users/" + current;
    Axios.get(URL).then(r => {
      let { results, total, pages } = r.data.users;
      this.setState({ data: results, total, pages });
    });
  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <h4 className="title"> onpoint clients</h4>
              <Card
                title="ONPOINT Clients"
                content={
                  <ReactTable
                    data={this.state.data}
                    filterable
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Email",
                        accessor: "email"
                      },
                      {
                        Header: "Mobile",
                        accessor: "mobile",
                        Cell: row => {
                          return (
                            <div>
                              <span className="class-for-name">
                                {row.original.country_code +
                                  " " +
                                  row.original.mobile}
                              </span>
                            </div>
                          );
                        },
                        Filter: ({ filter, onChange }) => (
                          <input
                            value={filter ? filter.value : ""}
                            onChange={event => onChange(event.target.value)}
                          />
                        )
                      },
                      {
                        Header: "Joined at",
                        id: "created_at",
                        accessor: "created_at",
                        Cell: props => {
                          let created_at = props.original.created_at;
                          return (
                            <p style={{ fontWeight: 400 }}>
                              {moment(created_at).format("LL")}
                            </p>
                          );
                        }
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                        Cell: props => {
                            const {active,id} = props.original
                          return (
                            <div>
                              <Button round style={{margin:'1px'}} bsStyle="primary xs" fill onClick={()=>this.props.history.push(`/admin/users/${id}`)}>
                                Explore
                              </Button>
                              {/* <Button style={{margin:'1px'}} bsStyle={`${!active ? 'danger' : 'success'}`}>
                              {`${!active ? 'Disabled' : 'Enabled'}`}
                              </Button> */}
                              <Switch onText="ON" offText="OFF" defaultValue={active} />
                            </div>
                          );
                        }
                      }
                    ]}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
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

export default Users;
