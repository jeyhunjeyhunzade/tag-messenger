const MessengerBox = () => {
  return (
    <div className="messenger-box customized-scrollbar flex h-[80%] w-[90%] flex-col items-center overflow-y-auto overflow-x-hidden rounded bg-[#F0ECF7] pt-3">
      {Array.from(Array(15).keys()).map((i) => (
        <div
          key={i}
          className="messenger-box_message my-3 h-fit w-[95%] rounded bg-white p-4 text-left"
        >
          All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary
        </div>
      ))}
    </div>
  );
};

export default MessengerBox;
