import React, {Component} from "react";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";

class User extends Component {
    getButtonStyle = () => {
        return this.props.user.selected ?
            'danger' : 'success'
    };

    render() {
        return (
            <React.Fragment>
                <th>
                    {this.props.user.userName}
                </th>
                <th>
                    <Button className={"float-right"} id="selectButton"
                            name="selectTest" onClick={this.props.selectUsers.bind(this, this.props.user.id)}
                            variant={this.getButtonStyle()}
                            size="sm">{this.props.user.selected ?
                        'Unselect user' : 'Select user'}</Button>
                </th>
            </React.Fragment>
        );
    }
}

User.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default User;

