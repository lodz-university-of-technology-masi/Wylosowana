import React, {Component} from "react";
import PropTypes from 'prop-types'
import User from "./User";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class SelectedUsers extends Component {

    render() {
        return (
            <Card>
                <Card.Header><h3>Selected users</h3></Card.Header>
                <ListGroup variant="flush">
                    {this.props.users.filter(function (x) {
                        return x.selected;
                    }).map((user) => (
                        <ListGroup.Item>
                            <div className="selected-user-display"><User selectUsers={this.props.selectUsers} key={user.id} user={user}/></div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        );
    }
}

User.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default SelectedUsers;

