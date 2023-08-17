import { useContext } from "react";
import { AppContext } from "@app/pages/App";

const MessengerBox = () => {
  const { messages } = useContext(AppContext);

  return (
    <div className="messenger-box customized-scrollbar flex h-[80%] w-[90%] flex-col items-center overflow-y-auto overflow-x-hidden rounded bg-[#F0ECF7] pt-3">
      {messages.map(({ id, message }: any, i: number) => (
        <div
          key={i}
          className="messenger-box_message my-2 h-fit w-[95%] rounded bg-white p-4 text-left"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessengerBox;
