import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import {
  FaUserFriends,
  FaVenusMars,
  FaBirthdayCake,
  FaInfoCircle,
  FaTimes,
  FaCode,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const openProfile = (connection) => {
    setSelectedProfile(connection);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setSelectedProfile(null);
  };

  if (!connections) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2 flex items-center justify-center">
            <FaUserFriends className="mr-3" />
            Your Connections
          </h1>
          <p className="text-gray-600">People you've connected with</p>
        </div>

        {connections.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-indigo-400 mb-4">
              <FaUserFriends size={48} className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Connections Found
            </h2>
            <p className="text-gray-600">
              You haven't connected with anyone yet. Start building your
              network!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connections.map((connection, index) => {
              const {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills,
              } = connection;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={photoUrl || "https://via.placeholder.com/80"}
                        className="h-16 w-16 rounded-full object-cover border-2 border-indigo-200"
                        alt={`${firstName} ${lastName}`}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80";
                        }}
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {firstName} {lastName}
                        </h2>
                        <div className="flex space-x-2 mt-1">
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                            Connection
                          </span>
                        </div>
                      </div>
                    </div>

                    {about && (
                      <div className="mb-4 flex items-start">
                        <FaInfoCircle className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-gray-600 text-sm">{about}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="flex items-center text-sm bg-purple-50 px-3 py-1 rounded-full">
                        <FaBirthdayCake className="text-purple-500 mr-1" />
                        <span className="text-gray-700">{age} years</span>
                      </div>
                      <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full">
                        <FaVenusMars className="text-blue-500 mr-1" />
                        <span className="text-gray-700">
                          {gender === "male"
                            ? "Male"
                            : gender === "female"
                            ? "Female"
                            : "Other"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium">
                        Message
                      </button>
                      <button
                        onClick={() => openProfile(connection)}
                        className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {isProfileOpen && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedProfile.firstName} {selectedProfile.lastName}'s
                    Profile
                  </h2>
                  <p className="text-gray-600">Full profile details</p>
                </div>
                <button
                  onClick={closeProfile}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={
                      selectedProfile.photoUrl ||
                      "https://via.placeholder.com/150"
                    }
                    className="h-32 w-32 rounded-full object-cover border-4 border-indigo-200 mx-auto"
                    alt={`${selectedProfile.firstName} ${selectedProfile.lastName}`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>

                <div className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">About</h3>
                      <p className="text-gray-600 mt-1">
                        {selectedProfile.about || "No information provided"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedProfile.age && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h3 className="font-semibold text-gray-700 flex items-center">
                            <FaBirthdayCake className="mr-2 text-purple-500" />
                            Age
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {selectedProfile.age} years
                          </p>
                        </div>
                      )}
                      {selectedProfile.gender && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h3 className="font-semibold text-gray-700 flex items-center">
                            <FaVenusMars className="mr-2 text-blue-500" />
                            Gender
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {selectedProfile.gender === "male"
                              ? "Male"
                              : selectedProfile.gender === "female"
                              ? "Female"
                              : "Other"}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedProfile.skills &&
                      selectedProfile.skills.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-700 flex items-center">
                            <FaCode className="mr-2 text-indigo-500" />
                            Skills
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProfile.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Contact
                      </h3>
                      <div className="flex space-x-4">
                        <button className="flex items-center justify-center bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                          <FaEnvelope size={18} />
                        </button>
                        <button className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                          <FaLinkedin size={18} />
                        </button>
                        <button className="flex items-center justify-center bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition-colors">
                          <FaGithub size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
