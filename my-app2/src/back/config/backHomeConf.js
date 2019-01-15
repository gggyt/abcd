import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';

import AddNews from '../addNews';
import Classification from '../classification';
import Announcement from '../announcement';
import ShowAnnounce from '../manageAnnouncement';

const routes = [
  {
    path: "/addNews",
    exact: true,
    main: () => <AddNews />
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
  }
];
export default routes;