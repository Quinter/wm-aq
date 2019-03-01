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
		const { questions, submittedPoll } = this.props;
		const pollQuestions = questions.map((value, index) => {
			if (value.saved) {
				return (
					<PollCard 
						key={index}
						questionId={index}
						selectAnswer={this.selectAnswer}
						selectedAnswer={value.selectedAnswer}
						question={value.question}
						answers={value.answers}
						invalid={value.invalid}
					/>
				)
			} else {
				return false;
			}
	})
		return (
			<Page className="pollPage">
				<h2>Poll</h2>
				{ submittedPoll &&
					<div className="successSubmit">You have successfully submitted this poll.</div>
				}
				<form onSubmit={this.handleSubmit} >
					{pollQuestions}
					<input className="pollSubmit" type="submit" value="Submit" />
				</form>

			</Page>
		);
	}
}

export default Poll;