import { useContext, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { BiSolidSend } from "react-icons/bi";
import { sendMessage } from "@app/api/messenger";
import socket from "@app/api/socket";
import { AppContext } from "@app/pages/App";
import { AppContextShape, TagsData } from "@app/types/types";
import { errorHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MessengerController = () => {
  const [selectedTags, setSelectedTags] = useState<string[] | any>([]);
  const [messageContent, setMessageContent] = useState("");
  const { tagsData } = useContext(AppContext) as AppContextShape;

  const tags = tagsData?.map((tag: TagsData) => tag.name);

  const { mutate: sendMessageMutate } = useMutation(sendMessage, {
    onError: errorHandler,
  });

  const handleSendMessage = () => {
    if (messageContent) {
      socket.emit("sendMessage", messageContent);
      sendMessageMutate({
        message: messageContent,
        tags: selectedTags,
      });
      setMessageContent("");
    }
  };

  return (
    <div className="w-[90%]">
      <div className="flex h-[50px] w-[100%]">
        <Typeahead
          id="custom-typeahead"
          labelKey="name"
          multiple
          onChange={setSelectedTags}
          options={tags ? tags : []}
          placeholder="Tags"
          selected={selectedTags}
          dropup
          className="h-[24px] w-[100%] border-0 text-[#6743B1] placeholder-[#6743B1]"
        />
      </div>
      <div className="relative flex w-[100%] items-center">
        <textarea
          value={messageContent}
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="custom-textarea h-[58px] w-full resize-none rounded border-0 bg-[#F0ECF7] p-2 pr-10 text-base placeholder-[#6743B1] placeholder:-translate-y-[-9px]"
          placeholder="Send a message"
        ></textarea>
        <div
          role="button"
          tabIndex={0}
          className="absolute top-2 right-2 translate-y-1/2 transform"
          onClick={handleSendMessage}
          onKeyDown={handleSendMessage}
        >
          <BiSolidSend size={20} color="#6743B1" cursor="pointer" />
        </div>
      </div>
    </div>
  );
};

export default MessengerController;
