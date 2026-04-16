import { useState } from "react";
import {useEffect, useRef} from "react";

export default function CustomDropdown({ value, onChange, options }) {
    const [open, setOpen] = useState(false);

    const handleSelect = (val) => {
        onChange(val);
        setOpen(false);
    };

    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const headerRef = useRef();

    const toggleDropdown = (e) => {
        e.stopPropagation();

        const rect = headerRef.current.getBoundingClientRect();

        setCoords({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX
        });

        setOpen(prev => !prev);
    };

    return (
        <div className="custom-dropdown position-static" ref={ref}>
            {/*<div*/}
            {/*    className={`dropdown-header ${open ? "active" : ""}`}*/}
            {/*    onClick={(e) => {*/}
            {/*        e.stopPropagation();       // prevents parent interference*/}
            {/*        setOpen(prev => !prev);*/}
            {/*    }}*/}
            {/*    tabIndex={0}   // allows focus styling*/}
            {/*>*/}
            <div
                ref={headerRef}
                className={`dropdown-header ${open ? "active" : ""}`}
                onClick={toggleDropdown}
                tabIndex={0}
            >
                {/*{value} <span className="arrow">▼</span>*/}
                <span className="dropdown-text">{value}</span>
                <span className="arrow">▼</span>
            </div>

            {/*{open && (*/}
            {/*    <div className="dropdown-list position-static">*/}
            {open && (
                <div
                    className="dropdown-list position-static"
                    style={{
                        top: coords.top,
                        left: coords.left,
                        position: "absolute"
                    }}
                >
                    {options.map(opt => (
                        <div
                            key={opt}
                            className="dropdown-item"
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}