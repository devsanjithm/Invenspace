import _ from "lodash";
import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { appRouteKey, userDataKey } from "../../utils/constant";
import { clearAll, getLocalStorageItem } from "../localstorage";
import {setAuthDetailsSuccess} from "../../views/Authpages/authSlice"
const UserContext = createContext({});

const ContextProvider = ({ children }) => {


    //create state needed to use in app
    const dispatch = useDispatch()
    const [route, setRoute] = useState(false);
    const [isInternet, setisInternet] = useState(true);
    const [userData,setUserData] = useState({});
    
    useEffect(() => {
        async function data() {
          console.log("data is fetching from localstorage ...");
          try {
            let userRes = await getLocalStorageItem(userDataKey);
            userRes = JSON.parse(userRes);
            console.log("userData in context ",userRes);
            if(!_.isEmpty(userRes)){
              console.log("isenpty ");
              setUserData(userRes)
              dispatch(setAuthDetailsSuccess(userRes))
            }
            const user = await getLocalStorageItem(appRouteKey);
            console.log('userData logged in context page', user);
            if (user === 'true') {
              setRoute(true);
            } else {
              setRoute(false);
            }
          } catch (error) {
            console.log("error in context page ",error);
            setRoute(false)
            clearAll()
          }
        }
        data();
      }, []);

    return (
        <UserContext.Provider
            value={{route, setRoute,isInternet, setisInternet,userData,setUserData}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, ContextProvider };