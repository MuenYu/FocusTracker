import React, { useState, useContext } from "react";
import Popup from "../components/Popup";

const PopupContext = React.createContext();

export const PopupProvider = ({ children }) => {
  const [notices, setNotices] = useState([]);

  const setNotice = (message) => {
    setNotices([{ id: Date.now(), message }]);
  };

  const removeNotice = (id) => {
    setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
  };

  return (
    <PopupContext.Provider value={{ setNotice }}>
      {children}
      {notices.map((notice) => (
        <Popup key={notice.id} notice={notice.message} onDismiss={() => removeNotice(notice.id)} />
      ))}
    </PopupContext.Provider>
  );
};

export default PopupContext;
