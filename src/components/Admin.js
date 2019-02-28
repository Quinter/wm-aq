import React from 'react';
import EntryCard from './EntryCard';

class Admin extends React.Component {

	render () {
		return (
			<div className="admin-container">
				<h2>Admin</h2>
				<EntryCard />
			</div>
		);
	}
	
}

export default Admin;