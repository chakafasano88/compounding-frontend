import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row, ListGroup, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card';
import Loader from './Loader';
import Router from 'next/router';
import CURRENT_USER_QUERY from './User';
import { toast } from 'react-toastify';
import Error from './ErrorMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let ReactQuill = null

const CREATE_POST_MUTATION = gql`
    mutation CREATE_POST_MUTATION($description: String!, $title: String!, $types: String!) {
        createPost(description: $description, title: $title, types: $types) {
            id
            description,
            title,
            types
        }
    }
`;

class CreatePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editor: false,
            editorContent: null,
            toolBarOptions: {
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image', 'video'],
                    ['clean']
                ]
            },
            description: null,
            title: null,
            types: 'THINKING',
            typeOptions: [{
                id: 'THINKING',
                name: 'Thinking'
            }, {
                id: 'BUSINESS',
                name: 'Business'
            }, {
                id: 'SCIENCE',
                name: 'Science'
            }, {
                id: 'INVESTING',
                name: 'Investing'
            }],
            formSubmitted: false
        }
    }

    componentDidMount() {
        ReactQuill = require('react-quill');

        if (ReactQuill) {
            this.setState({ editor: true })
        }
    }

    _handleEditorChange = (value) => {
        this.setState({ description: value })
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    _handleError = (error) => {
        this.setState({ formProcessing: false })
        return (<Error error={error} />);
    }

    render() {
        const { toolBarOptions, editor, description, title, typeOptions, types, formSubmitted, formProcessing } = this.state

        return (
            <div>
                <Mutation
                    mutation={CREATE_POST_MUTATION}
                    variables={{ description, title, types }}
                >
                    {(createPost, { loading, data, error }) => (
                        <Form name="editorForm" method="post" onSubmit={async e => {
                            e.preventDefault();
                            this.setState({ formSubmitted: true, formProcessing: true })

                            const res = await createPost();
                            toast.success('Post created!')

                            const path = res.data.createPost.types[0].toLowerCase();
                            Router.push({ pathname: `/${path}` });
                        }}
                        >
                            {formProcessing && error && this._handleError(error)}
                            {loading && <Loader />}
                            <Row className="no-gutter">
                                <Col sm={3}>
                                    <CompCard>
                                        <CardHeader>Options</CardHeader>
                                        <ListGroup>
                                            <ListGroupItem>Creativity</ListGroupItem>
                                            <ListGroupItem>System Thinking</ListGroupItem>
                                            <ListGroupItem>Mental Modes</ListGroupItem>
                                            <ListGroupItem>Complexity</ListGroupItem>
                                        </ListGroup>
                                    </CompCard>

                                </Col>
                                <Col sm={9}>
                                    <CompCard className="editor">
                                        <CardHeader>Think</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Label>Title</Label>
                                                        <Input
                                                            invalid={formSubmitted && !title}
                                                            type="text"
                                                            name="title"
                                                            placeholder="Enter title..."
                                                            onChange={this._saveToState}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Label>Article Type</Label>
                                                        <select className="form-control" name="types" onChange={this._saveToState}>
                                                            {typeOptions.map((type, i) => (
                                                                <option key={i} value={type.id}>{type.name}</option>
                                                            ))}
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            {editor && (
                                                <>
                                                <Label>Description</Label>
                                                <ReactQuill
                                                    className={formSubmitted && !description ? "is-invalid" : ''}
                                                    theme="snow"
                                                    onChange={this._handleEditorChange}
                                                    modules={toolBarOptions}
                                                />
                                                </>
                                            )}
                                            <div className="d-flex justify-content-end mt-3">
                                                <Button type="submit" color="primary">
                                                    {loading && formSubmitted && 
                                                    (<FontAwesomeIcon spin color="white" icon="cog"></FontAwesomeIcon>)} Submit
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </CompCard>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default CreatePost;
