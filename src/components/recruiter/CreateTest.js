import React, { Component } from 'react';
import Register from "../auth/Register";

class CreateTest extends Component{
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lang: '',
            questions: [],
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    handleLanguageChange(e){
        this.setState({
            lang: e.target.value
        })
    };

    handleOpenQuestionQuestionChange = idx => evt =>{
     const newQuestions = this.state.questions.map((que,qidx) => {
         if(idx!==qidx) return que;
         return { ...que, question: evt.target.value};
        });
         this.setState({ questions: newQuestions });
    };

    handleAddOpenQuestion = () => {
        this.setState({
            questions: this.state.questions.concat([{no: 0, guestion: ""}])
        });
    };

    handleRemoveOpenQuestion = idx => () => {
        this.setState({
            questions: this.state.questions.filter((s, sidx) => idx !== sidx)
        });
    };

    createJson(){

    }

    // eslint-disable-next-line no-undef
/*    @action
    async add(data) {
        const headers = new Headers();
        headers.append('content-type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('url', options);
        const response = await fetch(request);
        const status = response.status;

        if (status === 201) {
            alert("Stworzono test");
        } else {
            alert("Nie udalo sie stworzyc testu");
        }
    }*/
/*
    handleAddCloseQuestion = () => {
        this.setState({
            questions: this.state.questions.concat([{no: 0, guestion: "",answers:[],correct:[]}])
        });
    };

    handleQuestionAnswersChange = idx => evt =>{
        const newQuestions = this.state.questions((que,qidx) => {
            if(idx!==qidx) return que;
            return { que, answers(evt.target.value)};
        });
        this.setState({ questions: newQuestions });
    };*/

    render() {
        return (
            <form>
                <div>
                    <label>Name</label>
                    <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                </div>
                <div>
                    <select id="lang" value={this.state.language} onChange={this.handleLanguageChange} >
                        <option value="select">Select a language</option>
                        <option value="EN">English</option>
                        <option value="PL">Polish</option>
                    </select>
                </div>
                <h4>Questions</h4>
                {this.state.questions.map((que, idx) => (
                    <div>
                        <input
                            type="text"
                            placeholder={'Write question'}
                            value={que.question}
                            onChange={this.handleOpenQuestionQuestionChange(idx)}
                        />
                        <button
                            type="button"
                            onClick={this.handleRemoveOpenQuestion(idx)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={this.handleAddOpenQuestion}
                    className="small"
                >
                    Add Open Question
                </button>
            </form>
        )
    }
}

export default CreateTest;