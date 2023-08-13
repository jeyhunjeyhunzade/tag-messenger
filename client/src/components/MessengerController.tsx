import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { BiSolidSend } from "react-icons/bi";

import "react-bootstrap-typeahead/css/Typeahead.css";

const MessengerController = () => {
  const [multiSelections, setMultiSelections] = useState<any>([]);

  const options = ["AAA", "BBB", "CCC", "DDD"];

  return (
    <div className="w-[90%]">
      <div className="mb-[18px] flex w-[100%] border-b-2 border-[#6743B1]">
        <span className="mr-1 text-[#6743B1]">Tags:</span>
        {/* <input
          type="text"
          className="focus:border-red h-[24px] w-[100%] border-0 text-[#6743B1]"
          onChange={(e) => {
            console.log("here");
            e.target.value.replace(/\s/g, " #");
          }}
        /> */}
        <Typeahead
          id="basic-typeahead-multiple"
          labelKey="name"
          multiple
          onChange={setMultiSelections}
          options={options}
          placeholder=""
          selected={multiSelections}
          className="custom-typehead h-[24px] w-[100%] border-0"
          inputProps={{
            className: "custom-typehead",
            style: {
              backgroundColor: "#6743B1",
              color: "#fff",
            },
          }}
        />
      </div>
      <div className="relative flex w-[100%] items-center">
        <textarea
          className="h-[58px] w-full resize-none rounded border-0 bg-[#F0ECF7] p-2 pr-10 text-base placeholder-[#6743B1] placeholder:-translate-y-[-9px]"
          placeholder="Send a message"
        ></textarea>
        <div className="absolute top-2 right-2 translate-y-1/2 transform">
          <BiSolidSend size={20} color="#6743B1" cursor="pointer" />
        </div>
      </div>
    </div>
  );
};

export default MessengerController;