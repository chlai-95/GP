import { ISearchQuery } from "../../../models/search";
import { IUserRequest } from "../models/user";
import env from "@ludovicm67/react-dotenv";

// Return generated request header
const getRequestHeader = (method: string, body?: any) => {
  let requestOptions: any = {
    method: method,
    headers: { 'Content-Type': 'application/json' }
  }
  if (body) {
    requestOptions.body = body;
  }

  return requestOptions;
}

// Return generated request URL
const getBaseUrl = () => {
  if (env.SERVER_URL) {
    return env.SERVER_URL + "/user/";
  }
  else {
    return "http://localhost/user/"
  }
}

// Function to fire API to get users data
const getUsers = async(query: ISearchQuery) => {
  const result = await fetch(getBaseUrl() + `list?limit=${query.limit}&skip=${query.skip}&order_by=${query.order_by}&sort_order=${query.sort_order}`);
  return result.json();
}

// Function to fire API to get single user data
const getUser = async (id: string) => {
  const result = await fetch(getBaseUrl() + id);
  return result.json();
}

// Function to fire API to create new single user
const postUser = async(data: IUserRequest) => {
  const requestOptions = getRequestHeader("POST", JSON.stringify(data));
  const result = await fetch(getBaseUrl() + `new`, requestOptions);
  return result.json();
}

// Function to fire API to update existing single user
const patchUser = async(data: IUserRequest) => {
  const target_id = data.id;
  const requestOptions = getRequestHeader("PATCH", JSON.stringify(data));

  const result = await fetch(getBaseUrl() + `${target_id}`, requestOptions);
  return result.json();
}

// Function to fire API to delete existing single user
const deleteUser = async(data: IUserRequest) => {
  const target_id = data.id;
  const requestOptions = getRequestHeader('DELETE');

  const result = await fetch(getBaseUrl() + `${target_id}`, requestOptions);
  if (result.status === 204) {
    return result.status;
  }
  return result.json();
}

// exporting functions
export { getUsers, getUser, postUser, patchUser, deleteUser }