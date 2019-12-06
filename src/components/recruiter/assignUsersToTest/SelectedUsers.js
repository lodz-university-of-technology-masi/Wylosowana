import React, {Component} from "react";
import PropTypes from 'prop-types'
import User from "./User";
import Table from "react-bootstrap/Table";

class SelectedUsers extends Component {

    render() {
        return (
            <React.Fragment>
                <h1>Selected users</h1>
                <Table striped bordered size="sm">
                    <tbody>
                { this.props.users.filter(function (x) {
                    return x.selected;
                }).map((user) => (
                 <tr>   <User selectUsers={this.props.selectUsers} key={user.id} user={user}/> </tr>
                ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

User.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default SelectedUsers;

