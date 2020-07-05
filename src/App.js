import React from "react";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  CardHeader,
  CardText,
  Row,
  Col,
  Container,
  Alert,
} from "reactstrap";

class App extends React.Component {
  state = {
    Countries: [],
    isLoading: true,
    errors: null,
  };

  getCountries() {
    axios
      .get(
        "http://localhost:8080/api/v1/summary"
      )
      .then((response) => {
        return response.data.Countries.map((country) => ({
          name: `${country.Country}`,
          totalConfirmed: `${country.TotalConfirmed}`,
          totalDeaths: `${country.TotalDeaths}`,
          totalRecovered: `${country.TotalRecovered}`,
          date: `${country.Date}`
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
      <React.Fragment>
        <Alert color="secondary">
          <div>
            <div>
              <Container>
                <Alert color="success">
                  <Row xs="1" sm="2" md="4">
                    {/*Regi helped me write my mapping code so it populated the cards in a grid better.*/}
                    {this.state.Countries !== "undefined" &&
                      this.state.Countries.length > 0 &&
                      this.state.Countries.map((element, key) => (
                        <Col>
                          <Alert color="primary">
                            <Card>
                              <CardHeader>
                                {element.name} at {element.date}
                              </CardHeader>
                              <CardBody>
                              <CardText>{element.totalConfirmed}</CardText>
                              <CardText>{element.totalDeaths}</CardText>
                              <CardText>{element.totalRecovered}</CardText>
                              </CardBody>
                              
                              
                            </Card>
                          </Alert>
                        </Col>
                      ))}
                  </Row>
                </Alert>
              </Container>
            </div>
          </div>
        </Alert>
      </React.Fragment>
    );
  }
}
export default App;
