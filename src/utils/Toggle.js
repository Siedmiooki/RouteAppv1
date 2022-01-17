import { motion } from "framer-motion";
import { useState } from "react";

const Toggle = ({ children }) => {
    const [toggle, setToggle] = useState(true)
    return (
        <motion.div layout className="question" onDoubleClick={() => setToggle(!toggle)}>
            <h2>{toggle ? "Hide map" : "Show route on Map"}</h2>
            <h5>double click</h5>
            {toggle ? children : ""}
            <div className="faq-line"></div>
        </motion.div>
    );
}

export default Toggle;