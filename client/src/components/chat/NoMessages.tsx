import MotionDiv from "src/components/shared/MotionDiv";
import { BiMessageError } from "react-icons/bi";

const NoMessages = () => {
  return (
    <MotionDiv classes="flex items-center space-x-2 absolute bottom-20 left-40">
      <BiMessageError className="text-3xl text-yellow-500" />
      <span>Seems there is no messages yet :(</span>
    </MotionDiv>
  );
};

export default NoMessages;
