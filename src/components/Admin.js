import React from 'react';
import AdminCard from './AdminCard';
import { Page } from './Page';

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
				<AdminCard 
					key={index}
					questionId={index}
					onQuestionSubmit={this.handleSubmit} 
					onQuestionChange={this.handleChange}
					addAnswer={this.addAnswer}
					question={value.question}
					answers={value.answers}
					invalid={value.invalid}
					/>
			)
	})
		return (
			<Page className="adminPage">
				<h2>Admin</h2>
				{adminQuestions}
				<button className="addQuestion card" onClick={this.addQuestion}>Add Question</button>
			</Page>
		);
	}
	
}

export default Admin;