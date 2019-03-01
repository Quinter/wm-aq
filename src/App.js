import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import Admin from './components/Admin';
import Results from './components/Results';
import Poll from './components/Poll';
import { Welcome } from './components/Welcome';

class App extends React.Component {
	state = {
		submittedPoll: false,
		questions: [
			{ question: "Example Question?", answers: ["A", "B", "C"], selectedAnswer: null, invalid: "", saved: false }
		]	
	}
	handleAdminChange = (event) => {
		event.preventDefault();
		if(event.target.type === "textarea") {
			let questions = [...this.state.questions];
			questions[event.target.dataset.questionId].question = event.target.value; 
			this.setState({ questions });
		} else {
			let questions = [...this.state.questions];
			let { questionId, answerId } = event.target.dataset;
			questions[questionId].answers[answerId] = event.target.value; 
			this.setState({ questions });			
		}
	}

	handleAdminSubmit = (event) => {
		console.log('admin submit')
		event.preventDefault();
		const questions = [...this.state.questions];
		let { questionId } = event.target.dataset;
		let question = questions[questionId];
		let questionText = question.question;
		let { answers } = question;
		if (/^\s+$/.test(questionText) || !questionText) {
			console.log('invalid question');
			question.invalid = "question";
			this.setState({questions});
			return false;
		}
		for (let answer of answers) {
			if (/^\s+$/.test(answer) || !answer) {
				console.log('invalid answer');
				question.invalid = "answer";
				this.setState({questions});
				return false;
			}
		}
		question.invalid = false;
		question.saved = true;
		this.setState({questions});
		localStorage.setItem("questions", JSON.stringify(questions));
	}

	handlePollSubmit = (event) => {
		event.preventDefault();
		const questions = [...this.state.questions]
		for (let question of questions) {
			let selectedAnswer = question.selectedAnswer;
			if (!selectedAnswer) {
				question.invalid = "unselected";
				this.setState({questions});
				return false;
			} else {
				question.invalid = false;
				this.setState({questions});
			}
		}
		let submittedPoll = true;
		this.setState({submittedPoll: true})
		localStorage.setItem("questions", JSON.stringify(questions));
		localStorage.setItem("submittedPoll", JSON.stringify(submittedPoll));
	}

	addQuestion = (event) => {
		this.setState((prevState) => ({
			questions: 
				[...prevState.questions, 
				{ question: "", answers: ["","",""], selectedAnswer: null, invalid: "", saved: false }],
		}));		
	}

	removeQuestion = (event) => {
		const questions = [...this.state.questions];
		let { questionId } = event.target.dataset;
		console.log(questions);
		questions.splice(questionId, 1);
		console.log(questions);
		this.setState({ questions });
	}

	addAnswer = (event) => {
		const questions = [...this.state.questions];
		let { questionId } = event.target.dataset;
		questions[questionId].answers = questions[questionId].answers.concat(" ");
		this.setState({ questions });
	}

	removeAnswer = (event) => {
		const questions = [...this.state.questions];
		let { questionId, answerId } = event.target.dataset;
		console.log(questions);
		questions[questionId].answers.splice(answerId, 1);
		console.log(questions);
		this.setState({ questions });
	}	

	selectAnswer = (event) => {
		const questions = [...this.state.questions];
		let { questionId, answerId } = event.target.dataset;
		questions[questionId].selectedAnswer = answerId;
		this.setState({ questions });
	}
	hydrateStateFromLocalStorage = () => {
		for (let key in this.state) {
			if (localStorage.hasOwnProperty(key)) {
				let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
				}
			}
		}
	}
	componentDidMount() {
		this.hydrateStateFromLocalStorage();
	}
	render() {
		return(
		<Router>
			<div >
			<ul className="appHeader">
					<li>
						<Link to="/admin">Admin</Link>
					</li>
					<li>
						<Link to="/poll">Poll</Link>
					</li>
					<li>
						<Link to="/results">Results</Link>
					</li>
				</ul>

				<hr />
				<Route exact path="/" component={Welcome} />
				<Route 
					exact 
					path="/results" 
					render={(props) => (
						<Results 
							{...props}
							questions={this.state.questions}
							submittedPoll={this.state.submittedPoll}
						/>
					)}
				/>
				<Route 
					exact 
					path="/poll" 
					render={(props) => (
						<Poll 
							{...props} 
							selectAnswer={this.selectAnswer} 
							handleSubmit={this.handlePollSubmit}
							questions={this.state.questions}
							submittedPoll={this.state.submittedPoll}
						/>
					)}
				/>
				<Route 
					exact 
					path="/admin" 
					render={(props) => (
						<Admin 
							{...props} 
							addAnswer={this.addAnswer}
							removeAnswer={this.removeAnswer}
							addQuestion={this.addQuestion} 
							removeQuestion={this.removeQuestion} 
							handleChange={this.handleAdminChange}
							handleSubmit={this.handleAdminSubmit}
							questions={this.state.questions}
						/>
					)}
				/>
			</div>
		</Router>
	)}
}
export default App;
