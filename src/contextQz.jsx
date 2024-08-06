import { createContext, useState } from "react";

export const newContext =createContext()

export const ContextQz=({children})=>{
    const [data , setData]=useState("")

    return (
        <newContext.Provider value={{data}}>
            {children}
        </newContext.Provider>
    )
}