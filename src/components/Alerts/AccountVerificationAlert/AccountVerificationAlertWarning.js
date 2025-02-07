import React, { useEffect } from 'react';
import { Exclamation } from '@styled-icons/heroicons-outline';
import { useDispatch, useSelector } from 'react-redux';
import { accVerificationSendTokenAction } from '../../../redux/slices/accountVerification/accVerificationSlices';

const AccountVerificationAlertWarning = (email) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users);
  const {userAuth} = user;
  
  return (
    <>
         {!userAuth?.isAccountVerified && (
          <div className="bg-red-500 border-l-4 border-yellow-400 p-1">
          <div className="flex">
            <div className="flex-shrink-0">
              <Exclamation
                className="h-5 w-5 text-yellow-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-200">
                Your account is not verified.{" "}
                <button onClick={() => dispatch(accVerificationSendTokenAction(email))}
                type="button"
                className="font-medium underline text-green-200 hover:text-yellow-600">
                  Click this link to verify
                </button>
              </p>
     
            </div>
          </div>
        </div>
         )}
    
    </>
    
  );
}
export default AccountVerificationAlertWarning;