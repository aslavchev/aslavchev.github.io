# Apple-Level UX Fixes for iPhone SE and Mobile

## Issues Found:

### 1. Typography Scale (iPhone SE 375px)
- Hero h1: `text-5xl` = 48px too large, wraps badly
- Card titles: `text-lg` = 18px too small, hard to read
- Body text: `text-sm` = 14px acceptable but needs better contrast

### 2. Text Contrast
- `text-muted-foreground` = too dim on dark mode
- `text-muted-foreground/80` = even worse
- Need: `text-foreground/90` minimum

### 3. Layout Issues
- Badges compete with titles horizontally (cramped on SE)
- Metric text floats disconnected from content
- Ghost buttons have no visual weight

### 4. Spacing
- `space-y-2` too tight for bullet lists
- Card padding not responsive to screen size

### 5. Missing Content
- No LinkedIn in navigation
- No tech stack on featured projects
- Accessibility warning on mobile menu

## Fixes to Apply:

### Experience Cards:
- Title: `text-lg sm:text-xl md:text-2xl` (18px → 20px → 24px)
- Badge: Move to separate row on mobile
- Spacing: `space-y-4 sm:space-y-3`
- Contrast: `text-foreground/85` for description

### Featured Projects:
- Title: `text-xl sm:text-2xl` (20px → 24px)
- Show top 4 tech badges
- Solid primary button (not ghost)
- Metric moves below buttons
- Contrast: `text-foreground/80`

### Case Studies:
- Title: `text-2xl sm:text-3xl font-bold` (24px → 30px)
- "Technologies" section header
- Contrast: `text-foreground/80`
- Spacing: `space-y-5`

### Navigation:
- Add LinkedIn to CONNECT section
- Fix accessibility warning with aria-describedby

### Color System:
- Primary text: `text-foreground` or `text-foreground/90`
- Secondary text: `text-foreground/75`
- Muted text: `text-foreground/60` (labels only)
- Never use `text-muted-foreground` for body content
