import React from "react";
import { useState } from "react";
import Popup from "../components/Popup";

const PopupContext = React.createContext();

export const PopupProvider = ({ children }) => {
  const [notice, setNotice] = useState("");

  return (
    <PopupContext.Provider value={{ notice, setNotice }}>
      {children}
      <Popup notice={notice} setNotice={setNotice} />
    </PopupContext.Provider>
  );
};

export default PopupContext;
