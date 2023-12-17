import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getBoards } from '../../actions/board';
import CreateBoard from '../other/CreateBoard';
import Navbar from '../other/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'C:\\Users\\Alesia\\Desktop\\Ticketing System\\client\\src\\css\\templatemo-space-dynamic.css';
import 'C:\\Users\\Alesia\\Desktop\\Ticketing System\\client\\src\\css\\bootstrap.min.css'
import 'C:\\Users\\Alesia\\Desktop\\Ticketing System\\client\\src\\css\\animated.css';
import ImageBgr from '../../images/banner-right-image.png';
import ImageAboutLeft from '../../images/about-left-image.png';


const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);
  const dispatch = useDispatch();
  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
};


  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    document.title = 'Your Boards | TaskPilot';
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  if (!isAuthenticated || !user) {
    // If not authenticated or user is null, render nothing
    return null;
  }
  const isAdmin = user._id.length > 0 && user.isAdmin;

  return (
    <div className='dashboard-and-navbar'>
      <Navbar />
      <body class="dashboard-page" >
      <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="container">
        <section className='dashboard'>
        <h1>Welcome, {user && user.name}!</h1>
      </section>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <h6>Solving Requests & Streamlining Support</h6>
                    <h2>TaskPilot brings all your <em>Tasks </em> &amp;<em> Teammates </em> <span>Together</span></h2>
                    <p>Keep everything in the same place, even if your team isn’t.</p>
                    <form id="search" action="#" method="GET">
                      <fieldset>
                        <input name="address" className="email" placeholder="Go back to your projects" required />
                      </fieldset>
                      <fieldset>
                        <button type="submit" className="main-button" onClick={scrollToAboutSection}>Click Here</button>
                      </fieldset>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                    <img src={ImageBgr} alt="team meeting" style={{ maxWidth: '80%', height: 'auto' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="about-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <img src={ImageAboutLeft} alt="person graphic" />
              </div>
            </div>
            <div className="col-lg-8 align-self-center">
              <div className="services">
                <div className="row">
                    <section className='dashboard'>
                      <h2>Your Boards</h2>
                      {loading && <CircularProgress className='dashboard-loading' />}
                      <div className='boards'>
                        {boards.map((board) => (
                          <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
                            {board.title}
                          </Link>
                        ))}

                        {isAdmin && <CreateBoard />}
                      </div>
                    </section>
                  </div>
          </div>       
        </div>
      </div>
      </div>
      </div>
      </body>

    </div>
  );
};

export default Dashboard;
