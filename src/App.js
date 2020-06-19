
import React from "react";
import axios from "axios";
import {Card, CardTitle, CardImg, CardBody, CardHeader, CardFooter, Row, Col, Container, Alert} from "reactstrap";

class App extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null
  };

  getArticles() {
    axios.get(
        "http://newsapi.org/v2/everything?q=bitcoin&from=2020-05-19&sortBy=publishedAt&apiKey=e57857dfa8cb4039ab64e8966ff62c0f"
      )
      .then(response => {
        return response.data.articles.map(article => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          site: `${article.source.name}`,
          image: `${article.urlToImage}`
        }));
      })
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
        console.log(this.state.articles);
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    
    
    return (
      <React.Fragment>
        <Alert color="secondary">
        <div>
          <h1 style={{textAlign: "center"}}>Bitcoin News</h1>
                <div>
                  <Container>
                    <Alert color="success">
                    
                  <Row xs="1" sm="2" md="4">
                  
                  {this.state.articles !== 'undefined' && this.state.articles.length > 0 &&
                  this.state.articles.map((element,  key) => (
                  <Col>
                  
                  <Alert color="primary">
                  <Card>
                  <CardHeader>{element.site} at {element.date}</CardHeader>
                    <CardBody>

                    
                    <CardTitle>{element.title}</CardTitle>
                    
                    <CardImg src = {element.image} alt=""/>
                    
                    </CardBody>
                    <CardFooter><a href={element.url}>Go to the article</a>
                    </CardFooter>
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
