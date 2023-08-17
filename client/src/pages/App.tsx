import { createContext, useEffect, useState } from "react";
import { getMessages, getTags } from "@app/api/messenger";
import socket from "@app/api/socket";
import MessengerBox from "@app/components/MessengerBox";
import MessengerController from "@app/components/MessengerController";
import Sidebar from "@app/components/Sidebar";
import {
  AppContextShape,
  Message,
  NewMessage,
  TagsData,
} from "@app/types/types";
import { errorHandler } from "@app/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const AppContext = createContext<AppContextShape | null>(null);

const App = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: tagsData, isLoading: isTagsLoading } = useQuery<TagsData[]>(
    ["tags"],
    getTags,
    {
      onError: errorHandler,
      retry: false,
    }
  );

  const { mutate: getMessagesMutate, isLoading: getMessagesLoading } =
    useMutation(getMessages, {
      onSuccess: (data) => {
        setMessages(data);
      },
      onError: errorHandler,
    });

  useEffect(() => {
    const getMessagesListener = (data: NewMessage) => {
      const { messageId, message, tags } = data.newMessage;
      if (tags.length > 0) {
        tags.forEach((tag: string) => {
          if (selectedTags.includes(tag)) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { id: messageId, message },
            ]);
          }
        });
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: messageId, message },
        ]);
      }
    };

    socket.on("getMessages", getMessagesListener);

    return () => {
      socket.off("getMessages", getMessagesListener);
    };
  }, [selectedTags]);

  useEffect(() => {
    getMessagesMutate({ tags: selectedTags });
  }, [selectedTags]);

  return (
    <AppContext.Provider
      value={{ tagsData, selectedTags, setSelectedTags, messages }}
    >
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar />
        <div className="flex w-[100%] flex-col items-center justify-between bg-white py-10 ">
          <MessengerBox />
          <MessengerController />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
