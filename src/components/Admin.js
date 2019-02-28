import React from 'react';
import EntryCard from './EntryCard';

class Admin extends React.Component {
	handleChange = (event) => {
		this.props.handleChange(event);
	}

	handleSubmit = (event) => {
		this.props.handleSubmit(event);
	}

	addQuestion = (event) => {
		this.props.addQuestion(event);
	}

	addAnswer = (event) => {
		this.props.addAnswer(event);
	}
	render () {
		const { questions } = this.props;
		const adminQuestions = questions.map((value, index) => {
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
				{adminQuestions}
				<button onClick={this.addQuestion}>Add Question</button>
			</div>
		);
	}
	
}

export default Admin;