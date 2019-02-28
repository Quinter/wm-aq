import React from 'react';

const ResultCard = (props) => {
	return (
		<div className="resultCard">
			<div>{props.question}</div>
			<div>{props.answer}</div>
		</div>
	)
};

export default ResultCard;