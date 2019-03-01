import React from 'react';
import PollCard from './PollCard';
import { Page } from './Page';

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
			<Page className="pollPage">
				<h2>Poll</h2>
				<form onSubmit={this.handleSubmit} >
					{pollQuestions}
					<input className="pollSubmit" type="submit" value="Submit" />
				</form>
			</Page>
		);
	}
}

export default Poll;