import { motion } from "framer-motion";
import { fadeInOut } from "src/variants";

const MotionX = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      variants={fadeInOut}
      initial="hidden"
      animate="visible"
      exit="out"
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};

export default MotionX;
