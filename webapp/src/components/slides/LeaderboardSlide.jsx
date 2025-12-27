import React, { useMemo } from 'react';
import Slide from '../Slide';
import { getTopParticipants } from '../../utils/analytics';

const LeaderboardSlide = ({ active, onNext, stats }) => {
    const topParticipants = useMemo(() => getTopParticipants(stats), [stats]);

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <h2 style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}>The Chatterboxes</h2>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {topParticipants.slice(0, 5).map((p, i) => (
                    <div key={p.name} className="content-section" style={{
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transform: `scale(${1 - (i * 0.05)})`,
                        opacity: 1 - (i * 0.1)
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: i === 0 ? '#ffd700' : 'inherit' }}>#{i + 1}</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{p.name}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{p.count.toLocaleString()}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>msgs</div>
                        </div>
                    </div>
                ))}
            </div>
        </Slide>
    );
};

export default LeaderboardSlide;
