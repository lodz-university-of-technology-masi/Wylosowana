import React, {Component} from "react";
import Button from "react-bootstrap/Button";


class Test extends Component {

    toggleTestPL = () => {
        const test = { ...this.props.test, choosen: 'PL'}
        this.props.isOpen(test)
    }

    toggleTestEN = () => {
        const test = { ...this.props.test, choosen: 'EN'}
        this.props.isOpen(test)
    }

    toggleNewTestPL = () => {
        const test = { ...this.props.test, choosen: 'EN'}
        this.props.isOpenNewTest(test)
    }

    toggleNewTestEN = () => {
        const test = { ...this.props.test, choosen: 'PL'}
        this.props.isOpenNewTest(test)
    }

    cs = (tst, lang) =>{
        return tst.langs.filter(x => x.lang === lang).length > 0
    }


    render() {
        return (
            <React.Fragment>
                <tr>
                <th>
                    {this.props.test.testName}
                </th>
                <th>
                    {this.cs(this.props.test, 'PL') ?
                        <div className="float-right">
                            <Button id="PLbutton"
                                    variant="success"
                                    onClick={this.toggleTestPL}
                                    size="sm"> view test</Button>
                        </div> :
                        <div className="float-right">
                            <Button id="PLbuttonEmpty"
                                    variant="danger"
                                    onClick={this.toggleNewTestPL}
                                    size="sm">need translate</Button>
                        </div> }
                </th>
                <th>
                    {this.cs(this.props.test, 'EN') ?
                        <div className="float-right">
                            <Button id="ENGbutton"
                                    variant="success"
                                    onClick={this.toggleTestEN}
                                    size="sm">view test</Button>
                        </div> :
                        <div className="float-right">
                            <Button id="ENGbuttonEmpty"
                                    variant="danger"
                                    onClick={this.toggleNewTestEN}
                                    size="sm">need translate</Button>
                        </div> }
                </th>
                </tr>
            </React.Fragment>
        );
    }
}


export default Test;


