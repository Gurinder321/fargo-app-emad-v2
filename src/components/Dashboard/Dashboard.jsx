import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../Layout/Layout';

import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

const Dashboard = () => {
  return (
    <Layout>
      <Sidebar />
      <Header />
      <Outlet />
    </Layout>
  );
};

export default Dashboard;
