import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch} from 'react-router-dom';
import Login from './Login';
import Register from './register';
import Home from './home';
import HomeIndex from './homeIndex';
import TestHomp from './tmpHome';
import Test from './test';
import ManageInvitation from './invitation/manageInvitation';
import InvitationDetail from './invitation/invitationDetail';
import PP from './new';
import Aside from './back/backHome';
import AddNews from './back/addNews';
import AddNewss from './back/classification';
import Announcement from './back/announcement';
import ShowAnnounce from './back/manageAnnouncement';
import userDetail from './back/userDetail';
import Album from './back/album';
import Photo from './back/managePhoto';

import SidebarExample from './tesezc';

class App extends React.Component {

	render() {
		return (
			<Router >
				<div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
				<Route  path='/home' component={Home} />
                    <Route path="/test" component={Test} />
                    <Route path="/tt" component={TestHomp} />
                    <Route path="/SidebarExample" component={SidebarExample} />
                    <Route path="/Aside" component={Aside} />
                    <Route path="/Aside/addNews" component={AddNews} />
                    <Route path="/classification" component={AddNewss} />
                    <Route path="/announcement" component={Announcement} />
                    <Route path="/ShowAnnounce" component={ShowAnnounce} />
                    <Route path="/userDetail" component={userDetail} />
                    <Route path="/Album" component={Album} />
                    <Route path="/Photo" component={Photo} />
                   

					
			</div>
            </Router>
		)
	}
}

export default App;