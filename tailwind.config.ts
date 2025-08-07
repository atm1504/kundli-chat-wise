import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					bright: 'hsl(var(--primary-bright))',
					deep: 'hsl(var(--primary-deep))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				'lavender-bliss': {
					DEFAULT: 'hsl(var(--lavender-bliss))',
					foreground: 'hsl(var(--lavender-foreground))',
					bright: 'hsl(var(--lavender-bright))',
					deep: 'hsl(var(--lavender-deep))'
				},
				'peach-glow': {
					DEFAULT: 'hsl(var(--peach-glow))',
					foreground: 'hsl(var(--peach-foreground))'
				},
				'wellness-mint': {
					DEFAULT: 'hsl(var(--wellness-mint))',
					foreground: 'hsl(var(--wellness-mint-foreground))'
				},
				// Cosmic spectrum colors
				'cosmic-blue': 'hsl(var(--cosmic-blue))',
				'cosmic-purple': 'hsl(var(--cosmic-purple))',
				'cosmic-pink': 'hsl(var(--cosmic-pink))',
				'cosmic-cyan': 'hsl(var(--cosmic-cyan))',
				'stellar-white': 'hsl(var(--stellar-white))',
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
				}
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
				'cosmic-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'celestial-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--primary-glow) / 0.6)'
					}
				},
				'mystical-float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'neo-glow': {
					'0%, 100%': {
						boxShadow: 'var(--shadow-neo-glow)',
						opacity: '1'
					},
					'50%': {
						boxShadow: '0 0 80px hsl(var(--primary-bright) / 0.6), 0 0 120px hsl(var(--cosmic-blue) / 0.4)',
						opacity: '0.9'
					}
				},
				'stellar-dance': {
					'0%': {
						transform: 'rotate(0deg) scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'25%': {
						transform: 'rotate(90deg) scale(1.1)',
						filter: 'hue-rotate(90deg)'
					},
					'50%': {
						transform: 'rotate(180deg) scale(1)',
						filter: 'hue-rotate(180deg)'
					},
					'75%': {
						transform: 'rotate(270deg) scale(1.1)',
						filter: 'hue-rotate(270deg)'
					},
					'100%': {
						transform: 'rotate(360deg) scale(1)',
						filter: 'hue-rotate(360deg)'
					}
				},
				'aurora-shimmer': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'quantum-phase': {
					'0%': {
						transform: 'translateX(0) rotateY(0deg)',
						opacity: '1'
					},
					'25%': {
						transform: 'translateX(10px) rotateY(90deg)',
						opacity: '0.7'
					},
					'50%': {
						transform: 'translateX(0) rotateY(180deg)',
						opacity: '1'
					},
					'75%': {
						transform: 'translateX(-10px) rotateY(270deg)',
						opacity: '0.7'
					},
					'100%': {
						transform: 'translateX(0) rotateY(360deg)',
						opacity: '1'
					}
				},
				'cosmic-orb': {
					'0%, 100%': {
						transform: 'scale(1) rotate(0deg)',
						borderRadius: '50%'
					},
					'50%': {
						transform: 'scale(1.2) rotate(180deg)',
						borderRadius: '30%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'cosmic-pulse': 'cosmic-pulse 3s ease-in-out infinite',
				'celestial-glow': 'celestial-glow 2s ease-in-out infinite',
				'mystical-float': 'mystical-float 4s ease-in-out infinite',
				'neo-glow': 'neo-glow 4s ease-in-out infinite',
				'stellar-dance': 'stellar-dance 8s linear infinite',
				'aurora-shimmer': 'aurora-shimmer 6s ease-in-out infinite',
				'quantum-phase': 'quantum-phase 5s ease-in-out infinite',
				'cosmic-orb': 'cosmic-orb 6s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-wellness': 'var(--gradient-wellness)',
				'gradient-lavender': 'var(--gradient-lavender)',
				'gradient-peach': 'var(--gradient-peach)',
				'gradient-mint': 'var(--gradient-mint)',
				'gradient-celestial': 'var(--gradient-celestial)',
				'gradient-mystical': 'var(--gradient-mystical)',
				'gradient-mood': 'var(--gradient-mood)',
				'gradient-wellness-card': 'var(--gradient-wellness-card)'
			},
			boxShadow: {
				'cosmic': 'var(--shadow-cosmic)',
				'celestial': 'var(--shadow-celestial)',
				'golden': 'var(--shadow-golden)',
				'neo-glow': 'var(--shadow-neo-glow)',
				'stellar': 'var(--shadow-stellar)',
				'aurora': 'var(--shadow-aurora)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
