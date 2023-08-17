import { FaTrashAlt } from "react-icons/fa";
import { DeleteIconProps } from "@app/types/types";

const DeleteIcon = ({ onClick, data }: DeleteIconProps) => {
  const handleClick = () => {
    onClick(data);
  };

  return (
    <FaTrashAlt
      color="#A48ED0"
      size={17}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    />
  );
};

export default DeleteIcon;
