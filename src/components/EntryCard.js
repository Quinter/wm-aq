import React from 'react';

class EntryCard extends React.Component {

	addAnswer = (event) => {
		this.props.addAnswer(event);
	}

	removeAnswer = (event) => {

	}

	handleChange = (event) => {
		this.props.onQuestionChange(event);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onQuestionSubmit(event);
	}

	render () {
		const { answers, questionId } = this.props;
		const answerFields = answers.map((value, index) => {
				return (
					<div key={index}>
						<label htmlFor={index}>Answer {index + 1}</label>
						<input type="text" data-answer-id={index} data-question-id={questionId} value={answers[index]} onChange={this.handleChange} />
					</div>
				)
		})
		return (
			<div key={this.props.index} className="entryCard">
				<form onSubmit={this.handleSubmit} >
					<label>Question
						<textarea data-question-id={questionId} value={this.props.question} onChange={this.handleChange}/>
					</label>
					<div className="answers-container">
						{answerFields}
					</div>
					<button data-question-id={questionId} onClick={this.addAnswer}>+</button>
					<input data-question-id={questionId} type="submit" value="Submit" />
				</form>
			</div>
		);
	}
	
}

export default EntryCard;