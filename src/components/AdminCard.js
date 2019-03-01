import React from 'react';
import { Card } from './Card';
class AdminCard extends React.Component {

	addAnswer = (event) => {
		this.props.addAnswer(event);
	}
	// TODO
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
		const { answers, questionId, invalid } = this.props;
		const answerFields = answers.map((value, index) => {
				return (
					<div key={index} className="answerContainer">
						<label htmlFor={index}>Answer {index + 1}: </label>
						<input type="text" data-answer-id={index} data-question-id={questionId} value={answers[index]} onChange={this.handleChange} />
					</div>
				)
		})
		return (
			<Card key={this.props.index} {...this.props} className="adminCard">
				<form data-question-id={questionId} onSubmit={this.handleSubmit} >
					<label className="questionLabel">Question:
						<textarea  data-question-id={questionId} value={this.props.question} onChange={this.handleChange}/>
					</label>
					<div className="answers-container">
						{answerFields}
					</div>
					<button data-question-id={questionId} onClick={this.addAnswer}>+</button>
					<input data-question-id={questionId} type="submit" value="Submit" />
				</form>
				{ invalid &&
					<div className="invalidSubmit">A {invalid} field is blank, please complete before submitting</div>
				}
			</Card>
		);
	}
	
}

export default AdminCard;