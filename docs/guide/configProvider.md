---
title: ConfigProvider
group:
  title: 其他
  order: 99
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

## 案例

当我们通过`ConfigProvider`进行包裹的时候，组件会从上下文中获取对应的 Token/配置项，本质就是利用了一个 Context 特性

```tsx
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ components: { Button: { colorPrimary: 'pink' } } }}>
    <Button type="primary">Primary Button</Button>
  </ConfigProvider>
);

export default App;
```

## 核心实现

```tsx
import { useContext } from 'react';

// 1. 创建`ConfigContext`
const ConfigContext = React.createContext({
  name: 'default',
});

const ProviderChildren = (props) => {
  const { children, ...rest } = props;

  // 3. 在把一些config进行合并
  const mergedConfig = {
    ...rest,
  };

  // 3.1 向下传递
  return <ConfigContext.Provider value={mergedConfig}>{children}</ConfigContext.Provider>;
};

// 2. 创建`ConfigProvider`组件，传递默认的`context`给`ProviderChildren`
const ConfigProvider = (props) => {
  const context = useContext(ConfigContext);

  return <ProviderChildren parentContext={context} {...props} />;
};

const Demo = () => {
  // 4. 最后任意组件中就可以拿到对应的配置了
  const {
    theme: {
      components: { Button },
    },
  } = useContext(ConfigContext);

  return <>{JSON.stringify(Button)}</>;
};

export default () => {
  return (
    <ConfigProvider prefixCls="ice" theme={{ components: { Button: { colorPrimary: 'pink' } } }}>
      <Demo />
    </ConfigProvider>
  );
};
```
