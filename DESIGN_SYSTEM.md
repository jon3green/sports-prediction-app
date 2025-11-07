# 🎨 LinePointer Design System

## Overview

An Apple-inspired design system that balances simplicity with power. Clean, elegant, and data-driven.

---

## Philosophy

### Core Principles

1. **Simplicity First** - Every element serves a purpose
2. **Data-Driven** - Information-dense but never cluttered
3. **Premium Feel** - Quality over flashiness
4. **Purposeful Animation** - Motion with meaning
5. **Accessibility** - Beautiful for everyone

### The "Apple" Approach

- **Clean Visual Hierarchy** - Clear information flow
- **Subtle Effects** - Premium without being gaudy
- **Consistent Spacing** - Rhythm throughout
- **Refined Colors** - Sophisticated palette
- **Smooth Interactions** - Delightful to use

---

## Color System

### Primary Colors

```css
Primary (Green): #10b981 → #059669
- Actions, success states, wins
- Confidence indicators
- Call-to-action buttons

Premium (Blue-Purple): #3b82f6 → #8b5cf6
- Featured content
- Premium features
- Special highlights

Gold (Yellow-Orange): #fbbf24 → #f59e0b
- Value indicators
- High importance
- Special offers

Danger (Red): #ef4444 → #dc2626
- Warnings, losses
- High risk indicators
- Destructive actions
```

### Neutrals

```css
Background: #000000 (Pure black)
Cards: rgba(255, 255, 255, 0.02-0.05)
Borders: rgba(255, 255, 255, 0.08-0.1)
Text Primary: #ffffff
Text Secondary: #9ca3af
Text Tertiary: #6b7280
```

### Usage Guidelines

- **Green** - Positive outcomes, actions, high confidence
- **Blue** - Information, medium confidence
- **Purple** - Premium features, value bets
- **Yellow/Gold** - Important highlights
- **Red** - Warnings, low confidence
- **Gray** - Neutral information

---

## Typography

### Scale

```css
XL: 5xl-7xl (Hero headlines)
LG: 4xl-5xl (Section titles)
MD: 3xl-4xl (Card headers)
SM: 2xl-3xl (Subsections)
Base: base-lg (Body text)
Small: sm-xs (Captions, labels)
```

### Font Weights

- **Bold (700)** - Headlines, important numbers
- **Semibold (600)** - Subheadings, emphasis
- **Medium (500)** - Body text, labels
- **Regular (400)** - Secondary text

### Best Practices

- Use tabular numbers for stats: `font-mono tabular-nums`
- Maintain proper contrast (WCAG AA minimum)
- Line height: 1.5 for body, 1.2 for headlines
- Letter spacing: tight for headlines, normal for body

---

## Spacing System

### Scale (Tailwind)

```
xs: 2 (8px)
sm: 3 (12px)
md: 4 (16px)
lg: 6 (24px)
xl: 8 (32px)
2xl: 12 (48px)
3xl: 16 (64px)
```

### Component Spacing

- **Card Padding**: 6 (24px)
- **Section Gap**: 8 (32px)
- **Grid Gap**: 6-8 (24-32px)
- **Element Gap**: 3-4 (12-16px)

---

## Components

### Cards

#### Glass Card (Standard)
```css
.glass-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

#### Glass Premium (Featured)
```css
.glass-premium {
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}
```

### Buttons

#### Primary
- Gradient background
- Hover lift effect
- Smooth transitions
- Icon support

#### Secondary
- Outline style
- Hover fill
- Border glow effect

#### Ghost
- Transparent
- Hover background
- Minimal footprint

### Badges

#### Standard
- Small, rounded-full
- Border with transparency
- Icon support

#### Premium
- Gradient background
- Glow effect
- Bold text

### Progress Bars

```tsx
<div className="progress-bar">
  <div className="progress-fill" style={{width: '70%'}} />
