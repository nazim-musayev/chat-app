import Image from 'next/image';

interface Props {
  src: string,
  width: number,
  height: number
}

const Avatar = ({src, width, height}: Props) => {
  return (
    <div className={`relative w-${width} h-${height}`}>
      <Image src={src} alt={src} layout="fill" objectFit="cover" className="rounded-full" placeholder="blur" blurDataURL={src} />
      {/* <img src={src} alt="Avatar" className="object-cover w-full h-full"  /> */}
    </div>
  )
}

export default Avatar;

{/* <div className="w-10 h-10 relative mb-4">
    <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
      <span class="hidden group-hover:table-cell text-white font-bold align-middle">KR</span>
      <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden" />
    </div>
  </div> */}