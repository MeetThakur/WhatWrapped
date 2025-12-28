# Mobile Development Quick Reference 🚀

A quick guide for developers working on mobile optimizations.

## Quick Commands

```bash
# Start dev server
cd webapp && npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Mobile Testing URLs

```bash
# Local development
http://localhost:3000

# Network access (replace with your IP)
http://192.168.1.100:3000
```

## Common Breakpoints

```css
/* Very small phones */
@media (max-width: 360px) { }

/* Small phones */
@media (max-width: 480px) { }

/* Large phones / small tablets */
@media (max-width: 768px) { }

/* Landscape phones */
@media (max-width: 768px) and (orientation: landscape) { }

/* Tablets */
@media (min-width: 769px) and (max-width: 1024px) { }
```

## Responsive Typography Pattern

```jsx
// Use clamp for fluid typography
fontSize: isMobile 
    ? "clamp(1.5rem, 6vw, 2rem)"  // Mobile: min, fluid, max
    : "2rem"                       // Desktop: fixed

// Alternative: Direct values
fontSize: isMobile ? "1.5rem" : "2rem"
```

## Mobile Detection Hook

```jsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
}, []);
```

## Touch Gesture Implementation

```jsx
const touchStartX = useRef(0);
const touchEndX = useRef(0);

const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
};

const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
            // Swiped left
        } else {
            // Swiped right
        }
    }
};
```

## Safe Area CSS

```css
/* Use in any component */
padding-top: max(20px, calc(var(--safe-top) + 20px));
padding-bottom: max(20px, calc(var(--safe-bottom) + 20px));
padding-left: max(20px, calc(var(--safe-left) + 20px));
padding-right: max(20px, calc(var(--safe-right) + 20px));
```

## Touch-Friendly Sizes

```css
/* Minimum touch target: 44x44px (WCAG 2.1) */
.touch-target {
    min-width: 44px;
    min-height: 44px;
    /* Or 48px for better UX */
}

/* Mobile buttons */
button {
    padding: 0.75rem 1.5rem;
    font-size: 16px; /* Prevents iOS zoom */
}
```

## Performance Optimizations

```css
/* GPU acceleration */
.animated-element {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: transform;
}

/* Reduce animations on mobile */
@media (max-width: 768px) {
    .animated {
        animation-duration: 0.5s; /* Shorter */
    }
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Conditional Rendering Pattern

```jsx
// Hide decorative elements on mobile
{!isMobile && (
    <div className="decorative-element">
        {/* Complex decoration */}
    </div>
)}

// Simplify on mobile
<div style={{
    padding: isMobile ? "1rem" : "2rem",
    fontSize: isMobile ? "0.9rem" : "1.1rem",
    borderRadius: isMobile ? "12px" : "20px",
}}>
```

## iOS-Specific Fixes

```css
/* Safari bottom bar fix */
@supports (-webkit-touch-callout: none) {
    body {
        min-height: -webkit-fill-available;
    }
}

/* Disable default tap highlight */
* {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}

/* Prevent zoom on input focus */
input, select, textarea, button {
    font-size: 16px;
}
```

## Common Mobile Issues & Fixes

### Issue: Content hidden by notch
```css
/* Solution: Use safe area insets */
top: max(10px, calc(env(safe-area-inset-top) + 10px));
```

### Issue: Pull-to-refresh interfering
```css
/* Solution: Disable overscroll */
body {
    overscroll-behavior: none;
}
```

### Issue: Animations laggy
```css
/* Solution: GPU acceleration + reduce complexity */
.element {
    transform: translateZ(0);
    will-change: transform;
}
```

### Issue: Text too small
```jsx
// Solution: Use clamp() or conditional sizing
fontSize: isMobile ? "clamp(1rem, 4vw, 1.5rem)" : "1.5rem"
```

### Issue: Hover effects on touch
```css
/* Solution: Disable hover on touch devices */
@media (hover: none) {
    .element:hover {
        /* Reset hover styles */
    }
}
```

## Testing Checklist

```markdown
- [ ] Test on real device (not just emulator)
- [ ] Test both portrait and landscape
- [ ] Test swipe gestures
- [ ] Check safe areas on notched devices
- [ ] Verify touch targets are 44px minimum
- [ ] Test with slow 3G network
- [ ] Check performance with Chrome DevTools
- [ ] Test accessibility (VoiceOver/TalkBack)
- [ ] Verify no horizontal scroll
- [ ] Check text readability
```

## Browser DevTools Mobile Testing

```
Chrome DevTools:
1. F12 or Cmd+Opt+I
2. Click Toggle Device Toolbar (Cmd+Shift+M)
3. Select device or set custom dimensions
4. Test touch events
5. Throttle network

Safari DevTools (for iOS):
1. Enable on device: Settings > Safari > Advanced > Web Inspector
2. Connect device via USB
3. Safari > Develop > [Device] > [Page]
```

## Useful CSS Variables

```css
:root {
    /* Safe areas */
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --safe-left: env(safe-area-inset-left, 0px);
    --safe-right: env(safe-area-inset-right, 0px);
    
    /* Viewport units (iOS safe) */
    --vh: 1vh;
}
```

## Framer Motion Mobile Settings

```jsx
// Reduce animation complexity on mobile
<motion.div
    animate={{ scale: 1, opacity: 1 }}
    transition={{
        duration: isMobile ? 0.3 : 0.5,
        type: isMobile ? "tween" : "spring"
    }}
>
```

## Chart.js Mobile Config

```javascript
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
        duration: isMobile ? 1000 : 2000
    },
    scales: {
        x: {
            ticks: {
                maxTicksLimit: isMobile ? 4 : 6,
                font: {
                    size: isMobile ? 8 : 10
                }
            }
        }
    }
};
```

## File Structure

```
webapp/src/
├── components/
│   ├── Slide.jsx          # Mobile detection + responsive sizing
│   ├── StoryView.jsx      # Swipe gestures
│   ├── FileUpload.jsx     # Mobile-optimized upload
│   └── slides/            # Each slide has mobile adaptations
├── styles/
│   ├── Theme.css          # Responsive variables + breakpoints
│   ├── global.css         # Mobile base styles
│   └── Slide.css          # Touch controls
└── utils/
    ├── parser.js
    └── analytics.js
```

## Resources

- [MDN - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [CSS Tricks - Responsive Design](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Web.dev - Mobile Performance](https://web.dev/mobile/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

## Quick Tips

1. **Always test on real devices** - Emulators don't catch everything
2. **Use clamp() for fluid typography** - Better than media queries
3. **44px minimum for touch targets** - Prevents fat-finger errors
4. **Disable hover on touch devices** - Use `@media (hover: none)`
5. **GPU acceleration for animations** - Use `transform: translateZ(0)`
6. **Respect safe areas** - Use `env(safe-area-inset-*)`
7. **16px font minimum** - Prevents iOS zoom on focus
8. **Test landscape mode** - Often forgotten but important
9. **Reduce animation complexity** - Mobile has less power
10. **Use will-change sparingly** - Only for active animations

---

**Last Updated**: 2024
**Maintained By**: Meet