import MotionDiv from "src/components/shared/MotionDiv";
import Image from "next/image";

const Loading = () => {
  return (
    <MotionDiv classes="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Image src="/loading.gif" alt="Loading" width={100} height={100} />
    </MotionDiv>
  );
};

export default Loading;
