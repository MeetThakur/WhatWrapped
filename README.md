# WhatsApp Chat Wrapped 💬✨

Transform your WhatsApp chat exports into a stunning, interactive "Spotify Wrapped" style experience. Get deep insights into your conversations with beautiful visualizations and unique analytics.

![WhatsApp Wrapped](https://img.shields.io/badge/WhatsApp-Wrapped-25D366?style=for-the-badge&logo=whatsapp)

## 🌟 Features

### Core Analytics
- **Balance of Power**: Visual comparison of message distribution between participants
- **Response Time Analysis**: Who replies faster? Average response times tracked
- **Time Patterns**: Most active hours and days of the week
- **Word Cloud**: Most frequently used words (with smart stopword filtering)
- **Emoji Analysis**: Top emojis with counts

### Personality Insights
- **The Yapper vs Short & Sweet**: Message length analysis
- **Night Owl vs Early Bird**: Late-night messaging patterns
- **Conversation Starter**: Who initiates chats more often

### Mobile Optimized
- **Responsive Design**: Adapts to all screen sizes (320px to 768px+)
- **Touch Gestures**: Native swipe navigation (swipe left/right for slides)
- **Safe Areas**: Support for notched devices (iPhone X+, Dynamic Island)
- **Performance**: Optimized animations and GPU acceleration
- **iOS Fixes**: Safari bottom bar, no zoom on input, smooth scrolling

### Premium Design
- **Midnight Nebula Theme**: Deep purple/black gradients with glowing effects
- **Glassmorphism UI**: Modern frosted glass cards
- **Smooth Animations**: Slide transitions and floating elements
- **Premium Typography**: Google Fonts (Inter & Outfit)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the webapp directory
cd webapp

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Mobile Testing

For best mobile testing experience:
```bash
# Run dev server
npm run dev

# Access from mobile device on same network
# Use your computer's local IP (e.g., http://192.168.1.100:3000)
```

Or use browser DevTools mobile emulation (F12 → Toggle Device Toolbar)

## 📱 How to Export WhatsApp Chat

### On Android:
1. Open the chat you want to export
2. Tap the three dots (⋮) → **More** → **Export chat**
3. Choose **Without media**
4. Save the `.txt` file

### On iOS:
1. Open the chat you want to export
2. Tap the contact name at the top
3. Scroll down and tap **Export Chat**
4. Choose **Without Media**
5. Save the `.txt` file

## 🎯 Usage

1. **Launch the app** in your browser
2. **Upload your chat file** (drag & drop or click to browse)
3. **Watch the magic happen** as your Wrapped generates
4. **Navigate through slides** by tapping/clicking anywhere
5. **Start over** when you reach the conclusion

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (no frameworks!)
- **Fonts**: Google Fonts (Inter, Outfit)
- **Build Tool**: Vite 4

## 📁 Project Structure

```
wrapped/
├── webapp/
│   ├── src/
│   │   ├── components/
│   │   │   ├── slides/          # Individual slide components
│   │   │   ├── FileUpload.jsx   # File upload component
│   │   │   ├── Slide.jsx        # Base slide wrapper
│   │   │   └── StoryView.jsx    # Main slideshow controller
│   │   ├── styles/              # CSS files
│   │   ├── utils/
│   │   │   ├── analytics.js     # Statistics calculations
│   │   │   └── parser.js        # Chat file parser
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── chat.txt                     # Example chat file
```

## 🎨 Customization

### Adding New Slides
1. Create a new slide component in `src/components/slides/`
2. Import and register it in `StoryView.jsx`
3. Update the `slides` array with your new component

### Modifying Analytics
Edit `src/utils/analytics.js` to add new metrics or modify calculations.

### Theme Customization
Update CSS variables in `src/styles/Theme.css`:
```css
:root {
  --primary: #7000ff;
  --secondary: #00f0ff;
  --accent: #ff0055;
  /* ... more variables */
}
```

## 🔍 Advanced Analytics Explained

- **Response Time**: Calculated based on message gaps < 6 hours between different participants
- **Conversation Starter**: Counts messages sent after a gap of > 6 hours
- **Night Owl Score**: Percentage of messages sent between 11 PM - 5 AM
- **Yapper Score**: Average message length in characters

## 📱 Mobile Optimization

This app is fully optimized for mobile devices with:

- **Swipe Navigation**: Swipe left/right to navigate slides
- **Touch-Friendly UI**: All controls sized for easy tapping (44px minimum)
- **Responsive Typography**: Fluid text sizing with `clamp()` for all screens
- **Safe Area Support**: Content never hidden by notches or home indicators
- **Performance**: Reduced animations and GPU acceleration for 60fps
- **iOS Compatibility**: Full support for Safari, dynamic island, and gesture bars

For detailed mobile optimization documentation, see [docs/MOBILE_OPTIMIZATION.md](docs/MOBILE_OPTIMIZATION.md)

### Supported Devices

- ✅ iPhone SE to iPhone 15 Pro Max
- ✅ All Android devices (360px width and up)
- ✅ Tablets in portrait mode
- ✅ Landscape mode with scrolling

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Inspired by Spotify Wrapped
- Built with modern web technologies
- Designed for privacy - all processing happens in your browser

---

**Made with 💜 by Meet**

*No data is sent to any server - all analysis happens locally in your browser!*
