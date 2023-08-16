import { FaTrashAlt } from "react-icons/fa";

const DeleteIcon = ({ onClick, data }: any) => {
  const handleClick = () => {
    onClick(data);
  };

  return <FaTrashAlt color="#A48ED0" size={17} onClick={handleClick} />;
};

export default DeleteIcon;
