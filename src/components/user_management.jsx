// UserManagement.js

import React, { useState, useEffect } from 'react';
import RestAPI from '../server/models/restapi';
import { useNavigate } from 'react-router-dom';
import '../styles/user_management.css'; // Update the CSS file name

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await RestAPI.getAllUsers();
      if (response) {
        setUsers(response);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = (userId) => {
    const updatedAdminUser = users.map((user) => {
      if (user.id === userId) {
        const admin = !user.is_admin;
        const numericValueAdmin = admin ? 1 : 0;
        console.log('admin', admin);
        RestAPI.updateIsAdminByUserId(user.id, numericValueAdmin);
        return { ...user, admin };
      }
      return user;
    });
    setUsers(updatedAdminUser);
  };

  return (
    <div className="user-management-container" >
      <div className="header">
        <p>שלום {user.first_last_name}</p>
      </div>
      <div className="user-table">
        <table>
          <thead>
          <tr>
            <th>שם</th>
            <th>שם משתמש</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>הרשאות מנהל?</th>
            <th>פעולות</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.is_admin ? 'V' : 'X'}</td>
              <td>
                <button onClick={() => handleToggleAdmin(user.id)}>
                  {user.is_admin ? 'הסר הרשאות ניהול' : 'עדכן כמנהל'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
