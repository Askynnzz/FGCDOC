/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'tag-yellow',
    'tag-green',
    'tag-pink',
    'tag-blue',
    'tag-orange',
    'border-sf-yellow',
    'border-sf-green',
    'border-sf-pink',
    'border-sf-blue',
    'border-sf-orange'
  ],
  theme: {
    extend: {
      colors: {
        // SF Ink & Scroll Palette
        'white': '#111111', // Inverting white to black ink for existing components
        'black': '#F4EBE1', // Inverting black to scroll paper
        
        'bg-primary': '#110E0C', // Outer dark background (dojo/table)
        'bg-scroll': '#F4EBE1', // The scroll paper
        'bg-card': '#EFE4D6', // Slightly darker paper for inner elements
        'bg-card-hover': '#EADDCA',
        
        // Sumi-e Ink Accents
        'sf-yellow': '#A67C00', // Gold ink
        'sf-orange': '#9E2A2B', // Cinnabar Red
        'sf-green': '#285943',  // Dark Jade
        'sf-pink': '#E60012',   // Persona 5 Red (Aggressive Crimson)
        'sf-blue': '#1F3A5C',   // Deep Indigo
        'sf-purple': '#3B1F4F', // Dark Plum
        
        // Text Ink
        'chalk': '#1A1815',     // Wet Black Ink
        'chalk-dim': '#4A443D', // Dry Black Ink
        'stone': '#8B8074',     // Faded Ink
        
        // Frame Data
        'frame-startup': '#A67C00',
        'frame-active': '#9E2A2B',
        'frame-recovery': '#1F3A5C',
      },
      fontFamily: {
        'display': ['"Shojumaru"', '"Permanent Marker"', 'cursive'], // Aggressive brush
        'heading': ['"Cinzel"', 'serif'],
        'marker': ['"Zhi Mang Xing"', 'cursive'], // Chinese brush
        'body': ['"Lora"', 'serif'], // Elegant reading font
      },
      backgroundImage: {
        'scroll-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")",
        'ink-brush': 'linear-gradient(90deg, transparent 0%, rgba(26,24,21,0.8) 20%, rgba(26,24,21,0.9) 50%, rgba(26,24,21,0.8) 80%, transparent 100%)',
        'halftone': 'radial-gradient(circle, #1A1815 1px, transparent 1px)',
        'p5-stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(26,24,21,0.05) 10px, rgba(26,24,21,0.05) 20px)',
      },
      backgroundSize: {
        'halftone': '6px 6px',
      },
      boxShadow: {
        'scroll-drop': '0 0 50px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,0.6)',
        'ink-bleed': '0 4px 15px rgba(26,24,21,0.2)',
      },
      animation: {
        'paint-splash': 'paintSplash 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        paintSplash: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: 0 },
          '70%': { transform: 'scale(1.1) rotate(3deg)', opacity: 1 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
