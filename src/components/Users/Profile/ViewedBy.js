import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../Loading/LoadingComponent";
import { viewedProfile } from '../../../redux/slices/users/usersSlices';
const ViewedBy = ({viewedBy}) => {
  return (
      <>{viewedBy.length <= 0 ? null : viewedBy?.map((user) => (
    <div key={user?._id}>
                   
                      <ul className="" >
                        
                        <Link to={`/profile/${user?._id}`}>
                            <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                              <img
                                className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                src={user?.profilePhoto}
                                alt={user?._id}
                              />
                              <div className="font-medium text-lg leading-6 space-y-1">
                                <h3>
                                  {user?.firstName} {user?.lastName}
                                </h3>
                                <p className="text-indigo-600">
                                  {user.accountType}
                                </p>
                              </div>
                            </div>
                          </Link>
                      
                      </ul>
                      
                        
                      </div>
                        ))}
                        </>
  )
}

export default ViewedBy