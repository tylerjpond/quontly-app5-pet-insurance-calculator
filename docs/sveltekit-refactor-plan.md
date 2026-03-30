# SvelteKit Refactor Plan

## Understanding Summary

- Refactor the current pet insurance calculator from React/Vite to SvelteKit.
- Preserve the current calculator behavior and recommendation logic instead of redesigning the product.
- Update styles to match the reference project in `../quontly-app2-calorie-calculator`.
- Use DaisyUI in the refactor and align the theme and layout direction with the reference project.
- Copy the `BrandLogo` component and implement it the same way as the reference project.
- Include the calculator and the existing supporting content pages as SvelteKit routes.
- Exclude the current charting feature from this phase and do not include placeholder chart UI or placeholder chart copy.

## Assumptions

- Existing recommendation logic and structured content are preserved and ported rather than rewritten from scratch.
- This remains a public, brochure-scale calculator with no authentication and no persistent PII storage.
- Performance expectations are mobile-friendly responsiveness and fast initial rendering on a normal content-calculator site.
- Reliability expectations are standard production web-app expectations rather than regulated or high-availability targets.
- Ownership is a small team in a single repo, so maintainability should stay straightforward and low-complexity.
- Supporting legal and informational pages should share the same SvelteKit layout shell as the calculator.
- Visual tokens and DaisyUI theme behavior should follow the reference project rather than the current React app.

## Decision Log

### 1. Use a behavior-preserving rebuild

- Decided: Keep current calculator behavior and recommendation rules while changing framework and styling.
- Alternatives considered: Aggressive restructure around the reference project.
- Why chosen: Lower regression risk and better fit for the stated request.

### 2. Use a route-centric SvelteKit structure

- Decided: Use SvelteKit routes and a shared layout as the top-level structure.
- Alternatives considered: Mirror the React component tree more literally inside Svelte files.
- Why chosen: More idiomatic for SvelteKit while still keeping migration risk low.

### 3. Keep state local to the calculator route

- Decided: Use route-level local state plus typed modules, without introducing shared stores by default.
- Alternatives considered: Introduce Svelte stores immediately.
- Why chosen: No cross-route state requirement exists yet, so adding stores would be premature.

### 4. Fully adopt the reference styling direction

- Decided: Use the reference project's DaisyUI theme direction, layout shell, and `BrandLogo` implementation pattern.
- Alternatives considered: Blend the current app theme with the reference project.
- Why chosen: The request explicitly asks to match the reference project.

### 5. Remove charting from this phase entirely

- Decided: Exclude charting code, state, UI, and placeholder copy from the refactor plan.
- Alternatives considered: Stub chart placeholders for a later pass.
- Why chosen: The request explicitly excludes charting for now.

## Design

### Architecture

Use SvelteKit as the application shell, with one shared layout and route-driven pages. The new top-level structure should follow a conventional SvelteKit shape:

- `src/routes/+layout.svelte` for the shared Quontly shell
- `src/routes/+page.svelte` for the calculator
- `src/routes/about/+page.svelte`
- `src/routes/privacy/+page.svelte`
- `src/routes/terms/+page.svelte`
- `src/routes/disclosure/+page.svelte`

The shared layout should import the global theme stylesheet, render the copied `BrandLogo` component exactly like the reference project, and provide the shared header and footer navigation pattern.

Business logic should move into typed SvelteKit library modules. The existing recommendation engine from `src/lib/petInsurance.ts` should be preserved conceptually and ported into a TypeScript module under `src/lib`. Structured copy currently held in `src/content/site.ts` should remain data-driven and move into a dedicated content area such as `src/lib/content`.

The calculator route should own orchestration only: current step, validated inputs, derived recommendations, and step navigation. Reusable UI pieces such as field clusters, priority selectors, result cards, and legal content sections should live under `src/lib/components`.

### Data Flow and Validation

Keep one typed input object representing the pet profile and one step index representing progression through the quiz. Each step component should receive the relevant state slice and update handlers through props and dispatched events, while the route-level page remains the single source of truth.

Validation should remain schema-driven. Port the existing Zod schema and use it for both step-level checks and final-submit validation before recommendations are calculated. Errors should remain field-specific and local to the current step rather than introducing a large global error layer.

Derived values such as available breed lists, ranked providers, and results copy should be computed from validated inputs instead of stored redundantly. Recommendation results should be calculated once at submit time and reused by the result view.

Chart-related state and dependencies should not be ported. This phase should remove chart-oriented logic from the design rather than keeping inactive placeholders.

### Styling and Components

Adopt the reference project's Tailwind and DaisyUI setup directly. The visual objective is alignment with the Quontly reference design system, not a blend of the old and new themes.

The refactor should include:

- Global Tailwind + DaisyUI setup in the SvelteKit app
- Quontly theme tokens aligned with the reference project
- Shared background treatment and layout shell direction from the reference project
- The same `BrandLogo` markup and behavior as the reference project

Reusable components should be introduced where they clarify the migration without over-abstracting the app. Good candidates include:

- Step wrappers
- Field groups
- Binary-choice controls
- Provider or affiliate cards
- Recommendation summary blocks
- Legal content sections

Avoid building a large component system during the first pass. The first refactor should optimize for correctness, parity, and maintainability.

### Error Handling and Edge Cases

The plan should explicitly preserve handling for:

- Invalid breed selections for the selected pet type
- State selection validation
- Age lower and upper bounds
- Priority selection limits
- Pre-existing-condition paths that affect output

The calculator route should prevent progression when the current step is invalid and should only calculate results from valid, schema-checked input.

### Testing Strategy

Testing should focus on regression safety, not full UI overcoverage.

- Preserve deterministic logic tests for recommendation ranking and premium estimation.
- Add Svelte-facing smoke coverage for route rendering.
- Add progression tests for the primary quiz flow.
- Keep validation coverage around the key input boundaries and conditional branches.

## Recommended File Direction

- `src/routes/+layout.svelte`: shared shell, nav, footer, theme wrapper
- `src/routes/+page.svelte`: calculator orchestration
- `src/routes/about/+page.svelte`: supporting content page
- `src/routes/privacy/+page.svelte`: supporting content page
- `src/routes/terms/+page.svelte`: supporting content page
- `src/routes/disclosure/+page.svelte`: supporting content page
- `src/lib/components/BrandLogo.svelte`: copied implementation pattern from reference project
- `src/lib/components/*`: calculator and supporting UI components
- `src/lib/petInsurance.ts` or equivalent: migrated recommendation logic
- `src/lib/content/*`: migrated structured copy and legal content
- `src/app.css` or `src/index.css`: DaisyUI and theme setup aligned to reference project

## Implementation Handoff

Recommended implementation order:

1. Replace the React/Vite app shell with a SvelteKit app scaffold and DaisyUI-enabled styling.
2. Port the shared layout and copied `BrandLogo` implementation.
3. Port structured content and legal/info routes.
4. Port recommendation logic and validation modules.
5. Rebuild the calculator flow in Svelte components with route-level state.
6. Add regression coverage for logic and core flow.
7. Remove obsolete React and charting dependencies.