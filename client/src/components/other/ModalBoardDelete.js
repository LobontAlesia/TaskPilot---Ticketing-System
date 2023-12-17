import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { removeMember } from '../../actions/board';

const Modal = () => {
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const boardMembers = useSelector((state) => state.board.board.members);


  const fetchUsers = async () => {
    try {
      const users = await axios.get(`/api/boards`);

      setAllUsers(users.data[0].members);
    }
    catch (err) {
        console.log(err.message);
        }
  };

  const deleteUser = async (id) => {

    await axios.delete(`/api/boards/removeMember/${id}`);
    setAllUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    dispatch(removeMember(id));

    fetchUsers();
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
              <div className="user" key={user.user}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name:</strong>
                      </td>
                      <td>{user.name}</td>
                    </tr>
                    
                    
                  </tbody>
                </table>
                <div style={{ marginBottom: '7px' }}></div>

                <span style={{ marginRight: '10px' }}></span>
                <button onClick={() => deleteUser(user.user)}>Remove</button>
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