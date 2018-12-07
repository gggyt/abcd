import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch} from 'react-router-dom';
import Login from './Login';
import Register from './register';
import Home from './home';
import HomeIndex from './homeIndex';
import TestHomp from './tmpHome';
import Test from './new';

class App extends React.Component {
	render() {
		return (
			<Router >
				<div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
					<Route path='/home' component={Home} />
                    <Route path="/test" component={Test} />
                    <Route path="/home/index" component={HomeIndex} />
                    <Route path="/tt" component={TestHomp} />
				</div>
            </Router>
		)
	}
}

export default App;