

# King Armour Website Duplicate - Implementation Plan

## Project Overview
Create an exact duplicate of the **King Armour Family Office** website (king-armour.com) in the Lovable ecosystem. This is a premium, luxury family office website featuring a sophisticated dark purple/gold color scheme, elegant typography, and smooth animations.

---

## 1. Design System & Theme Setup

### Color Palette (Exact Match)
- **Primary Dark Purple**: `#1a1625` (deep purple/navy - header background)
- **Accent Gold**: `#c9a962` (warm gold - accent text, highlights)
- **Background Light**: `#f5f3f0` (cream/beige - content sections)
- **Text Dark**: `#2c2540` (dark purple-gray - body text)
- **Text Light**: `#ffffff` (white - header text)
- **Border Gold**: `#c9a962` (gold left border on headings)

### Typography
- **Headings**: Serif font (similar to "Cormorant Garamond" or "Playfair Display") - elegant, classic
- **Body Text**: Sans-serif font (similar to "Inter" or "Montserrat") - clean, readable
- **Font weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 800 (bold)

### Design Elements
- Large hero sections with full-width background images
- Purple/magenta gradient overlays on hero images (75% opacity multiply blend)
- Rounded corners on cards (lg radius ~16px)
- Gold left border accent on page titles
- Generous padding and spacing (luxury feel)

---

## 2. Global Components

### Header/Navigation
- **Fixed sticky header** with transparent background
- **Logo**: Golden crest/shield logo (left side)
- **Navigation menu** (right side):
  - ABOUT US (dropdown with Home, History links)
  - HISTORY
  - SERVICES
  - KINGS NETWORK (dropdown)
- **Dropdown menus** with smooth animation
- **Mobile hamburger menu** (off-canvas slide-in)
- Smooth scroll behavior

### Footer
- Minimal footer design
- Cookie/GDPR consent functionality
- Back to top button

---

## 3. Page Implementations

### Page 1: Home (/)
**Hero Section**
- Full-viewport height with Hong Kong skyline background image
- Purple gradient overlay with animated noise/grain texture
- Large "King Armour" heading with gold left border accent
- Tagline: "Your Family's Strategic Ally" in gold

**Welcome Section**
- Heading: "Fortify Your Growth, Armour Your Assets, Unite Generations"
- Two paragraphs of introductory text
- Light cream background

**Feature Cards Grid (3 columns)**
- **ABOUT US** card - Dark navy background, gold accent text
- **HISTORY** card - Gold/accent background
- **OUR SERVICES** card - Gold/accent background
- **KINGS NETWORK** card - Dark purple background
- Each card with image, title, subtitle, "Learn more" link
- Rounded corners, hover animations

**Company Info Section**
- Large image with scroll parallax effect
- Extended description text about King Armour

**Research & Technology Section**
- Stats counters with animation ($500+, 20+ years)
- Image carousel (3 images)
- Three numbered feature blocks:
  1. Research & Development
  2. Precision Testing Analysis
  3. Scalable Production Delivery
- Horizontal dividers between sections

---

### Page 2: History (/history)
**Hero Section**
- Full-width hero with background image
- "History" title with gold left border
- Subtitle: "From 1957 to the Future"

**Main Content**
- "From 1957 to the Future" heading
- History text about Sunwah Group legacy
- Image with rounded corners

**Global Connections Section**
- Dr. Jonathan Choi section
- Global influence and partnerships

**Global Growth Section**
- Geographic expansion details
- Large parallax image

**Research & Technology Section** (reusable component)
- Same as homepage

---

### Page 3: Services (/services)
**Hero Section**
- Shanghai Bund cityscape background
- "Our Services" title
- Subtitle: "Fortify, Grow, Succeed"

**Introduction Section**
- Overview text
- Two portrait images (rounded)

**Family Council Section**
- 4 service cards:
  - Charity & Philanthropy
  - Wealth Planning
  - Education
  - Family Governance

**Investments Section**
- 4 service cards:
  - Wealth Management
  - Tax Planning
  - Alternative Investments
  - Trust and Corporate Services
- Two additional images

**Research & Technology Section** (reusable)

---

### Page 4: Kings Network (/kings-network)
**Hero Section**
- Network/connections abstract background
- "Kings Network" title
- Subtitle: "Elite Connections, Exclusive Access"

**Introduction Section**
- Overview of the Kings Network
- Two portrait images

