import React from "react";
import { ContextProvider } from "./src/service/context/context";
import { NavigationContainer } from "@react-navigation/native";


import AppNavigation from "./src/routes/AppNavigation";

export default function App(){
  return(
    <>
    <ContextProvider>
      <NavigationContainer>
          <AppNavigation/>
      </NavigationContainer>
    </ContextProvider>
    </>
  )
}