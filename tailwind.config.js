/** @type {import('tailwindcss').Config} */
import { withUt } from 'uploadthing/tw'

module.exports = withUt({
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1280px'
  		}
  	},
  	extend: {
  		zIndex: {
  			'100': '100'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
				},
				// Brand color palettes
        'brand-black': {
          50: 'hsl(var(--black-50))',
          100: 'hsl(var(--black-100))',
          200: 'hsl(var(--black-200))',
          300: 'hsl(var(--black-300))',
          400: 'hsl(var(--black-400))',
          500: 'hsl(var(--black-500))',
          600: 'hsl(var(--black-600))',
          700: 'hsl(var(--black-700))',
          800: 'hsl(var(--black-800))',
          900: 'hsl(var(--black-900))',
          950: 'hsl(var(--black-950))',
        },
        'brand-purple': {
          50: 'hsl(var(--purple-50))',
          100: 'hsl(var(--purple-100))',
          200: 'hsl(var(--purple-200))',
          300: 'hsl(var(--purple-300))',
          400: 'hsl(var(--purple-400))',
          500: 'hsl(var(--purple-500))',
          600: 'hsl(var(--purple-600))',
          700: 'hsl(var(--purple-700))',
          800: 'hsl(var(--purple-800))',
          900: 'hsl(var(--purple-900))',
          950: 'hsl(var(--purple-950))',
        },
        'brand-green': {
          50: 'hsl(var(--green-50))',
          100: 'hsl(var(--green-100))',
          200: 'hsl(var(--green-200))',
          300: 'hsl(var(--green-300))',
          400: 'hsl(var(--green-400))',
          500: 'hsl(var(--green-500))',
          600: 'hsl(var(--green-600))',
          700: 'hsl(var(--green-700))',
          800: 'hsl(var(--green-800))',
          900: 'hsl(var(--green-900))',
          950: 'hsl(var(--green-950))',
        },
        'brand-white': {
          50: 'hsl(var(--white-50))',
          100: 'hsl(var(--white-100))',
          200: 'hsl(var(--white-200))',
          300: 'hsl(var(--white-300))',
          400: 'hsl(var(--white-400))',
          500: 'hsl(var(--white-500))',
          600: 'hsl(var(--white-600))',
          700: 'hsl(var(--white-700))',
          800: 'hsl(var(--white-800))',
          900: 'hsl(var(--white-900))',
          950: 'hsl(var(--white-950))',
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0.5
          }
        },
        'fade-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements', nocompatible:true})]
})
