import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fadeInOut } from "src/variants";

const Header = () => {
  const { query } = useRouter();

  return (
    <motion.h1
     variants={fadeInOut}
     initial="hidden"
     animate="visible"
     exit="out"
     className="bg-white p-6 font-bold text-xl text-gray-800 shadow-lg"
    >
      {query.chat ?? "Choose a contact"}
    </motion.h1>
  );
};

export default Header;
