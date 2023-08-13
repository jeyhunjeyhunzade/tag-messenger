import { FaTrashAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-full w-[20%] border-l border-gray-300 bg-[#6743B1] pt-3">
      <div
        id="test"
        className="mb-8 flex justify-center text-2xl font-semibold text-white"
      >
        TagMessenger
      </div>
      <div className="customized-scrollbar flex h-[90vh] flex-grow flex-col overflow-y-auto overflow-x-hidden">
        <div className="mb-8 flex items-center px-4">
          <input
            type="text"
            maxLength={16}
            className="h-[48px] w-[205px] rounded-l border border-white bg-[#6743B1] px-4 text-white placeholder-white focus:outline-none"
            placeholder="New tag"
          />
          <button className="m-0 h-[48px] w-[48px] rounded-r bg-white">
            Add
          </button>
        </div>
        <ul className="flex flex-col items-start px-3">
          {Array.from(Array(5).keys()).map((i) => (
            <div
              key={i}
              className="flex h-[48px] w-full cursor-pointer justify-between rounded px-2 transition delay-100 ease-in hover:bg-[#8A69CE]"
            >
              <li className="self-center text-xl text-white">
                #testtesttesttest
              </li>
              <div className="flex items-center">
                <FaTrashAlt color="#A48ED0" size={17} />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
