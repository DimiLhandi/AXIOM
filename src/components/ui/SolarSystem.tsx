import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';

interface BubbleProps {
    logoSrc: string;
    logoAlt: string;
    size: number;
    x: number;
    y: number;
    seed: number;
    colorFilter?: string;
}

function Bubble({ logoSrc, logoAlt, size, x, y, seed, colorFilter }: BubbleProps) {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <div
            className="absolute transition-all duration-100 ease-linear"
            style={{
                width: size,
                height: size,
                left: x - size / 2,
                top: y - size / 2,
            }}
        >
            {/* Drop shadow */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '80%',
                    height: '20%',
                    bottom: '-15%',
                    left: '10%',
                    background: 'radial-gradient(ellipse, rgba(119,52,184,0.5) 0%, transparent 70%)',
                    filter: 'blur(12px)',
                }}
            />

            {/* Outer glow */}
            <div
                className="absolute -inset-4 rounded-full"
                style={{
                    background: isLight
                        ? 'radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 60%)'
                        : 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 60%)',
                    filter: 'blur(20px)',
                }}
            />

            {/* Main bubble - PERFECT CIRCLE with 3D glass effect */}
            <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                    background: isLight
                        ? `
              radial-gradient(circle at 30% 20%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 10%, transparent 30%),
              radial-gradient(circle at 70% 80%, rgba(255,255,255,0.5) 0%, transparent 15%),
              radial-gradient(circle at 50% 50%, 
                rgba(255,255,255,0.25) 0%, 
                rgba(220,200,255,0.15) 20%,
                rgba(180,150,240,0.2) 45%,
                rgba(150,120,220,0.3) 70%,
                rgba(119,52,184,0.35) 100%
              )
            `
                        : `
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 10%, transparent 30%),
              radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 15%),
              radial-gradient(circle at 50% 50%, 
                rgba(255,255,255,0.1) 0%, 
                rgba(167,139,250,0.08) 20%,
                rgba(119,52,184,0.15) 45%,
                rgba(80,40,150,0.25) 70%,
                rgba(50,20,100,0.4) 100%
              )
            `,
                    boxShadow: isLight
                        ? `
              inset -20px -20px 50px rgba(80,40,150,0.25),
              inset 15px 15px 40px rgba(255,255,255,1),
              inset 0 0 60px rgba(255,255,255,0.7),
              0 20px 60px rgba(119,52,184,0.35),
              0 8px 30px rgba(0,0,0,0.15),
              0 0 100px rgba(167,139,250,0.2)
            `
                        : `
              inset -20px -20px 50px rgba(0,0,0,0.7),
              inset 15px 15px 40px rgba(255,255,255,0.5),
              inset 0 0 60px rgba(167,139,250,0.2),
              0 20px 60px rgba(167,139,250,0.5),
              0 10px 40px rgba(0,0,0,0.7),
              0 0 100px rgba(119,52,184,0.4)
            `,
                    backdropFilter: 'blur(15px)',
                    border: isLight
                        ? '2px solid rgba(255,255,255,0.9)'
                        : '2px solid rgba(255,255,255,0.3)',
                }}
            >
                {/* Main specular highlight */}
                <div
                    className="absolute"
                    style={{
                        width: '55%',
                        height: '45%',
                        top: '3%',
                        left: '5%',
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 35%, transparent 65%)',
                        borderRadius: '50%',
                        transform: 'rotate(-30deg)',
                    }}
                />

                {/* Small secondary highlight */}
                <div
                    className="absolute"
                    style={{
                        width: '18%',
                        height: '15%',
                        top: '12%',
                        right: '15%',
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Bottom reflection */}
                <div
                    className="absolute"
                    style={{
                        width: '45%',
                        height: '30%',
                        bottom: '5%',
                        right: '8%',
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 65%)',
                        borderRadius: '50%',
                        transform: 'rotate(20deg)',
                    }}
                />

                {/* Iridescent effect */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(
              from 200deg,
              rgba(255,120,180,0.15) 0deg,
              rgba(255,200,120,0.15) 45deg,
              rgba(180,255,180,0.15) 90deg,
              rgba(120,200,255,0.18) 135deg,
              rgba(200,120,255,0.2) 180deg,
              rgba(255,120,220,0.15) 225deg,
              rgba(255,180,180,0.15) 270deg,
              rgba(255,120,180,0.15) 360deg
            )`,
                        mixBlendMode: 'overlay',
                        opacity: 0.7,
                    }}
                />

                {/* Inner shadow for depth */}
                <div
                    className="absolute inset-4 rounded-full"
                    style={{
                        boxShadow: isLight
                            ? 'inset 0 12px 30px rgba(80,40,150,0.15)'
                            : 'inset 0 12px 30px rgba(0,0,0,0.4)',
                    }}
                />

                {/* Rim light */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        boxShadow: isLight
                            ? 'inset 0 0 5px 3px rgba(255,255,255,1), inset 0 0 20px 8px rgba(200,160,255,0.3)'
                            : 'inset 0 0 5px 3px rgba(255,255,255,0.7), inset 0 0 20px 8px rgba(167,139,250,0.25)',
                    }}
                />

                {/* Logo with 3D rotation */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ perspective: '200px' }}
                >
                    <div
                        className={`animate-spin-3d-${seed}`}
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
                                filter: `${colorFilter || ''} ${isLight
                                    ? 'drop-shadow(3px 4px 8px rgba(119,52,184,0.5))'
                                    : 'drop-shadow(3px 4px 8px rgba(0,0,0,0.7))'}`,
                                opacity: isLight ? 1 : 0.95,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Bubble configuration
const bubbleConfigs = [
    { logoSrc: '/logo_axiom_a.png', logoAlt: 'Axiom IA', size: 110, angleOffset: 0, seed: 1 },
    { logoSrc: 'https://cdn.simpleicons.org/shopify/7734b8', logoAlt: 'Shopify', size: 85, angleOffset: 45, seed: 2 },
    { logoSrc: 'https://cdn.simpleicons.org/prestashop/7734b8', logoAlt: 'PrestaShop', size: 75, angleOffset: 90, seed: 3 },
    { logoSrc: 'https://cdn.simpleicons.org/woocommerce/7734b8', logoAlt: 'WooCommerce', size: 80, angleOffset: 135, seed: 4 },
    { logoSrc: '/logo_chatgpt.png', logoAlt: 'ChatGPT', size: 80, angleOffset: 180, seed: 5, colorFilter: 'invert(22%) sepia(95%) saturate(2619%) hue-rotate(266deg) brightness(87%) contrast(91%)' },
    { logoSrc: 'https://cdn.simpleicons.org/google/7734b8', logoAlt: 'Google', size: 75, angleOffset: 225, seed: 6 },
    { logoSrc: 'https://cdn.simpleicons.org/googlegemini/7734b8', logoAlt: 'Gemini', size: 80, angleOffset: 270, seed: 1 },
    { logoSrc: 'https://cdn.simpleicons.org/perplexity/7734b8', logoAlt: 'Perplexity', size: 75, angleOffset: 315, seed: 2 },
];

// Orbit parameters
const orbitRadiusX = 620;
const orbitRadiusY = 200;
const orbitSpeed = 0.3; // degrees per frame

export default function SolarSystem() {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        let animationId: number;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Update angle based on time (roughly 60fps)
            setAngle(prev => (prev + orbitSpeed * (deltaTime / 16.67)) % 360);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-visible"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '0px',
            }}
        >
            <div className="relative" style={{ width: 0, height: 0 }}>
                {/* Orbit path */}
                <div
                    className="absolute rounded-full border border-purple-500/20"
                    style={{
                        width: orbitRadiusX * 2,
                        height: orbitRadiusY * 2,
                        left: -orbitRadiusX,
                        top: -orbitRadiusY,
                    }}
                />

                {/* Bubbles moving on elliptical orbit */}
                {bubbleConfigs.map((config, idx) => {
                    const bubbleAngle = ((angle + config.angleOffset) * Math.PI) / 180;
                    const x = Math.cos(bubbleAngle) * orbitRadiusX;
                    const y = Math.sin(bubbleAngle) * orbitRadiusY;

                    return (
                        <Bubble
                            key={idx}
                            logoSrc={config.logoSrc}
                            logoAlt={config.logoAlt}
                            size={config.size}
                            x={x}
                            y={y}
                            seed={config.seed}
                            colorFilter={config.colorFilter}
                        />
                    );
                })}
            </div>
        </div>
    );
}
