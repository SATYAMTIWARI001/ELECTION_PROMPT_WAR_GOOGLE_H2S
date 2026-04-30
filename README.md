# Interactive Election Process Assistant

An interactive, educational web application designed to guide users through the complexities of the election process, from the initial announcement to the formation of the government.

Built for the **Google Prompt Solution Challenge**.

## Chosen Vertical
**Civics & Governance / Education**  
The goal of this project is to democratize knowledge about how elections work globally, empowering voters with easy-to-digest, interactive information. By demystifying the democratic process, it encourages informed civic participation.

## Approach and Logic
The application is designed as a single-page Interactive Assistant with five core functional tabs:

1. **Election Timeline**: A visual, chronological representation of the 7 main phases of an election.
2. **Step by Step**: Deep-dive interactive cards expanding on specific mechanics of the election cycle.
3. **Country Comparison**: A responsive data table highlighting the differences in electoral systems across India, Germany, USA, Australia, UK, and France.
4. **Test Yourself**: A state-driven interactive quiz that evaluates the user's understanding and provides immediate feedback.
5. **Glossary**: A searchable index of complex civic terminology simplified for the general public.

### Technical Implementation
- **Zero-Dependency Architecture**: Built using pure Vanilla HTML, CSS, and JavaScript to ensure maximum performance, immediate load times, and a footprint well under the 10 MB limit (currently ~50KB).
- **CSS View Transitions API**: Leverages modern browser capabilities (`document.startViewTransition()`) to provide native, smooth cross-fade animations when switching between tabs without heavy JS animation libraries.
- **Glassmorphism Design**: Utilizes CSS backdrop filters and smooth gradient typography to create a premium, modern user interface.
- **Dual AI Panel Integration**: Every section features context-aware "Ask Claude" and "Ask Gemini" action chips. These chips launch dynamic modals that provide users with highly specific prompts to copy and paste into their AI of choice, acting as a bridge to deeper conversational learning.

## How the Solution Works
1. Open `index.html` in any modern web browser.
2. Navigate through the top tabs to access different learning modules.
3. Interact with the Step-by-Step cards to expand details.
4. Use the dynamic Search Bar in the Glossary to filter terms instantly.
5. Click the "Ask Claude" or "Ask Gemini" chips to generate context-specific questions for further exploration in your preferred AI tool.

## Assumptions Made
- **Target Audience**: The primary user is assumed to be someone with basic to intermediate knowledge of civics looking for a visual and interactive way to study global electoral systems.
- **Browser Compatibility**: It is assumed the user is running a modern web browser (Chrome 111+, Edge 111+, or Safari 18+) to fully experience the CSS View Transitions. Fallbacks are implemented for older browsers to still function correctly without the animation.
- **Google Services Integration**: The prompt and solution are built with Google Gemini in mind, incorporating "Ask Gemini" chips to drive deeper engagement with Google's AI ecosystem.
- **Development Environment**: We assumed that due to constraints (NPM connectivity issues during scaffolding), a robust Vanilla JS approach was superior to forcing a framework, ensuring flawless execution and code maintainability within the single branch constraint.
