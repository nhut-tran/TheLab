import React, { useEffect, useRef, useState } from "react";

import toastEventRes, { Message } from "./Toaster";

export const useToast = () => {
    const [message, setMessage] = React.useState<Message[]>([]);
    //use to track time of display message; maximum 4s
    const refTime = useRef(Date.now());
    //keep ref of setInterval => clear when need (unmounted, no message to display)
    let clock = useRef<NodeJS.Timeout>();
    //start or stop setInterval based on have or have no message
    const [activeClock, setActiveClock] = useState(false);

    const setMessageWrap = (type: "fail" | "success", m: string) => {
        setMessage((prev) => {
            //maximum 3 message for display
            if (prev.length < 3) {
                refTime.current = Date.now();
                if (prev.length === 2) {
                    setActiveClock(true);
                }
                return [...prev, { type, message: m }];
            } else {
                toastEventRes.messageQueue.push({ type, message: m });

                setActiveClock(true);

                return [...prev];
            }
        });
    };

    React.useEffect(() => {
        toastEventRes.on("fail", setMessageWrap.bind(null, "fail"));
        toastEventRes.on("success", setMessageWrap.bind(null, "success"));
        return () => {
            toastEventRes.unRegister();
        };
    }, []);
    useEffect(() => {
        if (activeClock) {
            //clear clock if any
            if (clock.current) {
                clearInterval(clock.current);
            }

            clock.current = setInterval(() => {
                console.log("run");
                //maximum display time is 4s
                if (refTime.current + 4000 < Date.now()) {
                    setMessage((prev) => {
                        const newState = [...prev];
                        newState.shift();
                        if (
                            prev.length === 0 &&
                            toastEventRes.messageQueue.length > 0
                        ) {
                            refTime.current = Date.now();

                            return [...toastEventRes.messageQueue.splice(0, 3)];
                        } else if (
                            prev.length === 0 &&
                            toastEventRes.messageQueue.length === 0
                        ) {
                            setActiveClock(false);
                            return [];
                        }

                        return [...newState];
                    });
                }
            }, 100);
        } else {
            if (clock.current) clearInterval(clock.current);
        }

        return () => {
            if (clock.current) clearInterval(clock.current);
        };
    }, [activeClock]);
    return { message, toastEventRes };
};
