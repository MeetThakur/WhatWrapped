import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSlide from "./slides/IntroSlide";
import StatsSlide from "./slides/StatsSlide";
import ResponseTimeSlide from "./slides/ResponseTimeSlide";
import TimeStatsSlide from "./slides/TimeStatsSlide";
import MostActiveDaySlide from "./slides/MostActiveDaySlide";
import MostActiveMonthSlide from "./slides/MostActiveMonthSlide";
import WordCloudSlide from "./slides/WordCloudSlide";
import MessageLengthSlide from "./slides/MessageLengthSlide";
import ConversationStarterSlide from "./slides/ConversationStarterSlide";
import EmojiSlide from "./slides/EmojiSlide";
import ConclusionSlide from "./slides/ConclusionSlide";
import SilenceSlide from "./slides/SilenceSlide";
import SessionSlide from "./slides/SessionSlide";

const StoryView = ({ stats, onReset }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const containerRef = useRef(null);

    const slides = [
        { component: IntroSlide, props: { stats }, duration: 6000 },
        { component: StatsSlide, props: { stats }, duration: 8000 },
        { component: TimeStatsSlide, props: { stats }, duration: 10000 },
        { component: MostActiveDaySlide, props: { stats }, duration: 10000 },
        { component: MostActiveMonthSlide, props: { stats }, duration: 10000 },
        { component: SilenceSlide, props: { stats }, duration: 8000 },
        { component: SessionSlide, props: { stats }, duration: 8000 },
        { component: ResponseTimeSlide, props: { stats }, duration: 8000 },
        { component: MessageLengthSlide, props: { stats }, duration: 8000 },
        {
            component: ConversationStarterSlide,
            props: { stats },
            duration: 8000,
        },
        { component: WordCloudSlide, props: { stats }, duration: 10000 },
        { component: EmojiSlide, props: { stats }, duration: 8000 },
        { component: ConclusionSlide, props: { stats }, duration: 10000 },
    ];

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // Optional: Loop or just stay at end
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleTap = (e) => {
        // Prevent tap navigation if user was swiping
        if (Math.abs(touchEndX.current - touchStartX.current) > 50) {
            return;
        }

        const screenWidth = window.innerWidth;
        if (e.clientX < screenWidth / 3) {
            handlePrev();
        } else {
            handleNext();
        }
    };

    // Touch event handlers for swipe gestures
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
        touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        const diffX = touchStartX.current - touchEndX.current;
        const diffY = touchStartY.current - touchEndY.current;
        const minSwipeDistance = 50;

        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swiped left - go to next
                    handleNext();
                } else {
                    // Swiped right - go to previous
                    handlePrev();
                }
            }
        }

        // Reset values
        touchStartX.current = 0;
        touchStartY.current = 0;
        touchEndX.current = 0;
        touchEndY.current = 0;
    };

    // Detect mobile device
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    const CurrentSlideComponent = slides[currentIndex]?.component;
    const currentProps = slides[currentIndex]?.props;
    const currentDuration = slides[currentIndex]?.duration;

    return (
        <div
            ref={containerRef}
            className="story-view no-select"
            onClick={handleTap}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                position: "relative",
                touchAction: "pan-x pan-y",
                WebkitUserSelect: "none",
                userSelect: "none",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: isMobile ? "1vh 0.5rem" : "2vh 1rem",
                boxSizing: "border-box",
                overscrollBehaviorY: "auto",
                WebkitOverflowScrolling: "touch",
            }}
        >
            <div className="background-animate"></div>
            <div className="noise-overlay"></div>

            {/* Story Progress Header */}
            <div className="story-progress-container">
                {slides.map((_, index) => (
                    <div key={index} className="story-progress-bar-bg">
                        <div
                            className="story-progress-bar-fill"
                            style={{
                                width:
                                    index < currentIndex
                                        ? "100%"
                                        : index === currentIndex
                                          ? "100%"
                                          : "0%",
                                transition:
                                    index === currentIndex
                                        ? `width ${currentDuration}ms linear`
                                        : "none",
                                animation:
                                    index === currentIndex
                                        ? `fillProgress ${currentDuration}ms linear forwards`
                                        : "none",
                            }}
                            // Reset animation by using key if needed, or simple width transition for completed ones
                        ></div>
                        {index === currentIndex && (
                            <style>{`
                                @keyframes fillProgress {
                                    from { width: 0%; }
                                    to { width: 100%; }
                                }
                             `}</style>
                        )}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {CurrentSlideComponent && (
                    <CurrentSlideComponent
                        key={currentIndex}
                        active={true}
                        onNext={handleNext}
                        duration={currentDuration}
                        {...currentProps}
                    />
                )}
            </AnimatePresence>

            {/* Swipe Hint for Mobile - Show only on first slide */}
            {isMobile && currentIndex === 0 && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        background: "rgba(0, 0, 0, 0.6)",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        zIndex: 10,
                        opacity: 0.8,
                        animation: "fadeInOut 3s ease-in-out infinite",
                        pointerEvents: "none",
                    }}
                >
                    👈 Swipe to navigate 👉
                </div>
            )}

            <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.9; }
                }
            `}</style>
        </div>
    );
};

export default StoryView;
