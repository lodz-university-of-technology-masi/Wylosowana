import React, {Component} from 'react';
import User from "./User";
import PropTypes from 'prop-types'
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";


function searchingFor(term) {
    return function (x) {
        return x.userName.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class SelectUsers extends Component {
    state = {
        textToSearch: ''
    };

    searchHandler = (e) => {
        this.setState({textToSearch: e.target.value})
    };

    render() {
        return (
            <React.Fragment>
                <h3>Select users</h3>
                <Form.Group controlId="controlInputName">
                    <Form.Label column={2}>Search user</Form.Label>
                    <Form.Control id="search-user-to-assign" type="text" placeholder="Put text to search" onChange={this.searchHandler}/>
                </Form.Group>
                <Table size="sm">
                    <tbody>
                    {this.props.users.filter(searchingFor(this.state.textToSearch)).filter((x) => {return !x.selected}) .map((user) => (
                        <tr>    <User selectUsers={this.props.selectUsers} key={user.id} user={user}/> </tr>
                    ))}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

SelectUsers.propTypes = {
    selectUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};


export default SelectUsers;
