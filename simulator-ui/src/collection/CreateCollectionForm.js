import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Jumbotron} from "react-bootstrap";
import SuccessNotification from "../common/SuccessNotification";
import {post} from "../common/HttpFetchConnector";
import URLPaths from "../common/URLPaths";

class CreateCollectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collectionName: '', description: '', activeNotifications: []}
    }

    handleChange(event) {
        let stateKey = event.nativeEvent.target.id;
        this.setState({[stateKey]: event.nativeEvent.target.value || ''})
    }

    handleSubmit(event) {
        event.preventDefault();
        post(URLPaths.collections.create, {
            name: this.state.collectionName,
            description: this.state.description
        }).then(function () {
            this.setState((state) => {
                let activeNotificationsCopy = [...state.activeNotifications];
                activeNotificationsCopy.push({
                    shown: true,
                    variant: "success",
                    message: "Collection " + this.state.collectionName + "created successfully!"
                });
                return {
                    activeNotifications: activeNotificationsCopy,
                    collectionName: '',
                    description: ''
                }
            });
        }.bind(this), function (error) {
            this.setState((state) => {
                let activeNotificationsCopy = [...state.activeNotifications];
                activeNotificationsCopy.push({
                    shown: true,
                    variant: "danger",
                    message: "Oops! An error occurred while creating the collection " + this.state.collectionName
                });
                return {
                    activeNotifications: activeNotificationsCopy
                }
            });
        }.bind(this));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.activeNotifications.length > 0 && this.setState({
            activeNotifications: []
        });
    }

    render() {
        let notifications = this.state.activeNotifications.map((notification, index) =>
            <SuccessNotification shown={notification.shown} message={notification.message} variant={notification.variant} key={"notif-" + index}/>);

        return (
            <Jumbotron>
                <h3>Create a new collection</h3>
                {notifications}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group controlId="collectionName">
                        <InputGroup className="mb-3 col-sm-6">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="name" aria-label="Name" value={this.state.collectionName}
                                         onChange={this.handleChange.bind(this)}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <InputGroup className="mb-3 col-sm-10">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="What this collection is about..." aria-label="Description"
                                         value={this.state.description}
                                         onChange={this.handleChange.bind(this)}/>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Jumbotron>
        )
    }
}

export default CreateCollectionForm;