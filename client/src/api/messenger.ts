import axios from "axios";
import { serverUrl } from "./apiClient";

export const getTags = async () => {
  const res = await axios.get(`${serverUrl}/tags`);
  return res?.data;
};

export const createTag = async (tagData: any) => {
  const res = await axios.post(`${serverUrl}/createTag`, tagData);
  return res?.data;
};

export const deleteTag = async (tagData: any) => {
  const res = await axios.delete(`${serverUrl}/deleteTag`, {
    data: { tagData },
  });
  return res?.data;
};

export const sendMessage = async (messageData: any) => {
  const res = await axios.post(`${serverUrl}/sendMessage`, messageData);
  return res?.data;
};

export const getMessages = async (messageData: any) => {
  const res = await axios.post(`${serverUrl}/messages`, messageData);
  return res?.data;
};
