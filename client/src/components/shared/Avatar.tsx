import Image from "next/image";

interface Props {
  src: string;
  width: number;
  height: number;
};

const Avatar = ({ src, width, height }: Props) => {
  return (
    <div className={`relative w-${width} h-${height} rounded-full overflow-hidden`}>
      <Image
       src={src}
       alt={src}
       layout="fill"
       objectFit="cover"
       className="rounded-full"
       placeholder="blur"
       blurDataURL={src}
      />
    </div>
  );
};

export default Avatar;
