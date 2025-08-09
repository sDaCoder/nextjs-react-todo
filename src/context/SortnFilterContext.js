"use client"

import { createContext, useState } from "react";

export const SortnFilterContext = createContext();

export const sortOptions = [
    "task name",
    "date added latest",
    "date added oldest",
    "deadline soonest",
    "deadline latest",
]

export const filterOptions = [
    "all",
    "completed",
    "Unaccomplished",
    "Deadline exceeded",
]

export const SortnFilterContextProvider = ({ children }) => {
    const [sortOption, setSortOption] = useState(sortOptions[sortOptions.length - 1]);
    const [filterOption, setFilterOption] = useState(filterOptions[0]);

    return (
        <SortnFilterContext.Provider value={{
            sortOption,
            setSortOption,
            filterOption,
            setFilterOption
        }}>
            {children}
        </SortnFilterContext.Provider>
    );
}