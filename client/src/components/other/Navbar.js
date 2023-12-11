import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import Modal from './Modal';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [changePermissionsModal, setChangePermissionsModal] = useState(false);

  const dispatch = useDispatch();

  if (!isAuthenticated || !user) {
    // If not authenticated or user is null, render nothing
    return null;
  }

  const isAdmin = user._id.length > 0 && user.isAdmin;

  return (<>
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>TaskPilot</Link>
      {isAdmin && (
        <button className="admin-button" onClick={() => setChangePermissionsModal((currentVal) => !currentVal)}>
          <a href="#admin">Manage users</a>
        </button>
      )}
      <Link to='/' onClick={() => dispatch(logout())}>
        Logout
      </Link>
    
    </nav>
    {changePermissionsModal && <Modal />}
    </>
  );
};

export default Navbar;
