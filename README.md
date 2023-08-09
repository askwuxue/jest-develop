# Jest 入门
### 明确目标
#### 1. 为什么学习Jest？
1. Jest可以做单元测试，保障代码质量，避免我们犯一些低级错误、强制帮助我们思考问题全面，罗列边界情况。
2. 社区的一些库，为了保证代码质量很多会使用jest单元测试，以证明库的质量。作为维护者的我们，在fix bug或者是add feature的时候，也必须写单元测试以证明代码质量。所以用到jest。
#### 2. 什么是单元测试？
针对程序模块（软件设计的最小单位）来进行正确性检验的测试工作。在前端中，函数、类、组件、模块文件，都可以进行单元测试，测试时每个模块都是互不干扰的。
#### 3. TDD 和 BDD是什么？
TDD: 测试驱动开发（Test Driven Development）
需要开发者先写测试，后写功能，要求开发着对实现的功能非常了解，趋向于白盒测试。
BDD 行为驱动开发（Behavior Driven Development）
开发者先实现功能，然后写测试用例。

个人更推荐使用TDD。因为先写测试用例，可以更有助于开发着清晰的梳理要实现的功能，但是对开发者的要求更高。

### 如何学习并在项目中使用Jest
我之前学习Jest的方式是通过别人的博客和jest的官方文档进行学习的。但是我发现很多人的博客，只是照搬Jest官方文档，只是把其中的例子拿过来改了改。其中的简单api没什么问题，基本上属于一看就会，但是我发现我还是不能在项目中用起来，因为我学的都是一个个的点，串起来的时候有各种各样的问题。所以我打算通过一个React项目来从实践中学习Jest。一步一步由点到面，到能在项目中使用。

#### 项目说明
1. 使用React，其实和框架关系不大，思想都是一样的。
2. 语言使用Typescript，现在Typescript用的比较多，但是JavaScript也是通用的，Typescript就是加了一些额外的配置进行解析。
#### 创建项目

```
 npx create-react-app react-jest-project --template typescript
```
`create-react-app`创建项目时，自动帮我们配置了jest相关内容，但是因为我们需要从0开始，所以我们要删除默认的Jest配置。以方便我们从零开始。

  <img width="1360" alt="image" src="https://github.com/askwuxue/jest-develop/assets/32808762/1d92e223-9e91-4d95-b009-f4499e781596">


#### 配置Jest
##### 安装

```yarn
yarn add --dev jest
```

##### 配置package.json脚本
配置如下脚本，执行 `yarn test`。就会帮我们执行jest测试工作。
```json
  "scripts": {
    "test": "jest",
  },
```

##### 目录结构
对于React项目来说，测试对象有3种。普通函数,hooks,组件。基于此，我们的目录结构如下

```tree
目录结构
├── src
│   ├── App.tsx
│   ├── components
│   ├── hooks 
│   ├── index.tsx
│   └── utils 
```

##### 起步-第一个测试用例
Jest官网给出的第一个例子是测试一个sum函数，sum函数是一个普通的函数，所以我们应该在utils文件夹中添加这个函数。

```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

测试用例
```js
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

写好了这个函数以及测试用例后，我们执行`yarn test`。就可以看到我们的测试结果

  <img width="399" alt="image-1" src="https://github.com/askwuxue/jest-develop/assets/32808762/b8ba273a-1016-4d57-99bb-e082ff9f39d2">


##### 更详细的Jest配置
Jest像typescript，Babel等语言，工具一样，也有属于自己的详细配置。我们执行
`jest --init`。我们就可以根据自己的选择进行Jest配置。最终会帮我们生成`jest-config-ts`。具体的配置我们可以先不用关心，用到的时候再进行配置。

  <img width="686" alt="image-2" src="https://github.com/askwuxue/jest-develop/assets/32808762/5641cc90-40cf-4e66-b28e-5072df7d7abb">


配置完成之后，我们再执行`yarn test`。

  <img width="1235" alt="image-3" src="https://github.com/askwuxue/jest-develop/assets/32808762/d6c8de8a-d077-48aa-8373-9cfbd22fba38">


我们发现报错了，因为我们的配置文件是`jest.config.ts`。我们都知道，Typescript文件是不能被直接执行的，需要先转义成JavaScript才能被执行，按照报错信息，提示我们可以安装`ts-node`来进行转义。

```yarn
yarn add ts-node -d
```

我们再执行`yarn test`

  <img width="638" alt="image-4" src="https://github.com/askwuxue/jest-develop/assets/32808762/f46c417a-ccc9-4b1d-bce9-7ca393c1409a">


我们发现和我们第一次执行`yarn test`产生的效果不一样，这次残生的信息更加详细。是因为我们在执行`jest --init`的时候选择帮我们生成覆盖率报告。这些测试覆盖率的文件放在根目录的`coverage`文件夹下。这些信息我们都可以从`jest.config.ts`中得知。

```ts
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/private/var/folders/7c/pbp7lxkx5_l7x8nhdmshk7th0000gn/T/jest_dx",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // ....
};
```

#### Jest 基础语法

