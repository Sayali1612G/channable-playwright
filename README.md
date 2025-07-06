#  Channable Playwright Framework

This is a **Playwright-based test automation framework** built for the Channable technical assignment.

---

##  Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sayali1612G/channable-playwright.git
   cd channable-playwright
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Run all tests**
   ```bash
   npx playwright test
   ```
   Or using npm script:
   ```bash
   npm test
   ```

---

## Project Structure

```bash
channable-playwright/
│
├── tests/                 # Test scripts
├── pages/                 # Page Object Models (POM)
├── playwright.config.js   # Playwright configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```
-------------------------------------------------------------------