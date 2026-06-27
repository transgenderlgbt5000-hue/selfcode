# TODO

- [x] 修复 `scripts/generate-icons.js`：去掉 `require()`，改用 ESM `import`，使 `npm run lint` 的 3 个 error 消失。

- [x] 重新运行 `npm run lint` 验证：errors=0（warnings=4）。

- [ ] （可选）顺手清理 warning：
  - [ ] `CustomCursor.tsx` 去掉未使用变量 `prevRingX/prevRingY`。
  - [ ] `ServiceWorkerRegister.tsx` 去掉 `catch (e)` 未使用参数。
  - [ ] `portfolio/page.tsx` 将 `<img>` 替换为 `next/image`（可能涉及布局与静态导入策略）。
- [ ] 重新运行 `npm run build` 确认构建稳定。

