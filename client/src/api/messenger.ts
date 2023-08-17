import { GetMessageParams, SendMessageParams } from "@app/types/types";
import axios from "axios";
import { serverUrl } from "./apiClient";

export const getTags = async () => {
  const res = await axios.get(`${serverUrl}/tags`);
  return res?.data;
};

export const createTag = async (tagData: { tag: string }) => {
  const res = await axios.post(`${serverUrl}/createTag`, tagData);
  return res?.data;
};

export const deleteTag = async (tagData: { tag: string }) => {
  const res = await axios.delete(`${serverUrl}/deleteTag`, {
    data: { tagData },
  });
  return res?.data;
};

export const sendMessage = async (messageData: SendMessageParams) => {
  const res = await axios.post(`${serverUrl}/sendMessage`, messageData);
  return res?.data;
};

export const getMessages = async (messageData: GetMessageParams) => {
  const res = await axios.post(`${serverUrl}/messages`, messageData);
  return res?.data;
};
