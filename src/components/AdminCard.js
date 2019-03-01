import React from 'react';
import { Card } from './Card';
class AdminCard extends React.Component {

	addAnswer = (event) => {
		event.preventDefault();
		this.props.addAnswer(event);
	}
	removeAnswer = (event) => {
		event.preventDefault();
		this.props.removeAnswer(event);
	}

	removeQuestion = (event) => {
		event.preventDefault();
		this.props.removeQuestion(event);
	}

	handleChange = (event) => {
		event.preventDefault();
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
						<input 
							type="text" 
							data-answer-id={index} 
							data-question-id={questionId} 
							value={answers[index]} 
							onChange={this.handleChange} 
						/>
						<button 
							data-question-id={questionId} 
							data-answer-id={index}
							className="removeAnswer" 
							onClick={this.removeAnswer}
						>
						x
						</button>
					</div>
				)
		})
		return (
			<Card key={this.props.index} {...this.props} className="adminCard">
				<form data-question-id={questionId} onSubmit={this.handleSubmit}  >
					<button className="removeQuestion" data-question-id={questionId} onClick={this.removeQuestion}>x</button>
					<label className="questionLabel">Question:
						<textarea  data-question-id={questionId} value={this.props.question} onChange={this.handleChange}/>
					</label>
					<div className="answersContainer">
						{answerFields}
					</div>
					<button className="addAnswer" data-question-id={questionId} onClick={this.addAnswer}>+</button>
					<input 
						className="submitQuestion"
						data-question-id={questionId}
						type="submit" 
						value="Submit" 
					/>
				</form>
				{ invalid &&
					<div className="invalidSubmit">A {invalid} field is blank, please complete before submitting</div>
				}
			</Card>
		);
	}
	
}

export default AdminCard;