import {abi, contractAddress} from './../../../constants'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import * as React from 'react';
import { ContractContextType } from '../../../context';
export const contractContext = React.createContext<ContractContextType | null>(null)
interface Props {
    children: React.ReactNode;
}
const ContractHandler: React.FC<Props> = ({ children }) =>{
    const [contract, setContract] = useState<any>();

    const checkAndConnectContract = async () => {
        // if(!contract){
        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const tempContract = await new ethers.Contract(contractAddress["5"][0], abi, provider.getSigner());
        //     setContract(tempContract);
        // }
    }

    async function addContract(category: string, purpose: string, name: string, email: string, createDate: string, sha256: string, IPFSUri: string)  {
        console.log("contract called");
        
        await checkAndConnectContract()
        contract.addContract(category, purpose, name, email, createDate, sha256, IPFSUri)
    }
    return (
        <contractContext.Provider value = {{addContract}}>
            { children }
        </contractContext.Provider>
    )
}

export default ContractHandler;

