"use client"

import { SortnFilterContext } from "@/context/SortnFilterContext";
import { useContext } from "react";

export default function useSortnFilter() {
    const context = useContext(SortnFilterContext);
    if(!context) {
        throw new Error("useSortnFilter must be used within a SortnFilterProvider")
    }
    return context
}