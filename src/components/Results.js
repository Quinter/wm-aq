import React from 'react';
import ResultCard from './ResultCard';
import { Page } from './Page';

class Results extends React.Component {
	render() {
		const { questions, submittedPoll } = this.props;
		const questionResults = questions.map((value, index) => {
			let { question, selectedAnswer} = value;
			let answer = value.answers[selectedAnswer];
			return (
				<ResultCard 
					key={index}
					questionId={index}
					question={question}
					answer={answer}
				/>
			)
		})
		return (
			<Page className="resultsPage">
				{submittedPoll &&
					<React.Fragment>
						<h2>Results</h2>
						{questionResults}
					</React.Fragment>
				}

				{!submittedPoll &&
					<div>No Valid Poll has been submitted.  Please answer all questions at /poll</div>
				}
			</Page>
		)
	}		
}

export default Results;