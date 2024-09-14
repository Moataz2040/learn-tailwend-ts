import axios from "axios";
import { useState,useEffect } from "react"

const url = 'https://localhost:44323/'
const useNetworkService =()=>{

const getData =async()=>{
    try{
        const response = await axios.get(`${url}api/Districts/Districts?PageNumber=1&PageSize=10`)
      if (response) {
        return response.data
      }
    }catch(error){
console.log(error);
    }
}
return{getData}
};
export default useNetworkService