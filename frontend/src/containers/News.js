import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Container, Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import {deleteComments, getComments, oneNews, postsComment} from "../store/action";

class News extends Component {
    state = {
        newsId: '',
        author: '',
        coment: ''
    };
    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onClickHandler = (e) => {
        e.preventDefault();
        this.props.postsComment({newsId: this.state.newsId, author: this.state.author, coment: this.state.coment})
    };

    deletedCommentsHandler = (deletedComment) => {
        this.props.deleteComments(deletedComment)
    };

    componentDidMount() {
        this.setState({newsId: this.props.match.params.id});
        this.props.oneNews(this.props.match.params.id);
        this.props.getComments()
    }

    render() {

        return (
            <div>
                <Container>
                    {this.props.oneNewsThis && this.props.oneNewsThis.map(item => (
                        <Card key={item.id}>
                            <div>
                                {item.image !== "" ?
                                    <CardImg style={{width: "20%"}} top width="100%"
                                             src={'http://localhost:8000/uploads/' + item.image}/> : null}
                            </div>
                            <CardBody>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <CardTitle><h1>{item.title}</h1></CardTitle>
                                    <CardSubtitle>{item.date}</CardSubtitle>
                                </div>
                                <CardText>{item.text}</CardText>
                            </CardBody>
                        </Card>
                    ))}
                    <hr style={{background: "#000"}}/>
                    <div style={{textAlign: "left"}}>
                        <h2>Comments</h2>
                        <hr style={{background: "#000"}}/>
                        {/* eslint-disable-next-line array-callback-return */}
                        {this.props.commentsThis.map(comment => {
                            if (comment.news_id === +this.props.match.params.id) {
                                return (
                                    <Card key={comment.id}>
                                        <CardBody>
                                            <CardTitle><h1>{comment.author}</h1></CardTitle>
                                            <CardText>{comment.coment}</CardText>
                                        </CardBody>
                                        <Button
                                            onClick={() => this.deletedCommentsHandler(comment.id)}>Delete</Button>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                    <hr style={{background: "#000"}}/>
                    <div style={{textAlign: "left", marginBottom: '80px'}}>
                        <h2>Add Comments</h2>
                        <hr style={{background: "#000"}}/>
                        <div style={{width: '60%', margin: "0 auto"}}>
                            <Form onSubmit={this.onClickHandler}>
                                <FormGroup>
                                    <Label for="exampleEmail">Name</Label>
                                    <Input onChange={this.onChangeHandler} type="text" name="author" id="author"
                                           placeholder="Enter your name"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Comment</Label>
                                    <Input required onChange={this.onChangeHandler} type="text" name="coment"
                                           id="coment"
                                           placeholder="Enter your comment"/>
                                </FormGroup>
                                <Button outline color="primary">Add comment</Button>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        oneNewsThis: state.oneNews,
        commentsThis: state.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        oneNews: (id) => dispatch(oneNews(id)),
        postsComment: (data) => dispatch(postsComment(data)),
        getComments: () => dispatch(getComments()),
        deleteComments: (deletedComment) => dispatch(deleteComments(deletedComment))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(News);