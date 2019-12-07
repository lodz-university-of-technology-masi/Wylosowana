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
                <h1>Select users</h1>
                <Form.Group controlId="controlInputName">
                    <Form.Label column={2}>Search</Form.Label>
                    <Form.Control type="text" placeholder="Put text to search" onChange={this.searchHandler}/>
                </Form.Group>
                <Table striped bordered size="sm">
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
