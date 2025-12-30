
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import IntroSlide from '../features/IntroSlide';
import ActivitySlide from '../features/ActivitySlide';
import ParticipantsSlide from '../features/ParticipantsSlide';
import TimeSlide from '../features/TimeSlide';
import ConversationSlide from '../features/ConversationSlide';
import ConversationStarterSlide from '../features/ConversationStarterSlide';
import WordsSlide from '../features/WordsSlide';
import EmojiSlide from '../features/EmojiSlide';
import ConclusionSlide from '../features/ConclusionSlide';

const WrappedContainer = ({ stats, onReset }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="scroll-wrapper" ref={containerRef}>
      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--accent-color)',
          transformOrigin: '0%',
          zIndex: 100
        }}
      />

      <IntroSlide stats={stats} />
      <ActivitySlide stats={stats} />
      <ParticipantsSlide stats={stats} />
      <TimeSlide stats={stats} />
      <ConversationSlide stats={stats} />
      <ConversationStarterSlide stats={stats} />
      <WordsSlide stats={stats} />
      <EmojiSlide stats={stats} />
      <ConclusionSlide stats={stats} onReset={onReset} />
    </div>
  );
};

export default WrappedContainer;
