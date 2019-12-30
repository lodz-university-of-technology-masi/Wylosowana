import React, {Component} from 'react';
import Button from "react-bootstrap/Button";

class Import extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Import test</h1>
                <Button variant="primary" size="lg">
                    Import
                </Button>
            </React.Fragment>
        )
    }
}

export default Import;