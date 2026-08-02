import { motion, type HTMLMotionProps } from "motion/react";

type AnimateContainerProps = HTMLMotionProps<"main">;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AnimateContainer = ({ children, ...props }: AnimateContainerProps) => {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      {...props}
    >
      {children}
    </motion.main>
  );
};

export default AnimateContainer;
