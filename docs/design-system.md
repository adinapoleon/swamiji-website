# Self-Knowledge design system

## Purpose and constraints

Create a serene, cohesive spiritual coaching website. Preserve every existing text passage, link destination, photograph and the original Sharada Vidya emblem. The emblem file and its presentation are authoritative; the generated concept's placeholder logo must never be implemented. Keep the existing cream, saffron, marigold, charcoal and blue palette. No framework, external fonts, new image assets, or dependencies are needed.

## Shared design

- A centered 1200px container, with responsive 20–40px gutters.
- Georgia serif headings and quotations, system sans-serif body and controls.
- A shared spacing scale: 8, 12, 16, 24, 32, 48, 64 and 96px.
- One hero component across all pages: the original photograph fills the title background, with cream text, a charcoal overlay and a warm divider against the cream body. Shared minimum heights and deliberate focal positioning keep framing consistent; the title can grow when narrow screens require more space. Home has a larger heading and retains both existing actions and its quotation.
- Open editorial sections, equal-height navigation tiles with aligned link baselines, subtle borders, 8px media corners, and restrained shadows.
- Full-width blue closing bands use existing copy and calls to action.
- Consistent sticky navigation, original logo, active-page indication, accessible mobile drawer, and shared footer.
- Clear focus indicators, large touch targets, reduced-motion support and no horizontal overflow.

## Page composition

Home: hero → two-column welcome → three equal navigation tiles → blue closing band.

Story: hero → two narrative chapters beside the existing meditation portrait and quotation → open biography and balanced three-photo gallery.

Guidance: hero → three editorial guidance rows separated by rules → blue closing band.

Journey: hero → numbered practice list beside the existing lily image and explanation → three consistent practice tiles → lake-image reflections introduction → existing four complete testimonials with manual carousel controls. The previous Experiences URL redirects to the reflections section on Journey.

Contact: hero → introductory text beside a spacious, consistently styled request form. Preserve the mailto destination and its explanatory note.

## Implementation and verification plan

1. Record the original HTML and images for preservation checks; inspect the current site in Chrome.
2. Replace conflicting CSS templates with the shared design tokens and components; update all six hero structures and resource versions.
3. Refine page-specific compositions without altering copy. Make drawer visibility/focus management reliable and keep testimonial navigation usable.
4. Test every page in Chrome at 1440px, 768px and 390px, plus a narrow 320px smoke check. Check image loading and framing, overflow, card alignment, navigation, drawer keyboard operation, testimonial controls and form fields. Compare the original and updated text and image inventories, review the diff, and retain screenshot evidence outside the source tree.

## Verification and visual review

Chrome was used directly through the connected browser. All six routes passed at 1440×1000, 768×1024, 390×844 and 320×740: 24 route/viewport combinations. Every content image loaded; there was no horizontal overflow or relevant console error. Hero frames match across all pages within each viewport, and tile heights match within each group. Desktop navigation, the original logo's home link, main call to action, mobile drawer focus/wrapping/Escape, all four testimonials and wraparound, and all five contact fields were exercised. The form action remains the original mailto draft; no email was sent.

The source checks found every original passage, image reference and link destination preserved. All six HTML documents have balanced tag structures and valid local asset paths. JavaScript syntax and git diff whitespace checks passed. Git reports no changes to image files, including the non-negotiable emblem. An independent static review found no remaining material CSS or script issues after contrast and focus fixes.

The initial visual comparison covered heading personality and hierarchy, the cream/blue/saffron palette, section spacing and continuity, navigation and action labels, and the welcome layout. The generated concept was compared using view_image against the Chrome capture, including an additional 1487×1058 viewport corresponding to the concept's dimensions. Intentional refinements: the real emblem replaces the concept placeholder, controls retain the site's sans-serif typography, and accessible button states use the existing darker saffron and marigold. Every above-the-fold content string is preserved; the only new text is a keyboard-only skip link and descriptive image alternatives. No new artwork was shipped.

Following user feedback, all six title sections now use the existing photographs as backgrounds. This removes the repeated right-hand images at the start of Story and makes the title/body transition distinct. Chrome checks at 1440, 768, 390 and 320px confirmed that all six backgrounds load and cover their sections, all title copy fits, and no page overflows horizontally. No relevant console warnings or errors were recorded. Desktop and mobile Story captures were visually reviewed. The logo, photographs and content are unchanged.

Browser capture limitation: Chrome's viewport-only screenshots with an emulated small viewport include extra blank space. Full-page emulated captures were used for responsive visual review, and a normal-size desktop screenshot was used for the handoff. The viewport overrides were reset afterwards.


## Journey consolidation

Path and Experiences are combined in approach.html under the navigation label Journey. Both original page introductions, all practice text, all four complete testimonials and all three photographs are retained. Experiences becomes a section heading rather than a second page title. Desktop and mobile navigation now have a single Journey link, and home links use the new page name. experiences.html forwards to approach.html#reflections, with a manual fallback link. Chrome checks at 1440, 768, 390 and 320px found one H1, four carousel slides, loaded images and no horizontal overflow. All testimonials and wraparound were exercised.
