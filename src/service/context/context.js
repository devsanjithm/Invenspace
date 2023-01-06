import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

const ContextProvider = ({ children }) => {


    //create state needed to use in app
    
    return (
        <UserContext.Provider
            value={{}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, ContextProvider };