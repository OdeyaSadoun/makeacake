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
    // Implement logic to add a new user
  };

  const handleEditUser = (userId) => {
    // Implement logic to edit the user details
  };

  const handleDeleteUser = (userId) => {
    // Implement logic to delete the user
  };

  return (
    <div>
      <button onClick={handleAddUser}>Add User</button>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.first_last_name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => handleEditUser(user.id)}>Edit</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
