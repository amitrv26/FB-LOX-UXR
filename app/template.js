"use client";

import { motion } from "framer-motion";
import { transition } from "../components/vars";

export default function Template({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={transition.page}
    >
      {children}
    </motion.div>
  );
}
