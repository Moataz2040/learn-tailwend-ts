import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://localhost:44323/";
const useNetworkService = () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSUQiOiIxMjIyNTY5NjkxNTM3NiIsIk5hbWUiOiLYp9iu2KrYqNin2LEg2KfZhNiv2K7ZiNmEINmE2YTZhdmI2YLYuSIsIkFnZSI6IjMwIiwiUGhvbmUiOiIwMTEwMjc1ODk3NCIsIkVtYWlsIjoidGVzdEB0ZXN0IiwiR2VuZGVyIjoiRiIsIklkR292ZXJub3JhdGUiOiIiLCJOYW1lR292ZXJub3JhdGUiOiIiLCJJZERpc3RyaWN0IjoiIiwiTmFtZURpc3RyaWN0IjoiIiwiQ3JlYXRlZEJ5IjoibiIsIkNyZWF0ZWREYXRlIjoiMjAyNC0wNy0wNyIsIlVwZGF0ZWRCeSI6ItmF2YfZhtivINin2K3ZhdivINmG2KfYr9ixINin2YTYs9mK2K8iLCJVcGRhdGVkRGF0ZSI6IjIwMjQtMDktMjIiLCJJc0FjdGl2ZSI6IlRydWUiLCJJc0xvY2tlZCI6IkZhbHNlIiwicm9sZSI6ImNlbnRyYWwgYWRtaW4iLCJqdGkiOiJmMDg4ZTUzNC1kMTExLTQxMDQtOWJiNi1mMThmYjAwY2JlMTEiLCJleHAiOjE3Mjc1NTExMzYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzIzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjMifQ.224shqtVrAcrNkzXl2GCnM9FN1s-0hqzhiSQHBbSSDM`;
  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}api/Districts/Districts?PageNumber=1&PageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async (data: {}, id: number) => {
    try {
      const response = await axios.put(`${url}api/Districts?id=${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOptionsDrobdown = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const result = response.data;
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { getData, updateData, getOptionsDrobdown };
};
export default useNetworkService;
