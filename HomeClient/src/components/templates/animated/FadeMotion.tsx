import { motion, useInView } from "framer-motion"
import React, { useRef } from "react"

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "left" | "right" | "up" | "down" | "center";
    delay?: number;
    className?: string;
    once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, direction, delay = 0, className, once, style }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: once ? true : false, amount: 0.5 })

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
                y: direction === "up" ? -40 : direction === "down" ? 40 : 0,
                scale: direction === "center" ? 0.5 : 1,
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                scale: isInView ? 1 : direction === "center" ? 0.8 : 1,
                x: isInView ? 0 : direction === "left" ? -40 : direction === "right" ? 40 : 0,
                y: isInView ? 0 : direction === "up" ? -40 : direction === "down" ? 40 : 0,
            }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    )
}
