# Royal Lotus — Wedding Invitation Website

A faithful, luxurious clone of the **Royal Lotus (Lotus Courtyard)** wedding invitation website from [SaveOurDate](https://saveourdate.in/templates/royal-lotus/live).

Built with semantic HTML5, pure responsive CSS3, and vanilla modern JavaScript. Completely self-contained with all original high-resolution background themes, royal motifs, ceremony icons, couple photos, and celebratory background music included offline in the `assets/` folder.

---

## ✨ Features Included

1. **Interactive Courtyard Gate**:
   - Realistic pull rope with pointer/touch drag physics, elastic tension, and haptic feedback
   - Golden lamp flicker & cinema flash illumination transition
   - Sequentially revealed wedding details
   - Blooming golden lotus button with glowing radiance & "Skip intro" button
2. **Audio Controller**:
   - Celebratory sitar & flute soundtrack (`assets/audio/music.mp3`)
   - Floating gold music button with spinning animation & play/pause toggle
3. **Falling Golden Petal Shower**:
   - Realistic animated fluttering flower petal shower across the hero section
4. **Hero Invitation**:
   - Regal couple typography: *Siya & Kabir*
   - Indian date unit badges (DEC 14 2026, Monday)
   - Palace venue tag (*The Maharaja Palace*) & RSVP / View Events CTA buttons
5. **A Love Story (Meet the Couple)**:
   - Floating palace trees gliding into view on scroll
   - Custom story narrative, couple hashtag `#SiyaKabir2026`, and ornate peacock medallion
6. **Celebration Journey (Farman Scrolls)**:
   - Royal Farman scrolls that unroll from rolled scrolls into ancient parchment scrolls on scroll
   - 6 ceremonies: Mehendi, Haldi, Sangeet, Shaadi, Reception, and Vidaai
   - Google Maps location links with custom gold map pins
   - Ornate lotus medallion and filigree dividers
7. **Gallery Wall & Modal Lightbox**:
   - 6 couple photographs with hover caption overlays
   - Fullscreen lightbox modal with image captions, previous/next buttons, and keyboard arrow/Esc support
8. **Guest Essentials**:
   - Palace chhatri icon and ornate corner flourishes
   - 4 informational cards: Dress Code, Venue, Stay Options, and Wedding Hashtag
9. **Interactive RSVP Form**:
   - "Joyfully Accept" vs "Regretfully Decline" radio toggle
   - Name, Phone, Email, Guest count selector (1 to 5+), Wishes textarea
   - Validation and royal confirmation feedback
10. **With All Our Love (Footer)**:
    - Sacred cow and royal elephant illustrations
    - Sacred blooming lotus, glowing diya lamp, couple signature, and date line

---

## 🚀 How to Run

### Option 1: Double-Click
Simply open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

### Option 2: Local Web Server
You can launch a lightweight local server using Node.js:
```bash
npm start
# or
npx serve -l 3000 .
```
Then visit `http://localhost:3000` in your browser.

---

## ✏️ Customization Guide

- **Couple Names & Date**: Edit the names and date in `index.html` (search for `Siya` and `14 December 2026`).
- **Events & Times**: Update dates, times, dress codes, and Google Maps URLs in the `<ul class="events__list">` section of `index.html`.
- **Photos**: Replace the photos in `assets/gallery/` (`gallery-1.jpg` through `gallery-6.jpg`) with your own pre-wedding photos.
- **Background Music**: Replace `assets/audio/music.mp3` with your preferred wedding song.
