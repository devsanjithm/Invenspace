import React, { createContext, useState, useEffect } from "react";
import { appRouteKey } from "../../utils/constant";
import { clearAll } from "../localstorage";

const UserContext = createContext({});

const ContextProvider = ({ children }) => {


    //create state needed to use in app

    const [route, setRoute] = useState(false);
    const [isInternet, setisInternet] = useState(true);

    useEffect(() => {
        async function data() {
          try {
            const user = await getLocalStorageItem(appRouteKey);
            console.log('userData logged in context page', userData);
            if (user === 'true') {
              setRoute(true);
            } else {
              setRoute(false);
            }
          } catch (error) {
            setRoute(false)
            clearAll()
          }
        }
        data();
      }, []);

    return (
        <UserContext.Provider
            value={{route, setRoute,isInternet, setisInternet}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, ContextProvider };