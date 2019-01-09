import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';

import AddNews from '../addNews';
import Classification from '../classification';

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
    path: "/shoelaces",
    main: () => <h2>Shoelaces</h2>
  }
];
export default routes;