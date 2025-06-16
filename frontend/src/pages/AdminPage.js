import React, { useState } from 'react';
import LoginForm from '../components/Admin/LoginForm';
import AdminDashboard from '../components/Admin/AdminDashboard';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // For development, you might want to set isLoggedIn to true:
  // const [isLoggedIn, setIsLoggedIn] = useState(true);


  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // AdminDashboard component is expected to have className="admin-dashboard" on its root div.
  return <AdminDashboard />;
};

export default AdminPage;
