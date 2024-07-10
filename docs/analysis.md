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

1. 创建`ConfigContext`
2. 创建`ConfigProvider`组件，传递默认的`context`给`ProviderChildren`
3. `ProviderChildren`中，在把一些`config`进行合并，一并传递给`ConfigContext.Provider`
4. 最后任意组件中就可以拿到对应的配置了

```tsx
import { useContext } from 'react';

const ConfigContext = React.createContext({
  name: 'default',
});

const ProviderChildren = (props) => {
  const { children, ...rest } = props;

  const mergedConfig = {
    ...rest,
  };

  return <ConfigContext.Provider value={mergedConfig}>{children}</ConfigContext.Provider>;
};

const ConfigProvider = (props) => {
  const context = useContext(ConfigContext);

  return <ProviderChildren parentContext={context} {...props} />;
};

const Demo = () => {
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
