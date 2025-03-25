import { createContext,useContext, useState, } from "react";

export const SampleContext=createContext(null);

export const SampleContextProvider=({children})=>{
    const [name,setname]=useState(null)
    return(
        <SampleContext.Provider value={{name,setname}}>
            {children}
        </SampleContext.Provider>
    )
}

export const useSampleContext=()=>{
    const temp=useContext(SampleContext);
    return temp;
}