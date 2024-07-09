---
title: ConfigProvider
group:
  title: 组件解析
---

## 前置知识 （useContext）

```tsx
/**
 * defaultShowCode: true
 */
import React, { useContext, createContext } from 'react';

const ThemeContext = createContext();

const Body = () => {
  const theme = useContext(ThemeContext);
  return <div>theme: {theme}</div>;
};

export default () => {
  return (
    // 如果存在多个Context，即使用最近的Context
    <ThemeContext.Provider value="dark">
      <ThemeContext.Provider value="light">
        <Body />
      </ThemeContext.Provider>
    </ThemeContext.Provider>
  );
};
```
