import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, skills, gender, age } = user; 
  return (
    <div className="card bg-base-300 w-90 shadow-lg">
      <figure>
        <img src={user?.photoUrl} alt="PhotoUrl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <h3>{gender ? `Gender: ${gender}` : null}</h3>
        <h3>{age ? `Age: ${age}` : null}</h3>
        <h3>{skills ? `Skills: ${skills}` : null}</h3> 
        <div className="card-actions mt-10 space-x-10 justify-center">
          <button className="cursor-pointer text-black hover:bg-amber-50 h-9 w-32 bg-red-500 badge">
            Ignored
          </button>
          <button className="cursor-pointer text-black hover:bg-amber-50 h-9 w-32 bg-blue-500 badge">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;