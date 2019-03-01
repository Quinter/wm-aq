import React from 'react';
import { Card } from './Card';

const ResultCard = (props) => {
	return (
		<Card className="resultCard">
			<div className="questionLabel">{props.question}</div>
			<div className="answerContainer">{props.answer}</div>
		</Card>
	)
};

export default ResultCard;