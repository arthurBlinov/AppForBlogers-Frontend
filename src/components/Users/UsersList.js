import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../Loading/LoadingComponent";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users);
  const { appErr, serverErr, loading, usersList, block, unblock } = user;
  useEffect(() => {
    dispatch(fetchUsersAction(''));
  }, [dispatch, block,unblock]);
  
  
  return (
    
        <section className="py-8 bg-gray-900 min-h-screen">
         {loading ? <LoadingComponent/> : appErr || serverErr ? <h3>
             {serverErr}{appErr}
         </h3> : usersList?.length <=0 ? <h2>No Users found</h2> : usersList?.
         map(user => <UsersListItem user={user} key={user?._id}/>)}
        </section>
     
   
  );
};

export default UsersList;
