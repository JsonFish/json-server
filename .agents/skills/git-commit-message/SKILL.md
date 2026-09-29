---
name: git-commit-message
description: Generate a Conventional Commits message from the current staged changes and commit them locally. Use when the user invokes git-commit-message or asks to generate a message and commit staged changes. Honor explicit requests to only suggest a message without committing.
---

# Generate and Commit Staged Changes

Generate one concise Conventional Commits message grounded in the current staged changes, then create a local commit with that message.

The user's explicit instructions always take precedence over this skill.

## Workflow

1. Inspect the repository state:
   ```bash
   git status --short
   ```
2. Inspect the staged changes:
   ```bash
   git diff --cached
   ```
   Base the message only on that diff, including only the staged portions of partially staged files. Read surrounding code when needed to understand those changes.
3. If there are no staged changes, report that there is nothing staged to commit and stop. Do not fall back to unstaged changes or untracked files. If inspection fails, explain the failure rather than treating it as an empty diff.
4. Determine the type, scope, and subject from the staged changes and generate one commit message. If the user explicitly requests only a suggestion or preview, return the message without committing.
5. Otherwise, briefly state the chosen message and run `git commit` with that exact message. Invoking this skill authorizes committing the staged changes; do not ask for another confirmation. Pass the message as a safely quoted argument or through a temporary message file with `git commit -F`.
6. Verify the result with `git log -1 --format='%h %s'` and `git status --short`. Report the commit hash, message, and whether local changes remain. If the commit fails, report the error without claiming success or bypassing hooks.

## Message Format

Use this format:

```text
type(scope): subject
```

Choose the type that best describes the primary purpose:

- `feat`: add user-facing functionality.
- `fix`: correct a bug.
- `refactor`: restructure code without changing behavior.
- `perf`: improve performance.
- `docs`: change documentation.
- `test`: add or update tests.
- `build`: change build tooling, packaging, or dependencies.
- `ci`: change continuous integration or delivery configuration.
- `style`: change formatting without changing behavior, such as whitespace or punctuation; visual UI changes should use their functional type.
- `chore`: perform maintenance that does not fit the other types.

Infer a short scope from the affected feature, component, or package, using existing repository conventions when available. For changes across the repository, use a meaningful shared scope such as `repo`.

Write a concise, specific subject with an action verb and no trailing period. Describe the concrete change; do not claim fixes, benefits, or tests that the inspected changes do not support.

## Output

After a successful commit, return the commit hash and exact message concisely. For an explicit suggestion-only request, return a single recommended message. Do not generate alternatives unless requested.

## Git Actions

- Commit only the existing index. Do not use `git commit -a` or path arguments that would include unstaged changes.
- Do not run `git add`, `git push`, or amend an existing commit unless the user separately requests that action.
- A request to create or edit this skill is not an invocation of its commit workflow.
