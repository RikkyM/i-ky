import { motion, type HTMLMotionProps } from "motion/react";

type AnimateSectionProps = HTMLMotionProps<"section">;

const item = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 20,
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AnimateSection = ({ children, ...props }: AnimateSectionProps) => {
  return (
    <motion.section variants={item} {...props}>
      {children}
    </motion.section>
  );
};

export default AnimateSection;
