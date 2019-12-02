import React, {Component} from 'react';
import User from "./User";
import PropTypes from 'prop-types'


function searchingFor(term) {
    return function (x) {
        return x.userName.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class SelectUsers extends Component{
    state = {
        textToSearch: ''
    };

    searchHandler = (e) => {
        this.setState({textToSearch: e.target.value })
    };

    render() {
        return(
            <div>
                <h1>Select users</h1>
                <form>
                    {'Search: '} <input type={"text"} onChange={this.searchHandler} placeholder={"Put text to search"}/>
                </form>
               { this.props.users.filter(searchingFor(this.state.textToSearch)).map((user) => (
                    <User selectUsers={this.props.selectUsers} key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

SelectUsers.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};


export default SelectUsers;
