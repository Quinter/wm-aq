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
import Login from './components/Login';

class App extends React.Component {
	state = {
		submittedPoll: false,
		questions: [
			{ question: "Example Question?", answers: ["A", "B", "C"], selectedAnswer: null, invalid: "", saved: false }
		]	
	}
	handleAdminChange = (event) => {
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
				question.invalid = "valid";
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
				console.log('must select answer to each question');
				console.log(question);
				question.invalid = "unselected";
				this.setState({questions});
				return false;
			}
		}
		this.setState({submittedPoll: true})
		localStorage.setItem("questions", JSON.stringify(questions));
	}

	addQuestion = (event) => {
		this.setState((prevState) => ({
			questions: 
				[...prevState.questions, 
				{ question: "", answers: ["","",""], selectedAnswer: null, invalid: "", saved: false }],
		}));		
	}

	// TODO 
	removeQuestion = () => {

	}

	addAnswer = (event) => {
		const questions = [...this.state.questions];
		let { questionId } = event.target.dataset;
		questions[questionId].answers = questions[questionId].answers.concat(" ");
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
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>

				<hr />
				<Route exact path="/" component={Login} />
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
							addQuestion={this.addQuestion} 
							handleChange={this.handleAdminChange}
							handleSubmit={this.handleAdminSubmit}
							questions={this.state.questions}
						/>
					)}
				/>
				<Route exact path="/login" component={Login} />
			</div>
		</Router>
	)}
}
export default App;
