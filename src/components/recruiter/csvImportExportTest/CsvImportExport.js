import React, {Component} from 'react';
import Export from "./Export";
import Import from "./Import";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class CsvImportExport extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="section auth">
                <Container>
                    <Row>
                        <Col xs={5}>
                            <Export/>
                        </Col>
                        <Col xs={2}/>
                        <Col xs={5}>
                            <Import/>

                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default CsvImportExport;