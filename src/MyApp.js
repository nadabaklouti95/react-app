import React from "react";
//import data from "./data.json";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import "./App.css";
import axios from "axios";

class MyApp extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedItems: [],
      data: []
    };
  }

  handleSelect = (value) => {
    let tab = this.state.selectedItems;
    let item = JSON.parse(value);

    let index = tab.findIndex((element) => element.id === item.id);
    if (index > -1) {
      tab.splice(index, 1);
    } else {
      tab.push(item);
    }

    this.setState({
      selectedItems: tab,
    });
  };


  sendData = () => {
    axios.post('http://localhost:3001/filters', this.state.selectedItems)
    .then(response => console.log(response.data))
    .catch(error => console.error(error))

  };

  componentDidMount() {
    axios.get('http://localhost:3001/data').then(
            res =>{
                this.setState({
                    data:res.data
                })
            }
        )
  }


  render() {
    return (
      <div>
        <form>
          {this.state.data.map((filter) => (
            <div className="content">
              <Dropdown
                className="d-inline mx-2"
                autoClose="outside"
                onSelect={this.handleSelect}
              >
                <Dropdown.Toggle id="dropdown-autoclose-outside">
                  {filter.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {filter.values.map((val) => (
                    <Dropdown.Item
                      eventKey={JSON.stringify(val)}
                      className={
                        this.state.selectedItems.some((s) => s.id === val.id)
                          ? "active"
                          : ""
                      }
                    >
                      {val.value}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}

          <Button className="sendBtn" variant="success" onClick={this.sendData}>
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default MyApp;
