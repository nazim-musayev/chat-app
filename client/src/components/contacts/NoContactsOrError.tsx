import MotionDiv from "src/components/shared/MotionDiv";

const NoContacts = ({message}: {message: string}) => {
  return (
    <MotionDiv classes="text-center text-sm text-gray-300">
      {message}
    </MotionDiv>
  );
};

export default NoContacts;
