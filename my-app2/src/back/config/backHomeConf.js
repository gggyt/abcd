import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';

import AddNews from '../addNews';
import Classification from '../classification';
import Announcement from '../announcement';
import ShowAnnounce from '../manageAnnouncement';
import ShowNews from '../manageNews';
import ManageUser from '../manageUser';
import AddCompetition from '../competition/addCompetition';
import ShowCompetition from '../competition/manageCompetition';
import PersonCompetition from '../competition/personCompetition';
import Album from '../album';
import UpdateCompetition from '../competition/updateCompetition';

const routes = [
  {
    path: "/addNews",
    exact: true,
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
  }
];
export default routes;