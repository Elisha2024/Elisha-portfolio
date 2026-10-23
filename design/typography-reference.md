# Reference typography measurements

Reference: https://conrad-otieno-product-designer.netlify.app/
Inspected in Chromium at 1440px and 390px viewport widths on 23 October 2026.

These are getComputedStyle values. External font downloads were still loading during inspection, so these document the reference CSS rather than claiming font delivery or render performance.

| Element | Family | Weight | Desktop size / line height | Tracking | Mobile size / line height |
| --- | --- | --- | --- | --- | --- |
| Hero heading | Montserrat | 600 | 72px / 79.2px | -1.8px | 40px / 44px |
| Hero paragraph | Montserrat | 400 | 20px / 32.5px | normal | 16px / 26px |
| Main CTA | Montserrat | 500 | 14px / 20px | normal | 14px / 20px |
| Selected-work heading | Montserrat | 600 | 48px / 72px | -1.2px | 28px / 42px |
| Project title | Montserrat | 600 | 16px / 22px | normal | 14.4px / 19.8px |
| Navigation | Inter with system fallback | 400 | 16px / 16px | 0.4px | mobile menu differs |

Applied the same family/weight hierarchy to the portfolio, including Montserrat for the hero paragraph and CTA. Main headline and work-heading scales match the desktop reference; mobile adapts at 320px to preserve readability. Project titles stay 18px on phones for this site's longer engineering titles. Inter remains the navigation/form-control font. Native font metadata confirms the bundled Montserrat variable file supports 100–900.
