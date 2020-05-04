import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useRef, useState, Component } from "react";
import axios from "axios";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

class VehicleType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredItem: 0,
      type: [],
      show: false,
      modalData: {},
    };
    this.saveModalDetails = this.saveModalDetails.bind(this);
  }

  componentDidMount() {
    this.getVehicles();
  }
  getVehicles = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:8080/api/allvehicletype")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            this.setState({ type: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  removeItem(item) {
    const newItems = this.state.type.filter((type) => {
      return type !== item;
    });
    console.log(item.vehicleType);
    console.log("kk")
    axios
      .post("http://localhost:8080/api/deletevehicletype", item.vehicleType)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(item);
          this.setState({
            type: [...newItems],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
      });
  }

  showModal = (key) => {
    console.log("calle?1");
    let edit = [];
    const requiredItem = this.state.requiredItem;
    Object.assign(this.state.modalData, this.state.type[requiredItem]);
    //Object.assign(edit, this.state.type[key]);
    //const edit = [...this.state.type][key];
    this.setState({
      requiredItem: key,
      show: true,
      // tempType: edit,
    });
  };

  hideModal = () => {
    console.log("calle?2");
    //this.setState({ show: false, type: this.state.type });
    this.setState({ show: false });
  };

  saveModalDetails(e) {
    e.preventDefault();
    console.log("calle?3");
    console.log(e.target.value);
  }
  /*
  handleSelectPrice(type, event) {
    console.log(type);
    console.log(event.target.value);
  }

  handleSelectHours(event) {
    console.log(event.target.value);
  }
 
  handleChangeStart = () => {
    console.log("Change event started");
  };
*/
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleAddRow = () => {
    console.log("calle?4");
    this.state.modalData.priceList = [...this.state.modalData.priceList, ""];
    this.state.modalData.hourList = [...this.state.modalData.hourList, ""];
    console.log("wow");
    console.log(this.state.modalData);
    console.log("checking modal");
  };

  handleRemoveRow = (key) => {
    this.state.modalData.priceList.splice(key, 1);
    this.state.modalData.hourList.splice(key, 1);
  };

  handleChangeComplete = (x, event) => {
    var obj = this.state.type[0].priceList.reduce(function (o, val) {
      o[val] = val;
      return o;
    }, {});

    console.log(JSON.stringify(obj));
    let typeCopy = JSON.parse(JSON.stringify(this.state.type));
    console.log();
    typeCopy[x].value = this.state.type[x].priceList[
      this.state.type[x].hourList.findIndex((v) => v === event)
    ];
    this.setState({
      type: typeCopy,
    });
  };

  render() {
    const list = this.state.type.map((item, index) => (
      <Col sm="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Header as="h5">Type: {item.vehicleType}</Card.Header>

          <Card.Body>
            <Row>
              <div style={{ width: 400, margin: 5 }}>
                <p>Hours:</p>
                <Slider
                  min={0}
                  max={Math.max(...item.hourList)}
                  defaultValue={0}
                  marks={Object.assign(
                    { 0: 0 },
                    ...item.hourList.map((value) => ({
                      [value]: value,
                    }))
                  )}
                  step={null}
                  onChange={(e) => this.handleChangeComplete(index, e)}
                />
                &nbsp;
                <p>Price: {item.value}$</p>
              </div>
            </Row>

            <Card.Link href="#" onClick={(e) => this.showModal(e, index)}>
              Edit
            </Card.Link>
            <Card.Link
              href="#"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  this.removeItem(item);
              }}
            >
              Delete
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    ));

    console.log(this.state.type);
    console.log(this.state.modalData);

    return (
      <div>
        <Container>
          <Button variant="primary">Add Vehicle Type</Button>
          <Row>{list}</Row>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  type="vehicle"
                  placeholder={
                    this.state.modalData && this.state.modalData.vehicleType
                  }
                  disabled
                />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Hour</th>
                      <th>Price $</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.modalData &&
                      this.state.modalData.hourList &&
                      this.state.modalData.hourList.map((row, index) => {
                        return (
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                step="1"
                                defaultValue={row}
                                onChange={(e) =>
                                  this.handleHourChange(e, index)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={
                                  this.state.modalData &&
                                  this.state.modalData.priceList &&
                                  this.state.modalData.priceList[index]
                                }
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => this.handleRemoveRow(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={this.handleAddRow}
                >
                  Add Row
                </button>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.saveModalDetails}
              >
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default VehicleType;
