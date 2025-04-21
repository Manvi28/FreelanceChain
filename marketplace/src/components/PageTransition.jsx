import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.2, opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
