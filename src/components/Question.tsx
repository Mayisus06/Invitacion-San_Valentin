import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import './Question.css';

interface QuestionProps {
  onYes: () => void;
}

const noTexts = ["No", "¿Segura?", "Piénsalo", "Dale", "Porfa 🥺"];

function Question({ onYes }: QuestionProps) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (noButtonRef.current && containerRef.current) {
        const button = noButtonRef.current;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) +
          Math.pow(e.clientY - buttonCenterY, 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(
            buttonCenterY - e.clientY,
            buttonCenterX - e.clientX
          );

          const containerRect = containerRef.current.getBoundingClientRect();
          const moveDistance = 150;
          let newX = buttonCenterX + Math.cos(angle) * moveDistance;
          let newY = buttonCenterY + Math.sin(angle) * moveDistance;

          newX = Math.max(100, Math.min(containerRect.width - 100, newX));
          newY = Math.max(100, Math.min(containerRect.height - 100, newY));

          setNoButtonPos({ x: newX, y: newY });
          setNoTextIndex((prev) => Math.min(prev + 1, noTexts.length - 1));
          setYesScale((prev) => Math.min(prev + 0.15, 2.5));

          for (let i = 0; i < 5; i++) {
            const newParticle = {
              id: particleIdRef.current++,
              x: buttonCenterX,
              y: buttonCenterY,
            };
            setParticles((prev) => [...prev, newParticle]);
            setTimeout(() => {
              setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 1000);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: particleIdRef.current++,
        x: Math.random() * window.innerWidth,
        y: -20,
      };
      setParticles((prev) => [...prev, newParticle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 5000);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="question-container" ref={containerRef}>
      <div className="animated-background">
        <div className="gradient-blob blob1"></div>
        <div className="gradient-blob blob2"></div>
        <div className="gradient-blob blob3"></div>
      </div>

      <div
        className="cursor-follower"
        style={{
          left: mousePos.x,
          top: mousePos.y
        }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        >
          {['💕', '🌹', '✨', '💖'][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      <div className="content">
        <h1 className="title">
          Hey Sohley <Heart className="inline-heart" fill="currentColor" />
        </h1>

        <div className="question-text">
          {Array.from("¿Quieres ser mi San Valentín?").map((char, index) => (
            <span
              key={index}
              className="letter"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div className="buttons-container">
          <button
            className="yes-button"
            onClick={onYes}
            style={{
              transform: `scale(${yesScale})`,
            }}
          >
            <span className="button-text">SÍ</span>
            <div className="button-glow"></div>
            <div className="rotating-border"></div>
          </button>

          <button
            ref={noButtonRef}
            className="no-button"
            style={{
              position: 'absolute',
              left: noButtonPos.x || 'calc(50% + 200px)',
              top: noButtonPos.y || '60%',
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="button-text">{noTexts[noTextIndex]}</span>
          </button>
        </div>
      </div>

      <div className="ambient-hearts">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="ambient-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {['💕', '🌹', '🌸', '✨'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
