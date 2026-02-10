import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import './YesResponse.css';

interface Confetti {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  color: string;
  emoji?: string;
}

function YesResponse() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [displayText, setDisplayText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const confettiIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const fullText = '¡Sabía que dirías que sí!';

  useEffect(() => {
    document.body.classList.add('celebration');

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowSubtitle(true), 500);
      }
    }, 80);

    return () => {
      clearInterval(typingInterval);
      document.body.classList.remove('celebration');
    };
  }, []);

  useEffect(() => {
    const createConfetti = () => {
      const newConfetti: Confetti[] = [];
      const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#8b5cf6', '#ec4899', '#f97316'];
      const emojis = ['💕', '💖', '💗', '💓', '💝', '🌹', '🌸', '🌺', '🌷'];

      for (let i = 0; i < 10; i++) {
        newConfetti.push({
          id: confettiIdRef.current++,
          x: Math.random() * window.innerWidth,
          y: -20,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          emoji: Math.random() > 0.5 ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
        });
      }

      setConfetti((prev) => [...prev, ...newConfetti]);
    };

    const confettiInterval = setInterval(createConfetti, 100);

    const animate = () => {
      setConfetti((prev) => {
        return prev
          .map((c) => ({
            ...c,
            x: c.x + c.vx,
            y: c.y + c.vy,
            rotation: c.rotation + 5,
            vy: c.vy + 0.1,
          }))
          .filter((c) => c.y < window.innerHeight + 100);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(confettiInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleTripleClick = () => {
      const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#8b5cf6', '#ec4899', '#f97316'];
      const emojis = ['💕', '💖', '💗', '💓', '💝', '🌹', '🌸', '🌺', '🌷'];
      const burst: Confetti[] = [];

      for (let i = 0; i < 100; i++) {
        const angle = (Math.PI * 2 * i) / 100;
        burst.push({
          id: confettiIdRef.current++,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: Math.cos(angle) * (Math.random() * 10 + 5),
          vy: Math.sin(angle) * (Math.random() * 10 + 5),
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        });
      }

      setConfetti((prev) => [...prev, ...burst]);
    };

    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;

    const handleClick = () => {
      clickCount++;
      clearTimeout(clickTimer);

      if (clickCount === 3) {
        handleTripleClick();
        clickCount = 0;
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="yes-response-container">
      <div className="animated-background-yes">
        <div className="gradient-pulse pulse1"></div>
        <div className="gradient-pulse pulse2"></div>
        <div className="gradient-pulse pulse3"></div>
      </div>

      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: c.x,
            top: c.y,
            transform: `rotate(${c.rotation}deg)`,
            backgroundColor: c.emoji ? 'transparent' : c.color,
          }}
        >
          {c.emoji || ''}
        </div>
      ))}

      <div className="fireworks">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="firework"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="content-yes">
        <div className="massive-heart">
          <Heart className="heart-icon" fill="currentColor" />
          <div className="heart-glow"></div>
          <div className="orbiting-particles">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="orbit-particle"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-150px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </div>

        <div className="response-text">
          {displayText.split('').map((char, index) => (
            <span
              key={index}
              className="response-letter"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {showSubtitle && (
          <div className="subtitle-text">
            Seremos el mejor San Valentín 💕
          </div>
        )}
      </div>

      <div className="light-rays">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="light-ray"
            style={{
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default YesResponse;
