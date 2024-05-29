import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";

const AuthContext = React.createContext();

export const AuthProvider = ({ app, login }) => {
  const { appData } = useContext(AppContext);

  return (
    <AuthContext.Provider>{appData.jwt ? app : login}</AuthContext.Provider>
  );
};
