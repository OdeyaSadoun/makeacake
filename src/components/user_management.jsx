import React, { useState, useEffect } from 'react';
import RestAPI from '../server/models/restapi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

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

  const handleAddUser = () => {
    navigator('/register');
  };

  const handleToggleAdmin = (userId) => {
    const updatedAdminUser = users.map((user) => {
      if (user.id === userId) {
        const admin = !user.is_admin;
        const numericValueAdmin = admin ? 1 : 0;
        console.log('admin', admin)
        RestAPI.updateIsAdminByUserId(user.id, numericValueAdmin);
        return { ...user, admin};
      }
      return user;
    });
    setUsers(updatedAdminUser);
  };

  return (
    <div>
      <button onClick={handleAddUser}>Add User</button>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.first_last_name}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {user.is_admin ? 'Yes' : 'No'}</p>
          <button onClick={() => handleToggleAdmin(user.id)}>
            {user.is_admin ? 'Remove Admin' : 'Make Admin'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
