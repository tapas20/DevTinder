import React from "react";
import {
  FaVenusMars,
  FaBirthdayCake,
  FaCode,
  FaTimes,
  FaCheck,
  FaHeart,
  FaComment,
} from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, skills, gender, age, photoUrl, _id } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="cursor-pointer relative w-80 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Large Profile Image */}
      <div className="relative h-60 w-full bg-gray-100">
        <img
          src={
            photoUrl ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          }
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-3 left-3">
            <h2 className="text-xl font-bold text-white">
              {firstName} {lastName}
            </h2>
            {age && gender && (
              <div className="flex items-center space-x-2 text-white/90 text-sm">
                <span>{age} yrs</span>
                <span>•</span>
                <span>{gender}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-5">
        {about && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{about}</p>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Tinder-style */}
        <div className="flex justify-center space-x-4 pt-2">
          <button className="cursor-pointer flex items-center justify-center h-12 w-12 rounded-full bg-red-100 hover:bg-red-200 text-red-500 shadow-md transition-all hover:scale-110">
            <FaTimes
              onClick={() => handleSendRequest("ignored", _id)}
              size={18}
            />
          </button>
          <button className="cursor-pointer flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 shadow-md transition-all hover:scale-110">
            <FaComment size={20} />
          </button>
          <button className="cursor-pointer flex items-center justify-center h-12 w-12 rounded-full bg-green-100 hover:bg-green-200 text-green-500 shadow-md transition-all hover:scale-110">
            <FaHeart
              onClick={() => handleSendRequest("interested", _id)}
              size={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
