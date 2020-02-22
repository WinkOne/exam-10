import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Container, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {connect} from "react-redux";
import {deleteNews, getNews, oneNews} from "../store/action";
import moment from "moment";

class Main extends Component {
    componentDidMount() {
        this.props.getNews()
    }

    getOneNews = (id) => {
        this.props.oneNews(id);
        this.props.history.push(`/new/${id}`)
    };

    deletedHandler = (deleted) => {
      this.props.deleteNews(deleted)
    };

    render() {
        return (
            <div>
                <Container>
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: "15px"}}>
                        <h1>News</h1>
                        <NavLink tag={RouterNavLink} to={"/new"}>
                            <Button outline color="primary">
                                Add New News
                            </Button>
                        </NavLink>
                    </div>
                    <hr style={{background: "#000"}}/>
                    <main style={{display: "flex", flexWrap: 'wrap'}}>
                        {this.props.newsThis && Object.keys(this.props.newsThis).map(item => (
                            <Card key={this.props.newsThis[item].id} style={{margin: '10px', width: '31%'}}>
                                <CardImg style={{width: "200px", margin: '0 auto'}} top width="100%"
                                         src={this.props.newsThis[item].image !== "" ? 'http://localhost:8000/uploads/' + this.props.newsThis[item].image : null}/>
                                <CardBody>
                                    <CardTitle>Title: {this.props.newsThis[item].title}</CardTitle>
                                    <CardSubtitle>Date: {moment(this.props.newsThis[item].date).format('Y-M-D H:mm:ss')}</CardSubtitle>
                                </CardBody>
                                <div style={{margin: '10px'}}>
                                    <Button style={{margin: '10px'}} outline color="primary"
                                            onClick={() => this.getOneNews(this.props.newsThis[item].id)}>Read Full
                                        News</Button>
                                    <Button onClick={() => this.deletedHandler(this.props.newsThis[item].id)} style={{margin: '10px'}} outline color="danger">Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </main>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        newsThis: state.news
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNews: () => dispatch(getNews()),
        oneNews: (id) => dispatch(oneNews(id)),
        deleteNews: (deleted) => dispatch(deleteNews(deleted))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);