import React, {Component} from "react";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";

class User extends Component {
    getUserStyle = () => {
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            background: this.props.user.selected ?
                '#00ff00' : 'none'
        }
    };

    getButtonStyle = () => {
        return this.props.user.selected ?
            'danger' : 'success'
    }

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
                        'Unselect User' : 'Select User'}</Button>
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

