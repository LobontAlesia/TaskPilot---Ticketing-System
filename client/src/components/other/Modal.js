import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await axios.get(`/api/users`);
    setAllUsers(users.data);
  };

  const modifyUser = async (id, isAdmin) => {
    const user = await axios.patch(`/api/users/admin/${id}`, { isAdmin });
    setAllUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === id ? { ...u, isAdmin: !u.isAdmin } : u))
    );
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`);
    setAllUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div id="admin" className="modal">
        <div className="modal__content">
          <h1 className="modal__title">Manage users</h1>
          <div className="users-container">
            {allUsers.map((user) => (
              <div className="user" key={user._id}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name:</strong>
                      </td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ marginBottom: '7px' }}></div>
                <select
                  defaultValue={user.isAdmin ? 'admin' : 'user'}
                  onChange={() => modifyUser(user._id, !user.isAdmin)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <span style={{ marginRight: '10px' }}></span>
                <button onClick={() => deleteUser(user._id)}>Remove</button>
              </div>
            ))}
          </div>
          <a href="#" className="modal__close">
            &times;
          </a>
        </div>
      </div>
    </>
  );
};

export default Modal;
