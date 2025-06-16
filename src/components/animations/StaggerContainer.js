import React from 'react';
import { motion } from 'framer-motion';

export default function StaggerContainer({ 
  children, 
  className = '',
  delay = 0.1,
  staggerDelay = 0.1 
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}