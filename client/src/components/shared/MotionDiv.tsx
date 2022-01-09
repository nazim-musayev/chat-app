import { motion } from 'framer-motion';
import { fadeInOut } from 'src/variants';


interface Props {
  classes: string,
  hover?: number, 
  children: React.ReactNode,
};

const MotionDiv = ({classes, hover = 1, children}: Props) => {
  return (
    <motion.div
     variants={fadeInOut}
     initial="hidden"
     animate="visible"
     exit="out"
     whileHover={{scale: hover}}
     className={classes}
    >
     {children}   
    </motion.div>
  )
}

export default MotionDiv
