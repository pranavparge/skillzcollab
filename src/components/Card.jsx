import { motion } from "motion/react";
import { Calendar, Euro } from "lucide-react";

import { formatDeadline, formatReward } from "../utils";

const Card = ({
  name,
  title,
  description,
  deadline,
  logo,
  reward,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="mb-6 p-6 border border-gray-100 rounded-xl cursor-pointer"
      onClick={onClick}
    >
      {/* Logo and Name */}
      <div className="flex items-center space-x-4 mb-4">
        <motion.img
          src={logo}
          alt={`${name} logo`}
          className="w-14 h-14 p-2 rounded-full object-contain ring-2 ring-gray-100"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        </div>
      </div>

      {/* Title */}
      <motion.h4
        className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h4>

      {/* Description */}
      <motion.p
        className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </motion.p>

      {/* Deadline and Reward */}
      <motion.div
        className="flex items-center justify-between pt-4 border-t border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-500" />
          <span className="text-md text-gray-500">
            {formatDeadline(deadline)}
          </span>
        </div>

        <span className="text-md text-gray-500">{formatReward(reward)}</span>
      </motion.div>
    </motion.div>
  );
};

export default Card;
