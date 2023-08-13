import Sidebar from "@app/components/Sidebar";

const App = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="w-[80%] flex-1 bg-gray-300 p-8"></div>
    </div>
  );
};

export default App;
