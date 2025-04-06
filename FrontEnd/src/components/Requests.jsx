import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

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
      await axios.patch(
        `${BASE_URL}/user/requests/${requestId}`,
        { action },
        { withCredentials: true }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Connection Requests
      </h1>

      {requests?.length === 0 ? (
        <p className="text-gray-500">No connection requests found.</p>
      ) : (
        <div className="space-y-6">
          {requests?.map((request) => (
            <div
              key={request._id}
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <img
                src={request.fromUserId.photoUrl}
                alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-black text-lg">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {request.fromUserId.about}
                </p>
                <p className="text-gray-500 text-xs">
                  Sent on {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRequestAction(request._id, "accept")}
                  className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequestAction(request._id, "reject")}
                  className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
