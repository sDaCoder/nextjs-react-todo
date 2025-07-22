"use client"

import { useContext } from "react"
import { StateContext } from "../context/stateContext";

export default function useStatedata() {
    const context = useContext(StateContext);
    if(!context) {
        throw new Error("useStatedata must be used within a StateProvider")
    }
    return context
}