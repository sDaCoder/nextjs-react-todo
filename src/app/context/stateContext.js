"use client"

import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <StateContext.Provider value={{
            isSmallScreen, 
            setIsSmallScreen,
            isOpen,
            setIsOpen,
            isLoading,
            setIsLoading
        }}>
            {children}
        </StateContext.Provider>
    );
};