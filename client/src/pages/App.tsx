import { createContext, useEffect } from "react";
import { getTags } from "@app/api/messenger";
import MessengerBox from "@app/components/MessengerBox";
import MessengerController from "@app/components/MessengerController";
import Sidebar from "@app/components/Sidebar";
import { errorHandler } from "@app/utils";
import { useQuery } from "@tanstack/react-query";

export const AppContext = createContext<any>(null);

const App = () => {
  const { data: tagsData, isLoading: isTagLoading } = useQuery<any>(
    ["tags"],
    getTags,
    {
      onError: errorHandler,
      retry: false,
    }
  );

  return (
    <AppContext.Provider value={{ tagsData }}>
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
