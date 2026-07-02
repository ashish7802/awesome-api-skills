## Summary

<!-- Describe what skill or package changes are introduced in this PR -->

## Checklist before submitting

- [ ] I have run local validation via `pnpm run validate:skills` or `node scripts/dev/run-validation-v2.js` and all checks passed.
- [ ] `SKILL.md` contains verified technical patterns (correct SDK method names, current webhook events, exact auth headers).
- [ ] `metadata.json` includes `lastVerified` set to the current date (`YYYY-MM-DD`).
- [ ] Code examples under `examples/` are syntactically valid.
- [ ] All workspace tests pass via `pnpm test`.

## Automated PR Validation Notice

> [!NOTE]
> GitHub Actions automatically runs `packages/validator` against every modified skill in this PR. Submissions with schema errors or broken relationships will be flagged automatically by CI.
