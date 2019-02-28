import React from 'react';
import ResultCard from './ResultCard';

class Results extends React.Component {
	render() {
		const { questions } = this.props;
		const questionResults = questions.map((value, index) => {
			console.log(value)
			let isAnswer = parseInt(value.selectedAnswer) === index;
			console.log(value.selectedAnswer)
			console.log(index);
			console.log(isAnswer);
				if (isAnswer) {
					return (
						<ResultCard 
							key={index}
							questionId={index}
							question={value.question}
							answer={value.answers[index]}
						/>
					)
				} else {
					return;
				}
			})
		return (
			<div className="resultsContainer">
				<h2>Results</h2>
				{questionResults}
			</div>
		)
	}		
}

export default Results;