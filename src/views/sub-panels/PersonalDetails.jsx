import React, { Component } from 'react';

import {
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import FormInputs from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import moment from 'moment';

class PersonalDetails extends Component {

  render() {
    const {user,businesses} = this.props.userDetails
    let first = ''
    let last = ''
    if(user.name){
    first = user.name.split(" ")[0]
    last = user.name.split(" ")[1]
      
    }
        return (
              <Card
                title=""
                content={
                  <form>
                                        <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          value: first,
                          disabled:true,
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          value: last,
                          disabled:true,
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        // {
                        //   label: "Company (disabled)",
                        //   type: "text",
                        //   bsClass: "form-control",
                        //   placeholder: "Company",
                        //   defaultValue: "Creative Code Inc.",
                        //   disabled: true
                        // },
                        {
                          label: "Phone number",
                          type: "text",
                          bsClass: "form-control",
                          // placeholder: "Username",
                          defaultValue: "tania123",
                          value:user.country_code + " " +  user.mobile,
                          disabled:true,
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          value:user.email,
                          disabled:true,
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Joined at",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue:
                            moment(user.created_at).format('LL hh:mm a')
                        }
                      ]}
                    />
                    {/* <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      proprieties={[
                        {
                          label: "City",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: "City"
                        },
                        {
                          label: "Country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: "Country"
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code"
                        }
                      ]}
                    />

                    <div className="row">
                      <div className="col-md-12">
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" /> */}
                  </form>
                }
              />
        );
    }
}

export default PersonalDetails;