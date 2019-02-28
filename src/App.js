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

	render() {
		return(
		<Router>
			<div>
			<ul>
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
				<Route exact path="/results" component={Results} />
				<Route exact path="/poll" component={Poll} />
				<Route exact path="/admin" component={Admin} />
				<Route exact path="/login" component={Admin} />
			</div>
		</Router>
	)}
}
export default App;
