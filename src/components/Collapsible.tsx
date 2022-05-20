import React from "react";
import { useState, useRef } from 'react';
import "./Collapsible.css";

function Collapsible(props: any) {

    const [isOpen, setIsOpen] = useState(false);

    const parentRef = useRef(null);

    return (
        <div className="collapsible">
            <h2 >
                <button className={isOpen ? "accordion-button open" : "accordion-button collapsed"}
                        onClick={()=>setIsOpen(!isOpen)} >
                        <h5>{props.label}</h5>
                </button>
            </h2>

                <div
                    className="content-parent"
                    ref={parentRef}
                    style={isOpen ? {
                        height: "100px"} : {height: "0px"}
                }
                >
                    <div className="content">
                        {props.children}
                    </div>
                </div>

        </div>
    )
}

export default Collapsible;

// строчка 22
// height:  parentRef.current.scrollHeight + "500px"