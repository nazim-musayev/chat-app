import MotionDiv from "src/components/shared/MotionDiv";
import { MdError } from "react-icons/md";

const Error = () => {
  return (
    <MotionDiv classes="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <MdError className="text-8xl text-red-700" />
    </MotionDiv>
  );
};

export default Error;
