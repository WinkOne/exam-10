import React, {Component} from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {createPost} from "../store/action";
import {connect} from "react-redux";

class NewNews extends Component {
    state={
      title: '',
      text: '',
      image: ''
    };

    inputOnClickHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    submitHandler = async e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        await this.props.createPost(formData);
        this.props.history.push('/')
    };
    render() {
        return (
            <Container>
                <h1>Add new News</h1>
                <hr/>
                <Form onSubmit={this.submitHandler}>
                    <div style={{textAlign: 'left'}}>
                        <FormGroup>
                            <Label for="title">Title News</Label>
                            <Input required onChange={this.inputOnClickHandler} type="text" name="title" id="title" placeholder="Enter title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="text">Message News</Label>
                            <Input required onChange={this.inputOnClickHandler} type="text" name="text" id="text" placeholder="Enter message" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image</Label>
                            <Input onChange={this.fileChangeHandler} type="file" name="image" id="image"/>
                        </FormGroup>
                        <Button outline color="primary">Add News</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
};
export default connect(null, mapDispatchToProps)(NewNews);