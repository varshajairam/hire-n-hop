import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import axios from "axios";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      vehicleId: "",
      comments: "",
      serviceSatisfaction: "",
      carSatisfaction: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log("FORM 11!");
  };

  render() {
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <Form.Group controlId="formBasicComments">
            <Form.Label>How was the service?</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter comments"
              onChange={(event) =>
                this.setState({ comments: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicServiceStar">
            <Form.Label>Service Satifaction</Form.Label>
            <Rating
              name="serviceSatisfaction"
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={this.state.serviceSatisfaction}
              onChange={(event) =>
                this.setState({ serviceSatisfaction: event })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicCarStar">
            <Form.Label>Car Satisfaction </Form.Label>
            <Rating
              name="CarSatisfaction"
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={this.state.carSatisfaction}
              onChange={(event) => this.setState({ carSatisfaction: event })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.submitHandler}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default Feedback;
