import React from "react";

export default class AnswerTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {proposition: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() { 
        return <form className="mt-4 d-flex" onSubmit={this.handleSubmit}>
            <input className="form-control"
                type="text"
                value={this.state.proposition}
                onChange={this.handleChange}/>
            <button className="btn btn-primary" type="submit">OK</button>
        </form>
    }

    handleChange(event) {
        this.setState({ proposition: event.target.value });
    }

    handleSubmit(event) {
        this.props.onAnswer(this.state.proposition);
        event.preventDefault();
    }

}