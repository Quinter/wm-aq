import React from 'react';
import ResultCard from './ResultCard';
import { Page } from './Page';

class Results extends React.Component {
	render() {
		const { questions } = this.props;
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
				<h2>Results</h2>
				{questionResults}
			</Page>
		)
	}		
}

export default Results;