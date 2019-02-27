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

const App = () => (
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
			</ul>

			<hr />

			<Route exact path="/" component={App} />
			<Route path="/results" component={Results} />
			<Route path="/poll" component={Poll} />
			<Route exact path="/admin" component={Admin} />
    </div>
  </Router>
)
export default App;
