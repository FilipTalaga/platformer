import React, { useState, useEffect, useRef } from 'react';

const key = { d: 68 };

const DebugLabel = ({ data }) => {
    const pressed = useRef(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onKeydown = e => {
            e = e || window.event;
            if (e.keyCode === key.d) {
                if (!pressed.current) {
                    pressed.current = true;
                    setShow(s => !s);
                }
            }
        };
        const onKeyup = e => {
            e = e || window.event;
            if (e.keyCode === key.d) {
                pressed.current = false;
            }
        };

        window.addEventListener("keydown", onKeydown);
        window.addEventListener("keyup", onKeyup);

        return () => {
            window.removeEventListener("keydown", onKeydown);
            window.removeEventListener("keyup", onKeyup);
        };
    }, []);

    return !data || !show ? <></> : (
        <div id="label">
            <p>FPS: {data.fps}</p>
            <p>TPS: {data.tps.current} (expected {data.tps.expected})</p>
        </div>
    );
}

export default DebugLabel;
