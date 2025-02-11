import React, { useEffect } from "react";
import { Link, useParams, useNavigate, Navigate, Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmojiHappy,
  Upload,
  User,
  Eye
} from "@styled-icons/heroicons-outline";
import { followUserAction, userProfileAction, viewedProfile } from "../../../redux/slices/users/usersSlices";
import DateFormatter from "../../DateFormatter/DateFormatter";
import capitalizeWord from "../../../utils/capitalizeWord";
import LoadingComponent from "../../Loading/LoadingComponent";
import { Mail } from "heroicons-react";
import ViewedBy from "./ViewedBy";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  
  //Select profile from store
  const user = useSelector((state) => state?.users);
  const { loading, userAuth, profile, appErr, serverErr, follow, unfollow } = user;

  //dispatch
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [dispatch, follow, unfollow, id]);
  useEffect(() => {
    if(profile?._id != id)
    dispatch(viewedProfile(id))
}, [dispatch, id])
  const isLoginUser = userAuth?._id === profile?._id;
  return (
    <>
   
      {loading ? <LoadingComponent/> : (appErr || serverErr) ? (
        <h1 className="text-red-400 text-3xl">{appErr}{serverErr}</h1> 
      ) : (
        <div className="h-screen flex overflow-hidden bg-white">

          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="flex-1 relative z-0 flex overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                <article>
                  {/* Profile header */}
                  <div>
                    <div>
                      <img
                        className="h-32 w-full object-cover lg:h-48"
                        src={profile?.profilePhoto}
                        alt={profile?.firstName}
                      />
                    </div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex -mt-20">
                          <img
                            className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                            src={profile?.profilePhoto}
                            alt={profile?.firstName}
                          />
                        </div>
                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 ">
                              {profile?.firstName} {profile?.lastName} 

                              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                {profile?.accountType}
                              </span>
                              {profile?.isAccountVerified ? (
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                  Account Verified
                                </span>
                              ) : (
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                  Unverified Account
                                </span>
                              )}
                            </h1>
                            <p className="m-3 text-lg">
                              Date Joined:
                              <DateFormatter date={profile?.createdAt} />{" "}
                            </p>
                            <p className="text-green-400 mt-2 mb-2">
                              {profile?.posts?.length} posts{" "}
                              {profile?.followers?.length} followers{" "}
                              {profile?.following?.length} following
                            </p>
                            {/* Who view my profile */}
                            <div className="flex items-center  mb-2">
                              <Eye className="h-5 w-5 " />
                              <div className="pl-2">
                                {profile?.viewedBy?.length}{" "}
                                <span className="text-indigo-400 cursor-pointer">
                                  users viewed your profile
                                </span>
                              </div>
                            </div>

                            {/* is login user */}
                            {(isLoginUser && !profile?.isBlocked) ? (
                              <Link
                                to={`/upload-profile-photo/${profile?._id}`}
                                className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <Upload
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Upload Photo</span>
                              </Link>
                            ) : null}
                          </div>

                          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            
                              <div>
                                {(!isLoginUser) ? 
                                  <button
                                  onClick={() =>
                                    dispatch(followUserAction(profile?._id))
                                  }
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <EmojiHappy
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Follow</span>
                                </button> : null
                               
                             }
                              </div>
                            {/* is login user */}
                            {isLoginUser && !profile?.isBlocked ? (
                              <Link
                                to={`/update-profile/${profile?._id}`}
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <User
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Update Profile</span>
                              </Link>
                            ) : null}
                            {userAuth.isAdmin ?  <Link
                                to={'/send-email'}
                                state={profile?.email}
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                            
                              <Mail
                                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                                aria-hidden="true"
                              />
                              <span className="text-base mr-2  text-bold text-yellow-500">
                                Send Message
                              </span>
                              </Link> : null}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile?.firstName} {profile?.lastName}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* Tabs */}
                  <div className="mt-6 sm:mt-2 2xl:mt-5">
                    <div className="border-b border-red-900">
                      <div className="max-w-5xl mx-auto "></div>
                    </div>
                  </div>
                  <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                    <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                      <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                        Who viewed my profile {profile?.viewedBy?.length}
                      </h1>
                      {profile?.viewedBy?.length > 0 ?<ViewedBy viewedBy={profile?.viewedBy}/> : null}
                     
                    </div>
                    <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                      <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                        My Post - {profile?.posts?.length}
                      </h1>
                      {profile?.posts?.length <=0 ? 
                        <h2 className="text-center text-xl">No Posts Found</h2> : profile?.posts?.map((post) => (
                        <div
                          key={post?._id}
                          className="flex flex-wrap  -mx-3 mt-3  lg:mb-6"
                        >
                          <div className="mb-2   w-full lg:w-1/4 px-3">
                            <Link to={`/posts/${post?._id}`}>
                              <img
                                className="object-cover h-40 rounded"
                                src={post?.image}
                                alt="poster"
                              />
                            </Link>
                          </div>
                          <div className="w-full lg:w-3/4 px-3">
                            <Link
                              to={`/posts/${post?._id}`}
                              className="hover:underline"
                            >
                              <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                                {capitalizeWord(post?.title)}
                              </h3>
                            </Link>
                            <p className="text-gray-600 truncate">
                              {post?.description}
                            </p>
                            {/* Read more */}
                            <Link
                              className="text-indigo-500 hover:underline"
                              to={`/postdetails/${post?._id}`}
                            >
                              Read More..
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      )}
    
    </>
  );
}
export default Profile;