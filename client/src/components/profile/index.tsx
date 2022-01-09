import Image from 'next/image';
import { User } from 'src/interfaces';
import { MdOutlinePhoneIphone } from 'react-icons/md'
import { GrLocation } from 'react-icons/gr';
import { FiMail } from 'react-icons/fi';

// 6249a7
//#271c46
interface Props { 
  user: User
};

const Profile = ({user}: Props) => {

  return (
    <div className="py-16 space-y-10">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-3">
          <Image src={user.image} alt='djfdk' layout="fill" objectFit="cover" className="rounded-full" />
        </div>
        <h1 className="font-semibold text-xl"> 
          {user.name} 
        </h1>
        <p className="text-gray-700 mb-3">
          React Developer
        </p>
      </div>
      <div className="px-3 text-gray-700 text-sm">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <GrLocation  />
            <p> Baku, Azerbaijan</p>
          </div>
          <div className="flex items-center space-x-2">
            <MdOutlinePhoneIphone />
            <p> 994-99-999-99 </p>
          </div>
          <div className="flex items-center space-x-2">
            <FiMail />
            <p> {user.email} </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile