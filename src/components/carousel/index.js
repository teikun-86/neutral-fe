import React, { useEffect, useState } from "react";

const { ArrowRightIcon, ArrowLeftIcon } = require("@heroicons/react/24/outline");

const Carousel = ({
    autoPlay = false,
    autoPlayInterval = 5000,
    showNavigation = false,
    showDots = false,
    infinite = false,
    children,
    pauseOnHover = false,
    className = "",
    nextButton = null,
    prevButton = null,
    ...props
}) => {
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [timer, setTimer] = useState(null);

    const length = React.Children.count(children);

    const next = () => {
        if (current === length - 1) {
            setCurrent(0);
        } else {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        if (current === 0) {
            setCurrent(length - 1);
        } else {
            setCurrent(current - 1);
        }
    };

    useEffect(() => {
        if (autoPlay) {
            setIsPlaying(true);
        }
    }, [autoPlay]);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        if (isPlaying) {
            const newTimer = setTimeout(() => {
                next();
            }, autoPlayInterval);
            setTimer(newTimer);
        }
    }, [current, isPlaying]);

    useEffect(() => {
        if (pauseOnHover) {
            if (isHovered) {
                setIsPlaying(false);
            } else {
                setIsPlaying(true);
            }
        }
    }, [isHovered]);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex w-full">
                {React.Children.map(children, (child, index) => {
                    return (
                        <div
                            className={`${
                                index === current ? "block" : "hidden"
                            }`}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            {showNavigation && (
                <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
                    <button
                        onClick={prev}
                        className="text-gray-500 hover:text-gray-700 focus:text-gray-700"
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                </div>
            )}

            {showNavigation && (
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <button
                        onClick={next}
                        className="text-gray-500 hover:text-gray-700 focus:text-gray-700"
                    >
                        <ArrowRightIcon className="w-6 h-6" />
                    </button>
                </div>
            )}

            {showDots && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    {Array.from({ length }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`${
                                i === current
                                    ? "bg-gray-900"
                                    : "bg-gray-300"
                            } w-2 h-2 rounded-full mx-1 focus:outline-none`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;