</div>
```

---

## Animations

### Transitions

```css
Smooth: cubic-bezier(0.4, 0, 0.2, 1) 300ms
Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55) 500ms
```

### Hover Effects

```css
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.hover-glow:hover {
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### Keyframe Animations

```css
@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes shimmer {
  to { background-position: 200% center; }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Usage Guidelines

- **Hover**: 300ms smooth transition
- **Page Load**: Stagger animations (0.1s delay between items)
- **Data Updates**: Smooth value changes
- **No Auto-play**: User-initiated only

---

## Patterns

### Hero Section

```tsx
<section className="relative overflow-hidden py-20 pb-32">
  {/* Animated Background */}
  <div className="absolute inset-0">
    <div className="floating bg-green-500/10 blur-3xl" />
    <div className="floating bg-blue-500/10 blur-3xl" />
  </div>
  
  {/* Grid Overlay */}
  <div className="absolute inset-0 bg-[grid-pattern]" />
  
  {/* Content */}
  <div className="container relative z-10">
    {/* Hero content */}
  </div>
</section>
```

### Card with Confidence

```tsx
<Card className="glass-premium hover-lift">
  {/* Accent bar */}
  <div className="h-1 bg-gradient-primary" />
  
  {/* Content with badges */}
  <div className="p-6">
    <Badge>High Confidence</Badge>
    {/* Card content */}
  </div>
  
  {/* Progress bar */}
  <div className="progress-bar">
    <div className="progress-fill" />
  </div>
</Card>
```

### Stat Display

```tsx
<div className="stat-card">
  <div className="text-4xl font-bold number-display text-white">
    72-75%
  </div>
  <div className="text-sm text-gray-400">Accuracy</div>
  <div className="text-xs text-green-400">+12% vs baseline</div>
</div>
```

---

## Layout

### Container

```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Grid System

```tsx
{/* Desktop: 2/3 + 1/3 split */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div className="lg:col-span-1">
    {/* Sidebar */}
  </div>
</div>
```

### Responsive Breakpoints

```css
sm: 640px  (Mobile landscape)
md: 768px  (Tablet)
lg: 1024px (Desktop)
xl: 1280px (Large desktop)
2xl: 1536px (Extra large)
```

---

## Data Visualization

### Confidence Levels

```tsx
{/* Visual indicator */}
<Badge className={
  confidence >= 70 ? 'bg-green-500/20 text-green-400' :
  confidence >= 55 ? 'bg-blue-500/20 text-blue-400' :
  'bg-gray-500/20 text-gray-400'
}>
  {confidence}%
</Badge>

{/* Progress bar */}
<div className="progress-bar">
  <motion.div 
    className="progress-fill"
    animate={{ width: `${confidence}%` }}
  />
</div>
```

### Value Indicators

```tsx
{/* Strong value */}
<Badge className="gradient-success">
  <Flame className="w-3 h-3" />
  Hot Pick
</Badge>

{/* Good value */}
<Badge className="bg-purple-500/20 text-purple-300">
  <Sparkles className="w-3 h-3" />
  Value Bet
</Badge>
```

### Number Display

```tsx
{/* Always use tabular-nums for consistency */}
<span className="number-display text-2xl font-bold tabular-nums">
  {value.toFixed(2)}
</span>
```

---

## Icons

### Library: Lucide React

### Usage Guidelines

- **Size**: w-4 h-4 (small), w-5 h-5 (medium), w-6 h-6 (large)
- **Color**: Match text color or use theme colors
- **Spacing**: Add margin for separation
- **Accessibility**: Always meaningful, not decorative

### Common Icons

```tsx
import { 
  TrendingUp,    // Positive trends
  TrendingDown,  // Negative trends
  Target,        // Predictions
  Flame,         // Hot picks
  Sparkles,      // Value
  Award,         // Quality
  Activity,      // Stats
  BarChart3,     // Analytics
} from 'lucide-react';
```

---

## Micro-interactions

### Click Feedback

```tsx
<button className="active:scale-95 smooth-transition">
  Click Me
</button>
```

### Loading States

```tsx
<div className="skeleton h-20 w-full" />
```

### Success Feedback

```tsx
<div className="success-glow border-2 rounded-xl">
  {/* Success content */}
</div>
```

---

## Accessibility

### Focus States

```css
*:focus-visible {
  outline: none;
  ring: 2px solid rgba(16, 185, 129, 0.5);
  ring-offset: 2px;
}
```

### Color Contrast

- All text: Minimum WCAG AA (4.5:1)
- Large text: Minimum WCAG AA (3:1)
- Interactive elements: Clear hover/focus states

### Keyboard Navigation

- All interactive elements tabbable
- Clear focus indicators
- Logical tab order

### Screen Readers

- Semantic HTML
- ARIA labels where needed
- Alt text for images

---

## Best Practices

### DO ✅

- Use glass-morphism for depth
- Maintain consistent spacing
- Add smooth transitions
- Show data visually
- Use purposeful animations
- Keep hierarchy clear
- Test on mobile
- Ensure accessibility

### DON'T ❌

- Overuse animations
- Use too many colors
- Sacrifice readability
- Auto-play videos
- Hide important info
- Use tiny text
- Forget hover states
- Skip mobile testing

---

## Component Checklist

When creating a new component:

- [ ] Uses glass-card or glass-premium
- [ ] Has hover effects (hover-lift, hover-glow)
- [ ] Includes smooth transitions
- [ ] Has proper spacing (p-6 for cards)
- [ ] Uses theme colors consistently
- [ ] Has mobile-responsive design
- [ ] Includes loading states
- [ ] Has proper accessibility
- [ ] Uses Framer Motion for animations
- [ ] Has TypeScript types

---

## Performance

### CSS Best Practices

- Use GPU-accelerated properties (transform, opacity)
- Avoid layout thrashing
- Use will-change sparingly
- Optimize backdrop-filter usage

### Animation Performance

- Prefer CSS animations over JS
- Use transform over position changes
- Batch DOM updates
- Debounce scroll events

---

## Future Improvements

### Planned Additions

- Dark/Light theme toggle
- More data visualization components
- Advanced chart library integration
- Enhanced mobile gestures
- Custom icon set
- Animation presets library

---

## Resources

### Tools

- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev
- **Radix UI**: https://www.radix-ui.com

### Inspiration

- Apple Design Guidelines
- Stripe Design System
- Linear App
- Vercel Design

---

**Built with ❤️ for LinePointer**

*Simple. Powerful. Beautiful.*

