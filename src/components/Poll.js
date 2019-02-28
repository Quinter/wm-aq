import React from 'react';
import PollCard from './PollCard';

class Poll extends React.Component {

	selectAnswer = (event) => {
		this.props.selectAnswer(event);
	}

	handleSubmit = (event) => {
		this.props.handleSubmit(event);
	}

	render () {
		const { questions } = this.props;
		const pollQuestions = questions.map((value, index) => {
			return (
				<PollCard 
					key={index}
					questionId={index}
					selectAnswer={this.selectAnswer}
					selectedAnswer={value.selectedAnswer}
					question={value.question}
					answers={value.answers}/>
			)
	})
		return (
			<div className="pollContainer">
				<h2>Poll</h2>
				<form onSubmit={this.handleSubmit} >
					{pollQuestions}
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Poll;