import { createContext, useEffect, useState } from "react";
import { getMessages, getTags } from "@app/api/messenger";
import MessengerBox from "@app/components/MessengerBox";
import MessengerController from "@app/components/MessengerController";
import Sidebar from "@app/components/Sidebar";
import { errorHandler } from "@app/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const AppContext = createContext<any>(null);

const App = () => {
  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [messages, setMessages] = useState([]);

  const { data: tagsData, isLoading: isTagsLoading } = useQuery<any>(
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
