# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

The project uses pnpm (`pnpm-lock.yaml`).

- `pnpm dev` — start the dev server
- `pnpm build` / `pnpm start` — production build and serve
- `pnpm format` — run Prettier on the whole repo
- `./node_modules/.bin/tsc --noEmit --incremental false` — type-check

- `pnpm test` — run the Vitest suite, which covers server-side code only (`pnpm test <path>` for one file)

`pnpm lint` runs `next lint`, but ESLint is not a dependency, so it is not a working check.

`next.config.mjs` sets `ignoreBuildErrors` and `ignoreDuringBuilds`, so a passing `pnpm build` says nothing about types or lint. Run the type-check separately.

## Architecture

Single-page, multi-language portfolio on Next.js 15 (App Router), React 19, Tailwind 4 and shadcn/ui (`src/components/ui/`). The `@/*` alias points at the repo root, so imports are written `@/src/...`.

### Routing and i18n

- The site is statically generated for `pt`, `en` and `es` under `src/app/[locale]/`, with `dynamicParams = false`. There is no middleware; `/` redirects to `/pt` through `next.config.mjs`.
- `[locale]/layout.tsx` loads the dictionary on the server and passes it to `I18nProvider`. Client components read it with `useI18n()`.
- `src/lib/i18n-config.ts` is safe to import anywhere. `src/lib/i18n.ts` is `server-only`; client code may only import types from it.
- `pt.json` is the source of the `Dictionary` type, so all three locale files must keep the same shape.
- Adding a locale touches `i18n-config.ts`, the loaders in `i18n.ts`, the `alternates` in `layout.tsx`, the JSON files, and `getDictionary` in `src/app/api/chat/route.ts`.

### Content model

Content is split between non-translated data and translated text, joined by `id`:

- `src/constants/` holds structural data (`projects.ts`, `experiences.ts`, `technologies.ts`): links, images, tech lists, display order.
- `src/locales/*.json` holds the text for each `id`, under `projects.items`, `experience.items` and `technologies.docs`.

A new project or experience needs its `id` in the constants file and in all three locale files. A project missing from a locale crashes `src/sections/projects.tsx`, which reads `content.title` without a guard.

The project filter buttons (`filterOptions`) and the `icon === 'Brain'` case are hardcoded in `src/sections/projects.tsx`.

### AI assistant

`src/components/ai-assistant.tsx` uses `useChat` to call `POST /api/chat`, sending the current `locale`. `src/app/api/chat/route.ts` streams from OpenRouter through the OpenAI-compatible AI SDK provider, sending only the last 6 messages.

The system prompt is rebuilt per request from `src/ai-skills/`:

- `personal.ts` and `github.ts` are hand-written static text, and must be updated by hand when facts change.
- `resume.ts` derives skills, experience and projects from the constants and the locale dictionary, so edits there reach the assistant automatically.

`src/lib/chat-request.ts` is the entry barrier: `isAllowedOrigin` and `parseChatRequest` run before anything reaches the model. The app has no rate limit, so the OpenRouter key's quota is the usage ceiling. Treat everything in the prompt as public.

When a request fails or returns no text, the chat falls back to ready-made answers from `src/lib/chat-faq.ts`, built from the constants and dictionaries without calling the model. The last question decides which button is highlighted.

Constraints that are easy to break:

- Reasoning tokens count toward `maxTokens`. On `openrouter/free` they were about 90% of the output, and a limit of 500 produced empty replies with `finishReason: length`.

- Keep `toDataStreamResponse()` in the route. The comment there explains why: `toTextStreamResponse()` hangs `useChat`.
- The prompt requires bare URLs because the client renders replies with its own small parser (`**bold**` and line breaks), not a Markdown library. Markdown links would show up broken.

### GitHub sync

`src/lib/github-repos.ts` fetches public repositories with a 10-minute cache. The page uses `revalidate = 600`, the assistant receives the repositories in the prompt, and the ready-made projects answer lists the ones that are not curated projects. The landing page area for them is currently off through `SHOW_GITHUB_REPOS` in `src/sections/projects.tsx`. If GitHub fails, the result is empty and the assistant falls back to `ai-skills/github.ts`.

### Other notes

- Scroll animations: elements with `data-reveal` start hidden in their Tailwind classes and are revealed by `useReveal` (called in `PortfolioPage`), which sets `data-revealed="true"`. Without the hook running they stay invisible.
- The contact form sends through EmailJS from the browser (`src/sections/contact.tsx`).
- `public/sitemap.xml` and `public/robots.txt` are static files.

## Environment variables

Stored in `.env.local` (git-ignored):

- `OPENROUTER_API_KEY`, and `OPENROUTER_MODEL` (optional, defaults to `openrouter/free`)
- `GITHUB_TOKEN` (optional, raises the GitHub API rate limit)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Conventions

Prettier: single quotes, semicolons, 100-column width.

Use `text-primary-text` for orange text, not `text-primary`: the plain orange fails contrast on the light theme.

Commits follow `.rules/commit-convention.md`:

```text
type(area): short summary

- item 1
- item 2
```

Allowed types are `feat`, `fix`, `docs` and `chore`. The area is required, and the body lists what the commit includes as bullet points.
