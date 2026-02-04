import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface FloatingBubbleProps {
    logoSrc?: string;
    logoAlt?: string;
    size?: number;
    seed?: number;  // Unique seed for different trajectory patterns
    initialX?: number;  // Initial X position (0-1 percentage)
    initialY?: number;  // Initial Y position (0-1 percentage)
    containerRef?: React.RefObject<HTMLElement>;
}

/**
 * FloatingBubble - Anti-gravity glassmorphism bubble with smooth organic movement
 * 
 * Features:
 * - Glassmorphism effect with blur, reflections, and soft luminous border
 * - Smooth pseudo-random anti-gravity animation using requestAnimationFrame
 * - Organic movement with Perlin-like noise for natural trajectories
 * - Breathing effect with subtle scale oscillation
 * - Respects prefers-reduced-motion for accessibility
 * - Fully responsive and performant (60fps)
 */
export default function FloatingBubble({
    logoSrc = '/logo_axiom_a.png',
    logoAlt = 'Axiom IA',
    size = 120,
    seed = 1,
    initialX = 0.5,
    initialY = 0.5,
}: FloatingBubbleProps) {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    // Animation state refs (using refs to avoid re-renders)
    const positionRef = useRef({ x: 0, y: 0 });
    const velocityRef = useRef({ x: 0.3 * (seed % 2 === 0 ? 1 : -1), y: 0.2 * (seed % 3 === 0 ? 1 : -1) });
    const timeRef = useRef(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Smooth pseudo-random noise function (simplified Perlin-like)
    const smoothNoise = (t: number, noiseSeed: number): number => {
        const s = seed * 0.7 + noiseSeed;
        return Math.sin(t * 0.0007 + s) * 0.5 +
            Math.sin(t * 0.0013 + s * 2.1) * 0.3 +
            Math.sin(t * 0.0023 + s * 0.7) * 0.2;
    };

    useEffect(() => {
        if (prefersReducedMotion || !bubbleRef.current) return;

        const bubble = bubbleRef.current;
        const parent = bubble.parentElement;
        if (!parent) return;

        // Initialize random starting position
        const updateBounds = () => {
            const parentRect = parent.getBoundingClientRect();
            const maxX = parentRect.width - size - 20;
            const maxY = parentRect.height - size - 20;
            return { maxX, maxY, parentWidth: parentRect.width, parentHeight: parentRect.height };
        };

        let bounds = updateBounds();

        // Set initial position based on props
        positionRef.current = {
            x: bounds.maxX * initialX,
            y: bounds.maxY * initialY,
        };

        // Animation loop using requestAnimationFrame for 60fps smoothness
        const animate = (timestamp: number) => {
            timeRef.current = timestamp;
            bounds = updateBounds();

            // Calculate organic movement using smooth noise
            const noiseX = smoothNoise(timestamp, 1.5);
            const noiseY = smoothNoise(timestamp, 3.7);

            // Update velocity with noise influence (very slow, organic)
            velocityRef.current.x += noiseX * 0.01;
            velocityRef.current.y += noiseY * 0.01;

            // Apply gentle damping to prevent runaway velocity
            velocityRef.current.x *= 0.995;
            velocityRef.current.y *= 0.995;

            // Clamp velocity for smooth movement
            const maxVelocity = 0.8;
            velocityRef.current.x = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current.x));
            velocityRef.current.y = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current.y));

            // Update position
            positionRef.current.x += velocityRef.current.x;
            positionRef.current.y += velocityRef.current.y;

            // Soft boundary collision (smooth bounce, not abrupt)
            const margin = 10;
            if (positionRef.current.x < margin) {
                positionRef.current.x = margin;
                velocityRef.current.x = Math.abs(velocityRef.current.x) * 0.5;
            } else if (positionRef.current.x > bounds.maxX) {
                positionRef.current.x = bounds.maxX;
                velocityRef.current.x = -Math.abs(velocityRef.current.x) * 0.5;
            }

            if (positionRef.current.y < margin) {
                positionRef.current.y = margin;
                velocityRef.current.y = Math.abs(velocityRef.current.y) * 0.5;
            } else if (positionRef.current.y > bounds.maxY) {
                positionRef.current.y = bounds.maxY;
                velocityRef.current.y = -Math.abs(velocityRef.current.y) * 0.5;
            }

            // Calculate breathing effect (subtle scale oscillation)
            const breathingScale = 1 + Math.sin(timestamp * 0.001) * 0.02;

            // Micro-rotation for organic feel
            const rotation = Math.sin(timestamp * 0.0005) * 2;

            // Apply transforms using GPU-accelerated properties
            bubble.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scale(${breathingScale}) rotate(${rotation}deg)`;

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [prefersReducedMotion, size, seed, initialX, initialY]);

    // Reduced motion: static centered position with subtle CSS animation
    if (prefersReducedMotion) {
        return (
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ width: size, height: size }}
            >
                <div
                    className={`w-full h-full rounded-full flex items-center justify-center
            backdrop-blur-xl border
            ${isLight
                            ? 'bg-white/30 border-white/50 shadow-[0_8px_32px_rgba(119,52,184,0.15)]'
                            : 'bg-white/10 border-white/20 shadow-[0_8px_32px_rgba(167,139,250,0.2)]'
                        }`}
                >
                    <img
                        src={logoSrc}
                        alt={logoAlt}
                        className="w-3/4 h-3/4 object-contain"
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={bubbleRef}
            className="absolute z-20 will-change-transform"
            style={{
                width: size,
                height: size,
                top: 0,
                left: 0,
            }}
        >
            {/* Drop shadow for 3D depth */}
            <div
                className="absolute rounded-full"
                style={{
                    width: size * 0.7,
                    height: size * 0.15,
                    bottom: -size * 0.08,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
                    filter: 'blur(4px)',
                }}
            />

            {/* Outer atmospheric glow */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: isLight
                        ? 'radial-gradient(circle at 30% 30%, rgba(167,139,250,0.2) 0%, transparent 60%)'
                        : 'radial-gradient(circle at 30% 30%, rgba(167,139,250,0.15) 0%, transparent 60%)',
                    transform: 'scale(1.15)',
                    filter: 'blur(8px)',
                }}
            />

            {/* Main 3D bubble sphere */}
            <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                    background: isLight
                        ? `
                            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, transparent 25%),
                            radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 20%),
                            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(167,139,250,0.05) 50%, rgba(119,52,184,0.1) 100%)
                        `
                        : `
                            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6) 0%, transparent 25%),
                            radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 20%),
                            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(167,139,250,0.03) 50%, rgba(119,52,184,0.08) 100%)
                        `,
                    boxShadow: isLight
                        ? `
                            inset -8px -8px 20px rgba(119,52,184,0.15),
                            inset 4px 4px 15px rgba(255,255,255,0.9),
                            inset 0 0 30px rgba(255,255,255,0.3),
                            0 8px 32px rgba(119,52,184,0.2),
                            0 2px 8px rgba(0,0,0,0.1)
                        `
                        : `
                            inset -8px -8px 20px rgba(0,0,0,0.4),
                            inset 4px 4px 15px rgba(255,255,255,0.3),
                            inset 0 0 30px rgba(167,139,250,0.1),
                            0 8px 32px rgba(167,139,250,0.3),
                            0 4px 16px rgba(0,0,0,0.4)
                        `,
                    backdropFilter: 'blur(8px)',
                }}
            >
                {/* Primary specular highlight - top left */}
                <div
                    className="absolute"
                    style={{
                        width: '45%',
                        height: '35%',
                        top: '8%',
                        left: '12%',
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 40%, transparent 70%)',
                        borderRadius: '50%',
                        transform: 'rotate(-20deg)',
                    }}
                />

                {/* Secondary smaller highlight */}
                <div
                    className="absolute"
                    style={{
                        width: '20%',
                        height: '15%',
                        top: '18%',
                        left: '55%',
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Bottom-right subtle reflection (environment reflection) */}
                <div
                    className="absolute"
                    style={{
                        width: '30%',
                        height: '20%',
                        bottom: '15%',
                        right: '10%',
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)',
                        borderRadius: '50%',
                        transform: 'rotate(30deg)',
                    }}
                />

                {/* Iridescent rainbow effect - subtle color shift */}
                <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                        background: `
                            linear-gradient(
                                135deg,
                                transparent 0%,
                                rgba(255,100,100,0.1) 20%,
                                rgba(255,255,100,0.1) 35%,
                                rgba(100,255,100,0.1) 50%,
                                rgba(100,255,255,0.1) 65%,
                                rgba(100,100,255,0.1) 80%,
                                transparent 100%
                            )
                        `,
                        mixBlendMode: 'overlay',
                    }}
                />

                {/* Inner depth shadow - creates 3D hollow effect */}
                <div
                    className="absolute inset-2 rounded-full"
                    style={{
                        background: isLight
                            ? 'radial-gradient(circle at 60% 60%, transparent 30%, rgba(119,52,184,0.08) 70%, rgba(119,52,184,0.15) 100%)'
                            : 'radial-gradient(circle at 60% 60%, transparent 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.3) 100%)',
                    }}
                />

                {/* Rim light effect - edge glow */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'transparent',
                        boxShadow: isLight
                            ? 'inset 0 0 2px 1px rgba(255,255,255,0.8), inset 0 0 8px 2px rgba(167,139,250,0.2)'
                            : 'inset 0 0 2px 1px rgba(255,255,255,0.4), inset 0 0 8px 2px rgba(167,139,250,0.15)',
                    }}
                />

                {/* Logo container - centered with 3D rotation */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        perspective: '200px',
                        perspectiveOrigin: 'center center',
                    }}
                >
                    <div
                        className={`animate-spin-3d-${seed > 6 ? (seed % 6) + 1 : seed}`}
                        style={{
                            transformStyle: 'preserve-3d',
                            width: '50%',
                            height: '50%',
                        }}
                    >
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            className="w-full h-full object-contain"
                            style={{
                                filter: isLight
                                    ? 'drop-shadow(1px 2px 3px rgba(119,52,184,0.3))'
                                    : 'drop-shadow(1px 2px 3px rgba(0,0,0,0.5))',
                                opacity: isLight ? 0.9 : 0.85,
                                backfaceVisibility: 'visible',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
