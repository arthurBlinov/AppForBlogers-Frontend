import React from 'react';
import { CheckCircle } from '@styled-icons/heroicons-outline';
import { logoutAction } from '../../redux/slices/users/usersSlices';
import { useDispatch } from 'react-redux';


export default function AccountVerificationSuccessAlert() {
  const dispatch = useDispatch();
  //dispatch(logoutAction());
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircle
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Email for verification is successfully sent to your Email
          </p>
        </div>
      </div>
    </div>
  );
}
