import React, {Component} from "react";
import PropTypes from 'prop-types'
import User from "./User";

class SelectedUsers extends Component {

    render() {
        return (
            <div>
                <h1>Selected users</h1>
                { this.props.users.filter(function (x) {
                    return x.selected;
                }).map((user) => (
                    <User selectUsers={this.props.selectUsers} key={user.id} user={user}/>
                ))}
            </div>
        );
    }
}

User.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default SelectedUsers;

