"use client"

import * as React from "react"

// Pixel class with wave-like organic movement
class Pixel {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    baseY: number
    color: string
    speed: number
    size: number
    minSize: number
    maxSize: number
    isReverse: boolean
    waveOffset: number
    waveSpeed: number
    waveAmplitude: number

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        color: string,
        speed: number,
        waveOffset: number,
    ) {
        this.ctx = context
        this.x = x
        this.y = y
        this.baseY = y
        this.color = color
        this.speed = (Math.random() * 0.6 + 0.2) * speed
        this.size = Math.random() * 1.5 + 0.5
        this.minSize = 0.3
        this.maxSize = Math.random() * 1.5 + 1
        this.isReverse = Math.random() > 0.5
        this.waveOffset = waveOffset
        this.waveSpeed = 0.02 + Math.random() * 0.01
        this.waveAmplitude = 0.3 + Math.random() * 0.4
    }

    draw(time: number) {
        // Wave-like movement - pixels pulse with a wave pattern
        const waveValue = Math.sin(time * this.waveSpeed + this.waveOffset) * this.waveAmplitude
        const displaySize = Math.max(0, this.size + waveValue)

        this.ctx.fillStyle = this.color
        this.ctx.fillRect(
            this.x,
            this.y,
            displaySize,
            displaySize,
        )
    }

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true
        } else if (this.size <= this.minSize) {
            this.isReverse = false
        }

        if (this.isReverse) {
            this.size -= this.speed
        } else {
            this.size += this.speed
        }
    }
}

export interface PixelBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    gap?: number
    speed?: number
    colors?: string[]
    opacity?: number
}

export function PixelBackground({
    gap = 12,
    speed = 30,
    colors = ["#1a1a1a", "#2d1f3d", "#7734b8", "#5b2690", "#0a0a0a", "#151515"],
    opacity = 0.6,
    className,
    children,
    style,
    ...props
}: PixelBackgroundProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const pixelsRef = React.useRef<Pixel[]>([])
    const animationRef = React.useRef<number | null>(null)
    const timeRef = React.useRef<number>(0)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const actualSpeed = reducedMotion ? 0 : speed * 0.001

        let timePrevious = performance.now()
        const timeInterval = 1000 / 60

        const createPixels = () => {
            pixelsRef.current = []
            const rect = container.getBoundingClientRect()
            if (rect.width === 0 || rect.height === 0) return

            const dpr = window.devicePixelRatio || 1
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            canvas.style.width = `${rect.width}px`
            canvas.style.height = `${rect.height}px`

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(dpr, dpr)

            for (let x = 0; x < rect.width; x += gap) {
                for (let y = 0; y < rect.height; y += gap) {
                    const color = colors[Math.floor(Math.random() * colors.length)]
                    // Wave offset based on position for organic wave effect
                    const waveOffset = (x + y) * 0.05
                    pixelsRef.current.push(new Pixel(ctx, x, y, color, actualSpeed, waveOffset))
                }
            }
        }

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate)

            const timeNow = performance.now()
            const timePassed = timeNow - timePrevious

            if (timePassed < timeInterval) return
            timePrevious = timeNow - (timePassed % timeInterval)

            if (!ctx || pixelsRef.current.length === 0) return

            timeRef.current += 1

            const rect = container.getBoundingClientRect()
            ctx.clearRect(0, 0, rect.width, rect.height)

            for (const pixel of pixelsRef.current) {
                pixel.shimmer()
                pixel.draw(timeRef.current)
            }
        }

        // Initialize after a small delay to ensure DOM is ready
        const initTimeout = setTimeout(() => {
            createPixels()
            animate()
        }, 50)

        // Handle resize
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                createPixels()
            })
        })
        resizeObserver.observe(container)

        return () => {
            clearTimeout(initTimeout)
            resizeObserver.disconnect()
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [gap, speed, colors])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                backgroundColor: '#000',
                ...style
            }}
            {...props}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    opacity: opacity,
                    zIndex: 0,
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    )
}