**Quarterly Members Only Events**
- Event cards:
  - Car Racing Meetup
  - Exclusive Lunch Meetings
  - Yacht Events
  - Art Collections/Auctions
  - Delegation Trips
  - Innovation Summits
  - Legacy Wine Tastings

**Global Elite Summer Program**
- Four program pillars:
  - Social
  - Charity
  - Informational
  - Mentorship
- Two additional images

**Exclusive Network Access Section**

**Research & Technology Section** (reusable)

---

### Page 5: Contact Form (integrated)
**Functional contact form with:**
- Name field (validated)
- Email field (validated)
- Message/inquiry textarea
- Submit button with loading state
- Success/error toast notifications
- **Backend**: Edge function to send emails via Resend API

---

## 4. Animations & Interactions (Framer Motion)

### Scroll Animations
- Fade-in-up on scroll for content sections
- Staggered animations for card grids
- Counter animations (counting up numbers)

### Parallax Effects
- Hero section background parallax
- Image zoom on scroll (1x to 1.25x scale)
- Horizontal scroll reveal for gallery sections

### Hover Effects
- Cards: subtle lift and shadow
- Buttons: underline animation
- Links: smooth color transitions
- Images: subtle scale on hover

### Page Transitions
- Smooth fade between page navigation
- Scroll to top on route change

### Interactive Elements
- Image lightbox/gallery viewer
- Carousel for image galleries
- Accordion for expandable content (if needed)

---

## 5. Images & Assets

### Images to Include
All images will be downloaded from the original site and stored locally:

**Hero Backgrounds:**
- Hong Kong skyline (home)
- Solid purple gradient (history)
- Shanghai Bund (services)
- Abstract network pattern (kings network)

**Portrait/Content Images:**
- KingArmour800-12 (533x533)
- KingArmour800-33 (533x533)
- KingArmour800-38 (800x400)
- KingArmour1920-30 (1280x1280)
- KingArmour800-23 (services)
- KingArmour800-28 (services)
- KingArmour800-16 (services)
- KingArmour800-35 (services)
- KingArmour800-41 (network)
- KingArmour800-59 (network)
- KingArmour800-46 (network)
- KingArmour800-21 (network)

**Logo:**
- King Armour golden crest logo (header)

---

## 6. Responsive Design

### Desktop (1200px+)
- Full 3-column layouts
- Large hero sections
- Horizontal navigation
- Full image galleries

### Tablet (768px - 1199px)
- 2-column layouts for cards
- Maintained hero proportions
- Collapsed navigation where appropriate

### Mobile (< 768px)
- Single column layouts
- Off-canvas hamburger menu
- Stacked content sections
- Touch-friendly interactions
- Optimized image sizes

---

## 7. Backend Requirements

### Contact Form Integration
- **Supabase Edge Function** for email sending
- **Resend API** integration for email delivery
- Form validation (client + server)
- Spam protection (honeypot field)

### Required Secrets
- `RESEND_API_KEY` - for sending contact form emails

---

## 8. Dependencies to Add

```json
{
  "framer-motion": "^11.x",
  "react-intersection-observer": "^9.x",
  "embla-carousel-react": "already installed"
}
```

---

## 9. Implementation Phases

### Phase 1: Foundation
- Design system setup (colors, typography, CSS variables)
- Global layout components (Header, Footer)
- Responsive navigation with mobile menu

### Phase 2: Home Page
- Hero section with parallax
- Feature cards grid
- Company info section
- Research & Technology section (reusable)

### Phase 3: Inner Pages
- History page
- Services page
- Kings Network page
- All with consistent styling

### Phase 4: Animations
- Framer Motion integration
- Scroll animations
- Hover effects
- Page transitions

### Phase 5: Contact Form & Backend
- Contact form component
- Edge function for email
- Resend integration
- Form validation

### Phase 6: Polish & Testing
- Cross-browser testing
- Mobile responsiveness verification
- Performance optimization
- Final styling adjustments

---

## Expected Outcome
A pixel-perfect replica of king-armour.com with:
- ✅ Identical visual design and color scheme
- ✅ All 4 main pages fully implemented
- ✅ Smooth Framer Motion animations
- ✅ Fully responsive design (mobile + tablet + desktop)
- ✅ Functional contact form with email notifications
- ✅ All original images integrated
- ✅ Professional, luxury user experience

