import React, {Component} from 'react';
import SelectUsers from "./SelectUsers";
import SelectedUsers from "./SelectedUsers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import ChoiceTest from "./ChoiceTest";


class ChoiceUsers extends Component{

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <SelectUsers  selectUsers={this.props.selectUser} users={this.props.users} />
                        <Col xs lg="2"/>
                        <SelectedUsers  selectUsers={this.props.selectUser} users={this.props.users} />
                    </Row>
                </Container>
            </div>
        )
    }
}


ChoiceUsers.propTypes = {
    selectUser: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default ChoiceUsers;
