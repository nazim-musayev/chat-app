import { BsFillFileEarmarkLockFill, BsGithub } from "react-icons/bs";
import MotionDiv from "src/components/shared/MotionDiv";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Login = () => {
  const signInButtons = [
    {
      icon: <FaFacebook className="text-3xl text-blue-600" />,
      provider: "facebook"
    },
    {
      icon: <FcGoogle className="text-3xl" />,
      provider: "google"
    },
    {
      icon: <BsGithub className="text-3xl" />,
      provider: "github"
    }
  ];

  return (
    <MotionDiv classes="flex flex-col items-center justify-center h-screen w-screen">
      <BsFillFileEarmarkLockFill className="text-blue-500 text-8xl mb-10" />
      {signInButtons.map(({ icon, provider }) => (
        <div
         key={provider}
         onClick={() => signIn(provider)}
         className="flex space-x-3 border border-blue-500 py-2 px-10 w-72 mb-3 cursor-pointer rounded hover:bg-slate-100"
        >
          {icon}
          <button className="font-semibold text-gray-700">
            Sign in with <span className="capitalize"> {provider} </span>
          </button>
        </div>
      ))}
    </MotionDiv>
  );
};

export default Login;
