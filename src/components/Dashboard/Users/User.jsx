import React from 'react';

const User = (props) => {
  return (
    <div>
      <h3>{props.users.name}</h3>
      <h3>{props.users.email}</h3>
      <h3>{props.users.age}</h3>
      <h3>{props.users.company}</h3>
      <h3>{props.users.noOfPeople}</h3>
      <h3>{props.users.education}</h3>
      <h3>{props.users.isApproved}</h3>
    </div>
  );
};

export default User;
