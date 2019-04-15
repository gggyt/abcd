import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';

import AddNews from '../addNews';
import Classification from '../classification';
import Announcement from '../announcement';
import ShowAnnounce from '../manageAnnouncement';
import ShowNews from '../manageNews';
import BackHome from '../backIndex';
import UserDetail from '../userDetail';
import ManageUser from '../manageUser';
import AddCompetition from '../competition/addCompetition';
import ShowCompetition from '../competition/manageCompetition';
import PersonCompetition from '../competition/personCompetition';
import Album from '../album';
import UpdateCompetition from '../competition/updateCompetition';
import AddLecture from '../lecture/addLecture';
import ShowLecture from '../lecture/manageLecture';
import UpdateLecture from '../lecture/updateLecture';
import PersonLecture from '../lecture/personLecture';
import ShowFriend from '../friendurl/manageFriend';
import ShowDayDuty from '../dayduty/manageDayduty';
import ShowInvitation from '../invitation/manageInvitation';
import UpdateInvatition from '../invitation/updateInvitation';
import AddInvitationShow from '../invitation/addInvitation';
import ManageComment from '../invitation/manageComment';


const routes = [
  {
    path: "/",
    exact: true,
    main: () => <BackHome />
  }, {
    path: "/addNews",
    main: () => <AddNews />
  },
  {
    path: "/manageNews",
    main: () => <ShowNews />
  },
  {
    path: "/classify",
    main: () => <Classification />
  },
  {
    path: "/announcement",
    main: () => <Announcement />
  },
  {
    path: "/manageAnnounce",
    main: () => <ShowAnnounce />
  },
  {
    path: "/manageUser",
    main: () => <ManageUser />
  },
  {
    path: "/album",
    main: () => <Album />
  },
  {
    path: "/competition",
    main: () => <AddCompetition />

  },
  {
    path: "/manageCompetition",
    main: () => <ShowCompetition />
  },
  {
    path: "/detailCompetition/:id",
    main:  (props) => <UpdateCompetition {...props}/>
  },
  {
    path: "/personCompetition/:id",
    main:  (props) => <PersonCompetition {...props}/>
  },
  {
    path: "/addLecture",
    main:  () => <AddLecture />
  },
  {
    path: "/manageLecture",
    main:  () => <ShowLecture />
  },
  {
    path: "/updateLecture/:id",
    main:  (props) => <UpdateLecture {...props}/>
  },
  {
    path: "/personLecture/:id",
    main:  (props) => <PersonLecture {...props}/>
  },
  {
    path: "/manageFriendurl",
    main:  (props) => <ShowFriend />
  },
  {
    path: "/manageDayDuty",
    main:  (props) => <ShowDayDuty />
  },
  {
    path: "/userDetail/:id",
    main:  (props) => <UserDetail {...props}/>
  },
  {
    path: "/manageInvitation",
    main:  () => <ShowInvitation />
  },
  {
    path: "/updateInvitation/:id",
    main:  (props) => <UpdateInvatition {...props}/>
  },
  {
    path: "/addInvitation",
    main:  () => <AddInvitationShow/>
  },
  {
    path: "/manamgeComment/:id",
    main:  (props) => <ManageComment {...props}/>
  }
];
export default routes;