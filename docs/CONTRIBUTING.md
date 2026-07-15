# Contributing Guidelines
## Coding Standards & Contribution Processes

---

## 1. Branch Naming Conventions

* `feature/<short-description>`: Adding new features or pages.
* `bugfix/<short-description>`: Resolving defects.
* `docs/<short-description>`: Editing documentation files.
* `refactor/<short-description>`: Enhancing code quality without behavioral updates.

---

## 2. Commit Message Conventions

We use Semantic Commits to support automatic changelogs:
* `feat:`: Introducing a new feature.
* `fix:`: Fixing a bug.
* `docs:`: Modifying markdown documentation.
* `style:`: Changes that do not affect code logic (formatting, spacing).
* `refactor:`: Code changes that neither fix a bug nor add a feature.

**Example:**
`feat: render exact high-fidelity world map SVG paths loaded dynamically from JSON`

---

## 3. Pull Request (PR) Requirements

1. **Self-Review:** Test changes locally.
2. **Formatting:** Ensure code complies with project conventions (Prettier for React, standard linters for backend).
3. **Tests:** All functional modifications require accompanying unit or integration tests.
