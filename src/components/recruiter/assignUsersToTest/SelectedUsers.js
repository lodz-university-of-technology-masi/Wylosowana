import React, {Component} from "react";
import PropTypes from 'prop-types'
import User from "./User";
import Table from "react-bootstrap/Table";

class SelectedUsers extends Component {

    render() {
        return (
                <React.Fragment>
                    <h3>Selected users</h3>
                <Table size="sm">
                    <tbody>
                    {this.props.users.filter(function (x) {
                        return x.selected;
                    }).map((user) => (
                        <tr key={user.id}>
                                <User selectUsers={this.props.selectUsers} key={user.id} user={user}/>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </React.Fragment>
        );
    }
}

SelectedUsers.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default SelectedUsers;

