import React from "react";
import axios from "axios"
import { Toast, ToastBody, ToastHeader, Alert } from "reactstrap";

class App extends React.Component {
  state = {
    Countries: [],
    isLoading: true,
    errors: null,
  };

  getCountries() {
    axios
      .post("http://localhost:8080/api/v1/comparison", {
        countryCodes: ["BR", "US", "CA"],
        compareBy: "TotalRecovered",
      })
      .then((response) => {
        return response.data.Countries.map((country) => ({
          name: `${country.Country}`,
          totalConfirmed: `${country.TotalConfirmed}`,
          totalDeaths: `${country.TotalDeaths}`,
          totalRecovered: `${country.TotalRecovered}`,
          date: `${country.Date}`,
        }));
      })
      .then((Countries) => {
        this.setState({
          Countries,
          isLoading: false,
        });
        console.log(this.state.Countries);
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getCountries();
  }

  render() {
    return (
      <Toast>
        <div>
          {this.state.Countries !== "undefined" &&
            this.state.Countries.length > 0 &&
            this.state.Countries.map((element, key) => (
              <div className="p-3 bg-white my-2 rounded">
                <ToastHeader>{element.name}</ToastHeader>

                <ToastBody>
                  <div>Total Confirmed: {element.totalConfirmed}</div>
                  <div>Total Deaths: {element.totalDeaths}</div>
                  Total Recovered: {element.totalRecovered}
                </ToastBody>
              </div>
            ))}
        </div>
      </Toast>
    );
  }
}
export default App;
