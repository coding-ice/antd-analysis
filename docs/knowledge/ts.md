---
title: Button
nav:
  title: 学习笔记
  order: 999
---

## Ts 类型

### ['a', 'b'] -> 'a' | 'b'

```ts
// [default ｜ 'primary' | 'link']
const ButtonTypes = ['default', 'primary', 'link'] as const;
// default ｜ 'primary' | 'link'
export type ButtonType = (typeof ButtonTypes)[number];
```

### 事件类型

```ts
const click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
```
