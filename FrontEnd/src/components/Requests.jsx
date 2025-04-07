import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { motion } from "framer-motion";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + action + "/" + requestId,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };

  const openProfile = (user) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setSelectedUser(null);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="p-6 h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Connection Requests
      </h1>

      {requests?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">
            No connection requests yet
          </div>
          <p className="text-gray-500">
            When someone sends you a request, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {requests?.map((request, index) => (
            <motion.div
              key={request._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
            >
              <div className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={request.fromUserId.photoUrl}
                      alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">
                      {request.fromUserId.firstName}{" "}
                      {request.fromUserId.lastName}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {request.fromUserId.about}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-between space-x-3">
                  <button
                    onClick={() => openProfile(request.fromUserId)}
                    className="flex-1 cursor-pointer flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleRequestAction(request._id, "rejected")}
                    className="px-3 py-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRequestAction(request._id, "accepted")}
                    className="px-3 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedUser.firstName} {selectedUser.lastName}'s Profile
              </h2>
              <button
                onClick={closeProfile}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <img
                src={selectedUser.photoUrl}
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">About</h3>
                <p className="text-gray-600">{selectedUser.about}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUser.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
