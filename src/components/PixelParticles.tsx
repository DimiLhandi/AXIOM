import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface PixelParticlesProps {
    className?: string;
}

export default function PixelParticles({ className = '' }: PixelParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;

        // Set canvas size
        const resizeCanvas = () => {
            if (!canvas) return;
            canvasWidth = canvas.offsetWidth;
            canvasHeight = canvas.offsetHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            baseHue: number;
            hue: number;
            alpha: number;
            pulseSpeed: number;
            pulseOffset: number;

            constructor() {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.size = Math.random() * 3 + 1;
                this.baseHue = 270 + Math.random() * 30; // Purple range (270-300)
                this.hue = this.baseHue;
                this.alpha = Math.random() * 0.5 + 0.1;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update(time: number, waveOffset: number) {
                // Wave effect - from black to purple to black
                const waveProgress = Math.sin(time * 0.001 + this.y * 0.005 + waveOffset) * 0.5 + 0.5;

                // Vibration effect
                const vibration = Math.sin(time * this.pulseSpeed + this.pulseOffset);

                // Color transitions: black -> purple -> light purple -> black
                this.hue = 270 + vibration * 20; // Shift between purple shades
                this.alpha = 0.1 + waveProgress * 0.6 * (0.5 + vibration * 0.5);

                // Slight position vibration
                this.x += Math.sin(time * 0.002 + this.pulseOffset) * 0.3;
                this.y += Math.cos(time * 0.002 + this.pulseOffset) * 0.2;

                // Wrap around
                if (this.x < 0) this.x = canvasWidth;
                if (this.x > canvasWidth) this.x = 0;
                if (this.y < 0) this.y = canvasHeight;
                if (this.y > canvasHeight) this.y = 0;
            }

            draw(isLightMode: boolean) {
                if (!ctx) return;

                // Adjust alpha for light mode (make particles more visible)
                const adjustedAlpha = isLightMode ? this.alpha * 1.5 : this.alpha;

                // Pixelated square shape
                ctx.fillStyle = `hsla(${this.hue}, 70%, ${isLightMode ? '50%' : '60%'}, ${adjustedAlpha})`;
                ctx.fillRect(
                    Math.floor(this.x / 2) * 2,
                    Math.floor(this.y / 2) * 2,
                    this.size,
                    this.size
                );

                // Glow effect for brighter particles
                if (this.alpha > 0.4) {
                    ctx.shadowBlur = isLightMode ? 15 : 10;
                    ctx.shadowColor = `hsla(${this.hue}, 80%, ${isLightMode ? '60%' : '70%'}, ${adjustedAlpha * 0.5})`;
                    ctx.fillRect(
                        Math.floor(this.x / 2) * 2,
                        Math.floor(this.y / 2) * 2,
                        this.size,
                        this.size
                    );
                    ctx.shadowBlur = 0;
                }
            }
        }

        // Create particles
        const particleCount = Math.floor((canvasWidth * canvasHeight) / 8000);
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationId: number;
        const startTime = Date.now();
        const isLightMode = theme === 'light';

        const animate = () => {
            const time = Date.now() - startTime;

            // Clear with fade effect - different for light/dark mode
            if (isLightMode) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            }
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Wave offset that moves down
            const waveOffset = time * 0.0005;

            particles.forEach(particle => {
                particle.update(time, waveOffset);
                particle.draw(isLightMode);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ opacity: theme === 'light' ? 0.8 : 0.7 }}
        />
    );
}
