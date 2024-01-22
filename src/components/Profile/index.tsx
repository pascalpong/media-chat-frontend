import React from "react";
import "./style.css";

const UserProfile = () => {
  const toggleInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardHeader = e.currentTarget as HTMLDivElement;
    const card = cardHeader.parentNode as HTMLDivElement;
    card.classList.toggle("open");
  };

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="Profile" />
        </div>
        <h4>Fernando Faucho</h4>
        <p>CEO & Founder at Highly Inc</p>
      </div>
      <div className="profile__card">
        <div className="card__header" onClick={toggleInfo}>
          <h4>Information</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          ultrices urna a imperdiet egestas. Donec in magna quis ligula
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
