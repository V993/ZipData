import { Component } from "react";
import axios from "axios";


class ZipSearchAPI extends Component {
  constructor (props) {
    super(props);
    this.state = {
      apiData: [],
      found: false,
      zipcode: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      population: "",
      wages: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleSearchClick = async () => {
    let zipcode = this.state.zipcode;
    let linkToAPI = "https://ctp-zip-api.herokuapp.com/zip/" + zipcode;

    try {
      let response = await axios.get(linkToAPI);
      this.setState({ apiData: response.data, found: true });
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data); //Not Found
        console.log(error.response.status); //404
        this.setState({ found: false });
      }
    }
  };

  makeTable = () => {
    let currData = this.state.apiData;
    let foundMatch = this.state.found;
    let table = [];
    console.log(currData);
    //found is false when we get 404 error
    if (!foundMatch) {
      table.push(
        <tr key={ -1 }>
          <td>No Results</td>
        </tr>
      );
      return table;
    } else {
      let zipcodeId = currData[0].recordNumber;
      let zipcode = currData[0].Zipcode;
      let city = currData[0].City;
      let state = currData[0].State;
      table.push(
        <tr key={ zipcodeId }>
          <tr>
            <td>Zipcode: { zipcode }</td>
          </tr>
          <tr>
            <td>City: { city }</td>
          </tr>
          <tr>
            <td>State: { state }</td>
          </tr>
        </tr>
      );
      return table;
    }
  };

  render() {
    return (
      <div className="header">
        <div className="search">
          <h3>Search by zipcode:</h3>
          <input
            type="text"
            value={ this.state.zipcode }
            onChange={ this.handleInputChange }
            placeholder="Enter zipcode"
          />
          <button className="search-button" onClick={ this.handleSearchClick }>
            Search
          </button>
        </div>

        <br />

        <table id="data">
          <tbody>{ this.makeTable() }</tbody>
        </table>
      </div>
    );
  }
}

export default ZipSearchAPI;
