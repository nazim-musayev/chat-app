import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { User, UpdateUserData, UpdateUserInput } from 'src/interfaces';
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from 'src/apollo/mutations';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOut } from 'src/variants';
// import { User } from 'next-auth';
import Avatar from 'src/components/shared/Avatar';
import MotionP from 'src/components/shared/MotionP';
import MotionDiv from 'src/components/shared/MotionDiv';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


interface Inputs {
  name: string,
  status: string
};

interface Props {
  currentUser: User
};

const ProfileHeader = ({currentUser}: Props) => {
  const [updateUser, { data }] = useMutation<UpdateUserData, UpdateUserInput>(UPDATE_USER);
  const [menu, setMenu] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(5).max(25),
    status: Yup.string().required('Status is required').min(5).max(25)
  });

  const {register, handleSubmit, reset, formState : {errors} } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const handleLogOut = () => {
    setMenu(false);
    signOut({
      callbackUrl: 'http://localhost:3000/' 
    })
  };

  const handleUpdate = () => {
    setMenu(false);
    setUpdate(true);
  };

  const handleCancel = () => {
    setUpdate(false);
    reset();
  };

  const handleForm: SubmitHandler<Inputs> = (data) => {
    updateUser({
      variables: {
        input: {
          _id: currentUser._id,
          name: data.name,
          status: data.status
        }
      }
    });
    handleCancel();
  };

  return (
    <>
      {!update && ( 
        <div className="flex items-center relative space-x-2 p-5 text-sm">
          {/* <div className="w-12 -12"> */}
            <Avatar src={currentUser.image} width={12} height={12} />
          {/* </div> */}
          <div>
            <p className="font-semibold">
              {(data?.updateUser || currentUser).name}
            </p>
            <p className="text-gray-400">
              {(data?.updateUser || currentUser).status ?? "Hey there, i am using Chat App!"}
            </p>
          </div>
          <BsThreeDotsVertical 
           onClick={() => setMenu(!menu)} 
           className="text-xl absolute top-7 right-3 cursor-pointer" 
          />
          {menu && (
            <MotionDiv classes="absolute top-14 right-5 bg-white text-black rounded-md cursor-pointer overflow-hidden" hover={1.05}>
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
        <form noValidate
         onSubmit={handleSubmit(handleForm)}
         className={`relative bg-dark py-4 px-7 space-y-2`}
        >
          <input 
           placeholder="name"
           {...register("name", { required: true })}
           className={`outline-none bg-dark border-[1px] text-sm py-1 px-2 rounded-lg w-full ${errors.name ? "border-red-900" : "border-primary"}`} 
           />
          {errors.name && <span className="text-[11px] text-red-300">{errors.name.message}</span>}
          <input 
           placeholder="status"
           {...register("status", { required: true })}
           className={`outline-none bg-dark border-[1px] text-sm py-1 px-2 rounded-lg w-full ${errors.status ? "border-red-900" : "border-primary"}`}
          />
          {errors.status && <span className="text-[11px] text-red-300">{errors.status.message}</span>}
          <MotionDiv classes="space-x-3 relative left-32">
            <motion.button
             type="submit"
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.8}}
             className="text-sm border-[1px] border-primary py-1 px-3 rounded-md"
            >
              update
            </motion.button>
            <motion.button 
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.8}}
             onClick={handleCancel}
             className="text-sm border-[1px] border-primary py-1 px-3 rounded-md"
            >
             cancel
            </motion.button>
          </MotionDiv>
        </form>
      )}
    </>
  )
}

export default ProfileHeader