import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';

import AddNews from '../addNews';
import Classification from '../classification';
import Announcement from '../announcement';

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
  }
];
export default routes;