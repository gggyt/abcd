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
import MobileHome from './mobile/homeIndex';
import Head from './mobile/home';
import AllInvitationView from './mobile/invitation/showInvitation';
import AddInvitationView from './mobile/invitation/addInvitation';
import AllMyInvitationView from './mobile/invitation/myInvitation';
import ManageMyInvitation from './mobile/invitation/manageMyInvitation';
import AllMyComment from './mobile/invitation/myComment';
import MobileInvitationDetail from './mobile/invitation/invitationDetail';
import ManageAlbum from './mobile/album/manageAlbum';
import MobilePhoto from './mobile/album/managePhoto';
import MyMobilePhoto from './mobile/album/myPhoto';
import MobileLogin from './mobile/mobilelogin';
import MobileFirst from './mobile/index';
import ShowLecture from './mobile/lecture/showLecture';
import MobileLectureDetail from './mobile/lecture/lectureDetail';
import AllMyLecture from './mobile/lecture/myLecture';
import ShowFriend from './mobile/friendurl/showFriendUrl';
import UserInfo from './mobile/my/myIndex';

import SidebarExample from './tesezc';
import 'antd-mobile/dist/antd-mobile.css';
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
                    <Route path="/mobileIndex" component={MobileHome} />
                    <Route path="/mobile" component={Head} />
                    <Route path="/mobile/invitation" component={AllInvitationView} />
                    <Route path="/mobile/myInvitation" component={AllMyInvitationView} />
                    <Route path="/mobile/manageMyInvitation" component={ManageMyInvitation} />
                    <Route path="/mobile/myComment" component={AllMyComment} />
                    <Route path="/mobile/addInvitation" component={AddInvitationView} />
                    <Route path="/mobile/invitationDetatil/:id" component={MobileInvitationDetail} />
                    <Route path="/mobile/album" component={ManageAlbum} />
                    <Route path="/mobile/photo/:id" component={MobilePhoto} />
                    <Route path="/mobile/myPhoto" component={MyMobilePhoto} />
                    <Route path="/mobile/lecture" component={ShowLecture} />
                    <Route path="/mobile/myLecture" component={AllMyLecture} />
                    <Route path="/mobile/lectureDetail/:id" component={MobileLectureDetail} />
                    <Route path="/mobile/friendurl" component={ShowFriend} />
                    <Route path="/mobile/myIndex" component={UserInfo} />
                    <Route path="/mobilefirst" component={MobileFirst} />
                    <Route path="/mobilelogin" component={MobileLogin} />
                    

					
			</div>
            </Router>
		)
	}
}

export default App;