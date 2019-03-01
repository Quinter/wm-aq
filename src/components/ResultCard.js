import React from 'react';
import { Card } from './Card';

const ResultCard = (props) => {
	return (
		<Card className="resultCard">
			<div>{props.question}</div>
			<div>{props.answer}</div>
		</Card>
	)
};

export default ResultCard;