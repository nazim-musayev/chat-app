import { motion } from 'framer-motion';
import { fadeInOut} from 'src/variants';


interface Props {
  classes: string,
  text: string,
  motionKey: string
};

const MotionP = ({classes, text, motionKey}: Props) => {
  return (
    <motion.p
     key={motionKey}
     variants={fadeInOut}
     initial="hidden"
     animate="visible"
     exit="out"
     className={classes}

    >
      {text}
    </motion.p>
  )
}

export default MotionP
