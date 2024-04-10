import React from "react"
import { motion } from "framer-motion"
import NavItems from '../../Data/NavItems.json'


const SideDrower: React.FC = () => {

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu p-4 w-72 min-h-full gap-1 bg-base-200 pt-20 rounded-xl">
        {/* Sidebar content here */}
        {
          NavItems.map((item) => (
            <motion.button
              key={item.id}
              variants={variants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className=' py-2 text-white text-center hover:bg-slate-700 text-md rounded-xl'
            >
              {item.text}
            </motion.button>
          ))
        }
      </ul>
    </div>

  )
}

export default SideDrower;
