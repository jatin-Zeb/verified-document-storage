import {abi, contractAddress} from './../../../constants'
import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { ContractContextType } from './context';
export const contractContext = createContext<ContractContextType | null>(null)
interface Props {
    children: React.ReactNode;
}
declare var window: any
export const ContractHandler: React.FC<Props> = ({ children }) =>{
    const [contract, setContract] = useState<any>();

    const checkAndConnectContract = async () => {
        if(!contract){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const tempContract = new ethers.Contract(contractAddress["5"][0], abi, provider.getSigner());
            setContract(tempContract);
            return tempContract
        }
        return contract
    }

    async function addContract(category: string, type: string, description: string, name: string, email: string, startDate: string, endDate: string, createDate: string, sha256: string, IPFSUri: string) {
        const contract = await checkAndConnectContract()    
        await contract.addContract(category, type, description, name, email, startDate, endDate, createDate, sha256, IPFSUri)
    }

    async function getContract(sha256: string) {
        const contract = await checkAndConnectContract()
        const result = await contract.getContract(sha256)
        return result
    }
    
    return (
        <contractContext.Provider value = {{addContract, getContract}}>
            { children }
        </contractContext.Provider>
    )
} 


