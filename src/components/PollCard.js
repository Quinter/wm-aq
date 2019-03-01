import React from 'react';
import { Card } from './Card';


class PollCard extends React.Component {

	selectAnswer = (event) => {
		this.props.selectAnswer(event);
	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onQuestionSubmit(event);
	}

	render () {
		const { answers, question, questionId, selectedAnswer } = this.props;
		
		const answerFields = answers.map((value, index) => {
			// this is why should be checking proptypes
			let isChecked = parseInt(selectedAnswer) === index;
				return (
					<div key={index} className="answerContainer">
						<input type="radio" 
							data-answer-id={index} 
							data-question-id={questionId} 
							value={answers[index]} 
							checked={isChecked}
							onChange={this.selectAnswer} 
						/>
						<label htmlFor={index}>{index + 1}. {answers[index]}</label>
					</div>
				)
		})
		return (
			<Card key={this.props.index} {...this.props} className="pollCard">
				<div className="questionLabel">{question}</div>
				<div className="answers-container">
					{answerFields}
				</div>
			</Card>
		);
	}
	
}

export default PollCard;