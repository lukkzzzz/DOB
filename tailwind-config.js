tailwind.config = {
  theme: {
    extend: {
      colors: {
        'brand-red': 'var(--color-red)',
        'brand-red-dark': 'var(--color-red-dark)',
        'brand-yellow': 'var(--color-yellow)',
        'brand-yellow-dark': 'var(--color-yellow-dark)',
        'brand-blue': 'var(--color-blue)',
        'brand-blue-dark': 'var(--color-blue-dark)',
        'brand-green': 'var(--color-green)',
        'brand-green-dark': 'var(--color-green-dark)',
        'brand-black': 'var(--color-black)',
        'brand-tint': 'var(--color-black-tint)',
        'brand-white': 'var(--color-white)',
        
        // Aliases to catch edge cases smoothly if missed in regex
        border: 'var(--color-black-tint)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'h1': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.25' }],
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.25' }],
        'h3': ['1.375rem', { lineHeight: '1.25' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.7' }],
        'hero-p': ['1.125rem', { lineHeight: '1.7' }],
      }
    }
  }
};
