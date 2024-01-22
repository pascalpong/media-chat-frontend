import React from "react";
import "./style.css";
import AbcIcon from '@mui/icons-material/Abc';

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav__blocks">
        {/* <img src={logo} alt="Logo" /> */}
        <AbcIcon />
      </div>

      <div className="nav__blocks1">
        <i className="fa fa-home"></i>
      </div>
      <div className="nav__blocks1">
        <i className="fa fa-search"></i>
      </div>
      <div className="nav__blocks1">
        <i className="fa fa-cloud"></i>
      </div>
      <div className="nav__blocks1">
        <i className="fa fa-trash"></i>
      </div>
    </div>
  );
};

export default Nav;
