import React from 'react';
import EntryCard from './EntryCard';

class Admin extends React.Component {
	state = {
		cards: [
			{ question: "", answers: [] }
		]	
	}
	handleChange = (event) => {
		if(event.target.type === "textarea") {
			let cards = [...this.state.cards];
			console.log(event.target.dataset);
			cards[event.target.dataset.questionId].question = event.target.value; 
			this.setState({ cards });
		} else {
			let cards = [...this.state.cards];
			let { questionId, answerId } = event.target.dataset;
			cards[questionId].answers[answerId] = event.target.value; 
			this.setState({ cards });			
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
	}

	addCard = () => {
		this.setState((prevState) => ({
			cards: [...prevState.cards, { question: "", answers: [] }],
		}));		
	}

	addAnswer = (event) => {
		const cards = [...this.state.cards];
		let { questionId } = event.target.dataset;
		cards[questionId].answers = cards[questionId].answers.concat(" ");
		// this is updating the entire state tree which is overkill, would want to refactor
		this.setState({ cards });
	}	
	render () {
		const { cards } = this.state;
		const questionCards = cards.map((value, index) => {
			return (
				<EntryCard 
					key={index}
					questionId={index}
					onQuestionSubmit={this.handleSubmit} 
					onQuestionChange={this.handleChange}
					addAnswer={this.addAnswer}
					question={value.question}
					answers={value.answers}/>
			)
	})
		return (
			<div className="admin-container">
				<h2>Admin</h2>
				{questionCards}
				<button onClick={this.addCard}>Add Question</button>
			</div>
		);
	}
	
}

export default Admin;