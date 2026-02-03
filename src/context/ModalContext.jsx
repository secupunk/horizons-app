import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModals = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isCityRequestOpen, setCityRequestOpen] = useState(false);
  const [isWaitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <ModalContext.Provider value={{
      isCityRequestOpen,
      openCityRequest: () => setCityRequestOpen(true),
      closeCityRequest: () => setCityRequestOpen(false),
      isWaitlistOpen,
      openWaitlist: () => setWaitlistOpen(true),
      closeWaitlist: () => setWaitlistOpen(false),
    }}>
      {children}
    </ModalContext.Provider>
  );
};