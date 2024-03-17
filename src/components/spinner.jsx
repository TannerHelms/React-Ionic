import { FaSpinner } from "react-icons/fa";

const Spinner = ({ state }) => {
  return (
    <FaSpinner
      className={`${state ? "spin flex w-100 items-center" : "hidden"}`}
      size={"32px"}
    />
  );
};
export default Spinner;
