import React from 'react';

class EntryCard extends React.Component {
	state = {
		question: "",
		answers: [""]
	}
	// this.handleChange = this.handleChange.bind(this);
	// this.handleSubmit = this.handleSubmit.bind(this);
	
	handleChange = (event) => {
		if(event.target.type === "textarea") {
			this.setState({question: event.target.value });
		} else {
			let answers = [...this.state.answers];
			answers[event.target.id] = event.target.value;
			this.setState({answers});
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();

	}

	addAnswer = (event) => {
		this.setState((prevState) => ({
			answers: [...prevState.answers, ''],
		}));
	}

	removeAnswer = (event) => {

	}


	render () {
		const { answers } = this.state;
		const answerFields = answers.map((value, index) => {
				return (
					<div key={index}>
						<label htmlFor={index}>Answer {index + 1}</label>
						<input type="text" id={index} value={answers[index]} onChange={this.handleChange} />
					</div>
				)
		})
		return (
			<div className="entryCard">
				<form onSubmit={this.handleSubmit}>
					<label>Question
						<textarea value={this.state.question} onChange={this.handleChange} />
					</label>
					<div className="answers-container">
						{answerFields}
					</div>
					<button onClick={this.addAnswer}>+</button>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
	
}

export default EntryCard;