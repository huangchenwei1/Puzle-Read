# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Type-check and build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Project Architecture

This is a React 19 + TypeScript web application built with Vite, designed as a puzzle/article reading platform with commenting functionality.

### Core Structure
- **Routing**: React Router with pages in `src/pages/`
  - `/` - ArticleList: Displays available articles
  - `/article/:id` - ArticleDetail: Full article view with comments
  - `/article/:id/edit` - ArticleEdit: Article editing interface
  - `/article/:id/source` - ArticleSource: Raw article source viewer

### Data Layer
- **Mock Data**: `src/data/mockArticles.ts` contains static article data with puzzles, content, and metadata
- **Articles Model**: Each article includes title, content (markdown), puzzles array, author, creation date
- **Comments**: Threaded comment system implemented in CommentTree component with voting support

### UI Components
- **UI Library**: Extensive shadcn/ui components in `src/components/ui/` based on Radix UI primitives
- **Styling**: Tailwind CSS with custom utilities in `src/lib/utils.ts`
- **Key Components**:
  - CommentTree: Handles nested comment threads and voting
  - Article pages: List, detail, edit, and source views
  - Form handling: React Hook Form with Zod validation

### Build & Tooling
- **Vite**: Fast development and build tool (using rolldown-vite)
- **TypeScript**: Strict type checking with separate configs for app and node
- **ESLint**: Code quality with React-specific rules
- **Utilities**: date-fns, clsx, tailwind-merge for common tasks