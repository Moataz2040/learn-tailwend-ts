import axios from "axios";
import { useState,useEffect } from "react"

const url = 'https://localhost:44323/'
const useNetworkService =()=>{

const getData =async()=>{
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSUQiOiIyMjIyMjIyMjIyMjIxNCIsIk5hbWUiOiJUZXN0aW5nQWhtZWQiLCJBZ2UiOiI3MCIsIlBob25lIjoiMjIyMjIyMjIyMjIiLCJFbWFpbCI6ImFAYSIsIkdlbmRlciI6Im0iLCJJZEdvdmVybm9yYXRlIjoiIiwiTmFtZUdvdmVybm9yYXRlIjoiIiwiSWREaXN0cmljdCI6IiIsIk5hbWVEaXN0cmljdCI6IiIsIkNyZWF0ZWRCeSI6Im4iLCJDcmVhdGVkRGF0ZSI6IjIwMjQtMDctMDciLCJVcGRhdGVkQnkiOiJzdHJpbmciLCJVcGRhdGVkRGF0ZSI6IjIwMjQtMDgtMTIiLCJJc0FjdGl2ZSI6IlRydWUiLCJJc0xvY2tlZCI6IkZhbHNlIiwicm9sZSI6ImNlbnRyYWwgYWRtaW4iLCJqdGkiOiJiNjQ2YmE0My1mZTlhLTRmMjQtYjc1My03ZTJjZmEwNTc2M2IiLCJleHAiOjE3MjY4NjQwMzAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzIzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjMifQ.z59SZMA_5AyqDy3NSOdRaII5CPGrx6VLW95fsIUr4HM`
    try{
        const response = await axios.get(`${url}api/Districts/Districts?PageNumber=1&PageSize=10`,{
          headers:{
             "Authorization": `Bearer ${token}`
          }
        })
      if (response) {
        return response.data
      }
    }catch(error){
console.log(error);
    }
}
const updateData =async(data:{},id:number)=>{
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSUQiOiIyMjIyMjIyMjIyMjIxNCIsIk5hbWUiOiJUZXN0aW5nQWhtZWQiLCJBZ2UiOiI3MCIsIlBob25lIjoiMjIyMjIyMjIyMjIiLCJFbWFpbCI6ImFAYSIsIkdlbmRlciI6Im0iLCJJZEdvdmVybm9yYXRlIjoiIiwiTmFtZUdvdmVybm9yYXRlIjoiIiwiSWREaXN0cmljdCI6IiIsIk5hbWVEaXN0cmljdCI6IiIsIkNyZWF0ZWRCeSI6Im4iLCJDcmVhdGVkRGF0ZSI6IjIwMjQtMDctMDciLCJVcGRhdGVkQnkiOiJzdHJpbmciLCJVcGRhdGVkRGF0ZSI6IjIwMjQtMDgtMTIiLCJJc0FjdGl2ZSI6IlRydWUiLCJJc0xvY2tlZCI6IkZhbHNlIiwicm9sZSI6ImNlbnRyYWwgYWRtaW4iLCJqdGkiOiJiNjQ2YmE0My1mZTlhLTRmMjQtYjc1My03ZTJjZmEwNTc2M2IiLCJleHAiOjE3MjY4NjQwMzAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzIzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjMifQ.z59SZMA_5AyqDy3NSOdRaII5CPGrx6VLW95fsIUr4HM`
    try{
        const response = await axios.put(`${url}api/Districts?id=${id}`,data,{
          headers:{
             "Authorization": `Bearer ${token}`
          }
        })
      if (response) {
        return response.data
      }
    }catch(error){
console.log(error);
    }
}
return{getData,updateData}
};
export default useNetworkService