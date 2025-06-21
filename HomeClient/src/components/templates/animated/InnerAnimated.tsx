import { motion } from "framer-motion"

const InnerAnimation = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { duration: 0.2, ease: "easeInOut", type: "tween", delay: 0.2 }
            }}
            exit={{
                opacity: 0,
                transition: { duration: 0.2, ease: "easeInOut", type: "tween", delay: 0.2 }
            }}
            className="w-full"
        >
            {children}
        </motion.main>
    )
}

export default InnerAnimation