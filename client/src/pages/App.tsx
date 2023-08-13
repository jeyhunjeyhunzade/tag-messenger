import MessengerBox from "@app/components/MessengerBox";
import MessengerController from "@app/components/MessengerController";
import Sidebar from "@app/components/Sidebar";

const App = () => {
  return (
    <div className="flex h-[100vh] overflow-hidden">
      <Sidebar />
      <div className="flex w-[100%] flex-col items-center justify-between bg-white py-10 ">
        <MessengerBox />
        <MessengerController />
      </div>
    </div>
  );
};

export default App;
