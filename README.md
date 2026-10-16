# ⚓ Skipper's Companion

> Your complete guide to safe sailing: VHF radio, navigation, safety, and practical seamanship.

**Skipper's Companion** is an educational PWA (Progressive Web App) for new yacht skippers. It helps compose emergency VHF radio messages and provides comprehensive knowledge base covering all aspects of yacht operations.

🌐 **Live Demo:** [skipper.p4e1.ru](https://skipper.p4e1.ru) *(coming soon)*

---

## ✨ Features

### 📻 VHF Radio Helper
- **Emergency Messages:** MAYDAY, PAN-PAN, MAYDAY RELAY
- **Routine Calls:** Marina contact, vessel-to-vessel communication
- **Speech Synthesis:** Read messages aloud (pronunciation practice)
- **Phonetic Alphabet:** ALPHA, BRAVO, CHARLIE...
- **GPS Integration:** Auto-fill coordinates

### 📚 Knowledge Base (8 Categories)

1. **Navigation & Safety** 🚦
   - Navigation lights & shapes
   - COLREGS (rules of the road)
   - Buoys & marks (IALA A/B)
   - Emergency procedures (MOB, grounding, fire)

2. **Seamanship** ⚓
   - Essential knots (bowline, cleat hitch, etc.)
   - Anchoring techniques
   - Docking & mooring

3. **VHF Radio Guide** 📻
   - Channel reference
   - DSC (Digital Selective Calling)
   - Radio etiquette

4. **Medical & Comfort** 💊
   - Seasickness prevention & treatment
   - First aid essentials

5. **Checklists** ✅
   - Pre-charter inspection (100+ items)
   - Before departure
   - Daily checks
   - Emergency grab bag

6. **Weather** 🌤️
   - Cloud types & meanings
   - Barometer trends
   - Beaufort scale

7. **Navigation Basics** 🧭
   - Chart reading
   - Magnetic vs true course
   - Dead reckoning

8. **Troubleshooting** ⚠️
   - Engine problems
   - Electrical issues

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern browser with PWA support

### Installation

```bash
# Clone repository
git clone https://github.com/ArtemOstrenkov/Skipper_comp.git
cd Skipper_comp

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

Output will be in `dist/` directory.

---

## 🌍 Deployment

**📖 See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions**

### Quick Deploy to Production

```bash
npm run deploy
```

This automatically:
1. Builds production bundle
2. Uploads to https://skipper.p4e1.ru
3. Reloads nginx

**Note**: Requires SSH access to production server. See [DEPLOY.md](./DEPLOY.md) for setup.

### Manual Build

```bash
npm run build    # Creates dist/ folder
npm run preview  # Test production build locally
```

---

## 🌐 Internationalization

Currently supported languages:
- 🇬🇧 English
- 🇷🇺 Russian (Русский)
- 🇨🇳 Chinese (中文)

More languages: DE, ES, FR, IT, NL, SV, NO, HR, CS

---

## 🛠️ Tech Stack

- **Framework:** Vanilla TypeScript (no framework!)
- **Build Tool:** Vite
- **PWA:** vite-plugin-pwa (Workbox)
- **Maps:** Leaflet (OpenStreetMap)
- **Styling:** Custom CSS (Glass Morphism design)
- **i18n:** Custom implementation

---

## 📁 Project Structure

```
src/
├── app.ts                    # Main application logic
├── main.ts                   # Entry point
├── state.ts                  # App state management
├── i18n.ts                   # Translations (core)
├── i18n-extra.ts             # Extended language support
├── knowledge.ts              # Knowledge base index
├── knowledge-*.ts            # Category content files
├── knowledge-types.ts        # Type definitions
├── knowledge-render.ts       # Content rendering
├── gps.ts                    # Geolocation
├── map.ts                    # Leaflet integration
├── messages.ts               # VHF message composer
├── speak.ts                  # Speech synthesis
├── spell.ts                  # Phonetic & coordinates
├── stats.ts                  # Usage statistics
├── theme.ts                  # Dark/light mode
├── units.ts                  # Conversions (ft/m)
├── yachts.ts                 # Yacht database
└── styles/
    └── app.css               # All styles

public/
├── icons/                    # PWA icons
├── yachts/                   # Yacht images
└── comic/                    # Welcome illustrations
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Adding Content

To add new knowledge articles:

1. Edit `src/knowledge-*.ts` (e.g., `knowledge-navigation.ts`)
2. Add article object with content blocks
3. Add translations to `src/i18n.ts`
4. Test in dev server

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Credits

- **Original VHF Panic:** [vhf.p4e1.ru](https://vhf.p4e1.ru)
- **Maps:** OpenStreetMap contributors
- **Icons:** Custom SVG icons
- **Yacht Data:** Various manufacturers

---

## 🐛 Known Issues

None currently reported.

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Visit: [vhf.p4e1.ru](https://vhf.p4e1.ru)

---

## 🔮 Roadmap

- [ ] Add search functionality within knowledge base
- [ ] Favorites system (bookmark articles)
- [ ] Interactive quizzes (test your knowledge)
- [ ] More yacht models database
- [ ] Video demonstrations (knots, procedures)
- [ ] Community tips section
- [ ] Print-friendly checklists (PDF export)
- [ ] iOS/Android native apps (React Native port)

---

**Stay safe on the water! ⛵**
