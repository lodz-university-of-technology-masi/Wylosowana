import React, {Component} from "react";
import PropTypes from 'prop-types'

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
        return {
            background: this.props.user.selected ?
                '#ff0000' : '#0000ff',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '50%',
            cursor: 'pointer',
            float: 'right'
        }
    }

    render() {
        return (
            <div style={this.getUserStyle()}>
                <p>
                    {this.props.user.userName}
                    <button onClick={this.props.selectUsers.bind(this,this.props.user.id)} style={this.getButtonStyle()}>
                        {this.props.user.selected ?
                            'Unselect User' : 'Select User'}
                    </button>
                </p>
            </div>
        );
    }
}

User.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default User;

