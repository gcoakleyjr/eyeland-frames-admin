import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { logout } from "../../redux/userRedux"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function Topbar() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const dispatch = useDispatch()
  console.log(admin)

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Eyeland Frames Admin</span>
        </div>
        <div className="topRight">

          {admin ?
            <>
              <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <Language />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer" onClick={() => dispatch(logout())} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Settings />
                <span>Logout</span>
              </div>
              <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
            </>
            :
            <Link to="/login">
              <Button color="default" variant="contained" className="login-button">Login</Button>
            </Link>
          }

        </div>
      </div>
    </div>
  );
}