测试用例
```js
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

还记得我们写的第一个测试用例吗？我们配置项目的时候，只是拿了Jest官方文档中起步的一个例子过来，没有做对Jest语法做具体的解释。下面我们就介绍下Jest的基础语法。

`test(name, fn, timeout)`: 等同于`it(name, fn, timeout)`,可以理解为测试的入口，只有这样写，Jest测试进行测试。name就是测试的描述，fn是测试逻辑执行的函数，timeout是超时时间，默认时间是5s。

`expect(测试内容)`: 和Modifiers，Matchers，组成完成的测试条件。虽然叫expect，但是可以理解为测试内容的返回结果，通过Matchers，Modifiers来进行匹配，匹配测试内容是否返回我们想要的结果，以达到测试的目的。

`toBe(val)`: 即`Modifiers`, 和expect一起使用，匹配expect的结果是否符合预期。Jest内置了非常的Modifiers，如下

##### Jest Modifiers
```ts
.toBe(value)
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
.toHaveReturned()
.toHaveReturnedTimes(number)
.toHaveReturnedWith(value)
.toHaveLastReturnedWith(value)
.toHaveNthReturnedWith(nthCall, value)
.toHaveLength(number)
.toHaveProperty(keyPath, value?)
.toBeCloseTo(number, numDigits?)
.toBeDefined()
.toBeFalsy()
.toBeGreaterThan(number | bigint)
.toBeGreaterThanOrEqual(number | bigint)
.toBeLessThan(number | bigint)
.toBeLessThanOrEqual(number | bigint)
.toBeInstanceOf(Class)
.toBeNull()
.toBeTruthy()
.toBeUndefined()
.toBeNaN()
.toContain(item)
.toContainEqual(item)
.toEqual(value)
.toMatch(regexp | string)
.toMatchObject(object)
.toMatchSnapshot(propertyMatchers?, hint?)
.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
.toStrictEqual(value)
.toThrow(error?)
.toThrowErrorMatchingSnapshot(hint?)
.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)
```
上面这些Modifiers，见名知意，不做过多的解释，[参见官方文档](https://jestjs.io/docs/expect)。

#### 如何测试组件

安装组件React组件测试库

```yarn
yarn add -D @testing-library/react
```

Title组件
```tsx
// src/components/Title.tsx
import React, { CSSProperties, FC } from "react";

interface Props {
  type: "large" | "small";
  title: string;
}

// large 样式
const largeStyle: CSSProperties = {
  fontSize: "2em",
  color: "red",
};

// small 样式
const smallStyle: CSSProperties = {
  fontSize: "0.5em",
  color: "green",
};

// 样式 Mapper
const styleMapper: Record<"small" | "large", CSSProperties> = {
  small: smallStyle,
  large: largeStyle,
};

// 组件
const Title: FC<Props> = (props) => {
  const { title, type } = props;

  return <p style={styleMapper[type]}>{title}</p>;
};

export default Title;
```

使用Title组件

```tsx

import Title from './components/Title'

function App() {
  return (
    <div className="App">
      <Title type='large' title='大字'/>
      <Title type='small' title='小字'/>
    </div>
  );
}

export default App;
```

为Title组件编写测试

```tsx

// tests/components/Title.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import Title from "./Title";

describe("Title", () => {
  it("可以正确渲染大字", () => {
    // render 方法返回一个对象，其中包含了组件的 DOM 对象
    const { baseElement } = render(<Title type="large" title="大字" />);
    // 通过render获得的对象和我们预期的DOM对象（快照）进行对比
    expect(baseElement).toMatchSnapshot();
  });

  it("可以正确渲染小字", () => {
    const { baseElement } = render(<Title type="small" title="小字" />);
    expect(baseElement).toMatchSnapshot();
  });
});

```

上述Title的测试非常简单，我们简单说一下组件测试的原理。我们知道组件最终会被编译成DOM展示在页面上，组件的每次渲染都可能在页面上产生不同的展示效果，基于这种渲染特性，Jest提出了快照测试。即组件渲染将渲染后的DOM结构拍一个快照，然后每次测试，进行快照的对比来进行测试。

我们执行测试看下
<img width="334" alt="image" src="https://github.com/askwuxue/jest-develop/assets/32808762/9a6a0df2-c51e-4538-8f94-313d07707e0c">

这次测试为我们生成了`__snapshots__`文件夹并且生成了对应的测试快照

<img width="683" alt="image" src="https://github.com/askwuxue/jest-develop/assets/32808762/1f7a2053-9e8e-4540-92da-fe3747404238">

因为首次执行，我们还没有已经存在的快照，所以首次测试，只生成快照，默认我们测试是提供过，只有后续我们更改了被测试的组件，再进行测试的时候，生成新的快照来和已经存在的快照进行对比判断测试是否通过。比如。我们将Title组件中的样式更行更改

修改前

```tsx
...
// small 样式
const smallStyle: CSSProperties = {
  fontSize: "0.5em",
  color: "green",
};
```

修改后

```tsx
...
// small 样式
const smallStyle: CSSProperties = {
  fontSize: "1em",
  color: "green",
};
```
