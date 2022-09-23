import { motion } from "framer-motion";
const Header = ({ children }) => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="header"
    >
      <div className="header-cover">
        <div className="new-container flex-y h-[300px] header-heading">
          {children}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
