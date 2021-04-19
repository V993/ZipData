import { Component } from "react";
import axios from "axios";

class SearchAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      pokemon: "",
      found: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ pokemon: event.target.value });
  };

  // handleSearchClick = () => {
  //     let pokemonName = this.state.pokemon;
  //     let linkToAPI = 'https://pokeapi.co/api/v2/pokemon/'+pokemonName;
  //     fetch(linkToAPI)
  //         .then((response) => {
  //             if(response.status === 404){
  //                 return;
  //             }
  //             return response.json();
  //         })
  //         .then((data) => { //data is response.json()
  //             this.setState({apiData: data});
  //         })
  //         .catch((error) => {
  //             console.error('Error:', error);
  //         });

  //}

  handleSearchClick = async () => {
    let pokemonName = this.state.pokemon;
    let linkToAPI = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

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
    //found is false when we get 404 error
    if (!foundMatch) {
      table.push(
        <tr key={-1}>
          <td>No Results</td>
        </tr>
      );
      return table;
    } else {
      let height = currData.height;
      let weight = currData.weight;
      table.push(
        <tr key={currData.id}>
          <td>Height: {height}</td>
          <td>Weight: {weight}</td>
        </tr>
      );
      return table;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="search">
          <h3>Search Pokemon:</h3>
          <input
            type="text"
            value={this.state.pokemon}
            onChange={this.handleInputChange}
            placeholder="Enter Pokemon name"
          />
          <button className="search-button" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
        <br />
        <table id="data">
          <tbody>{this.makeTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default SearchAPI;
