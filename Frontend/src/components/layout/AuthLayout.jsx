import { motion } from "framer-motion";

function AuthLayout({ children }) {
  return (
    <div
      className="
      min-h-screen 
      flex 
      items-center 
      justify-center
      bg-gradient-to-br 
      from-teal-50 
      via-white 
      to-cyan-100
      px-4
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;
