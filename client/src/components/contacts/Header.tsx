import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { User as SessionUser } from "next-auth";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { UpdateUserData, UpdateUserInput } from "src/interfaces";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "src/apollo/mutations";
import Avatar from "src/components/shared/Avatar";
import MotionDiv from "src/components/shared/MotionDiv";
import ErrorMessage from "src/components/contacts/ErrorMessage";
import { useRecoilState } from "recoil";
import { userProfileState } from "src/recoil/userProfile";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface Inputs {
  name: string;
  status: string;
};

interface Props {
  sessionUser: SessionUser;
};

const ProfileHeader = ({ sessionUser }: Props) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const currentName = userProfile.name || sessionUser.name;
  const currentStatus = userProfile.status || sessionUser.status;

  const [updateUser] = useMutation<UpdateUserData, UpdateUserInput>(UPDATE_USER, {
    onCompleted: (data: UpdateUserData) => {
      setUserProfile({
        name: data.updateUser.name,
        status: data.updateUser.status!
      });
    }
  });

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(5).max(20),
    status: Yup.string().required("Status is required").min(5).max(33)
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const handleLogOut = () => {
    setMenu(false);
    signOut({
      callbackUrl: "http://localhost:3000/"
    });
  };

  const handleUpdate = () => {
    setMenu(false);
    setUpdate(true);
  };

  const handleCancel = () => {
    setUpdate(false);
    reset();
    setUpdateError(false);
  };

  const handleForm: SubmitHandler<Inputs> = (data) => {
    if (data.name === currentName && data.status === currentStatus) {
      setUpdateError(true);
    } else {
      updateUser({
        variables: {
          input: {
            _id: sessionUser.id,
            name: data.name,
            status: data.status
          },
        }
      });
      handleCancel();
    }
  };

  return (
    <>
      {!update && (
        <div className="flex items-center relative space-x-2 p-5 text-sm">
          <Avatar src={sessionUser.image!} width={10} height={10} />
          <div>
            <p className="font-semibold">{currentName!.slice(0, 20)}</p>
            <p className="text-gray-400 text-xs">
              {currentStatus ?? "Hey there, i am using Chat App!"}
            </p>
          </div>
          <motion.button
           whileHover={{ scale: 1.3 }}
           whileTap={{ scale: 0.9 }}
           onClick={() => setMenu(!menu)}
           className="text-xl absolute top-7 right-3"
          >
            {menu ? <RiCloseFill /> : <BsThreeDotsVertical />}
          </motion.button>
          {menu && (
            <MotionDiv
              classes="absolute top-14 right-5 bg-white text-black rounded-md cursor-pointer overflow-hidden"
              hover={1.1}
            >
              <div className="hover:bg-primary hover:text-white px-14 py-2" onClick={handleUpdate}>
                Update
              </div>
              <div className="hover:bg-primary hover:text-white px-14 py-2" onClick={handleLogOut}>
                Log out
              </div>
            </MotionDiv>
          )}
        </div>
      )}
      {update && (
        <form
         noValidate
         onSubmit={handleSubmit(handleForm)}
         className={`relative bg-dark py-4 px-7 space-y-2`}
        >
          <input
           placeholder="name"
           {...register("name", { required: true })}
           className={`outline-none bg-dark border-[1px] text-sm py-1 px-2 rounded-lg w-full ${updateError || errors.name ? "border-red-900" : "border-primary"}`}
          />
          {errors.name && <ErrorMessage message={errors.name.message!} />}
          <input
           placeholder="status"
           {...register("status", { required: true })}
           className={`outline-none bg-dark border-[1px] text-sm py-1 px-2 rounded-lg w-full ${updateError || errors.status ? "border-red-900" : "border-primary"}`}
          />
          {errors.status && <ErrorMessage message={errors.status.message!} />}
          <div>
            {updateError && (
              <ErrorMessage message="Cannot update to existing values" />
            )}
          </div>
          <MotionDiv classes="space-x-3 float-right">
            <motion.button
             type="submit"
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.8 }}
             className="text-sm border-[1px] border-primary py-1 px-3 rounded-md"
            >
              update
            </motion.button>
            <motion.button
             type="button"
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.8 }}
             onClick={handleCancel}
             className="text-sm border-[1px] border-primary py-1 px-3 rounded-md"
            >
              cancel
            </motion.button>
          </MotionDiv>
        </form>
      )}
    </>
  );
};

export default ProfileHeader;
