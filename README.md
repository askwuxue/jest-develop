# Jest 入门
### 明确目标
#### 1. 为什么学习Jest？
1. Jest可以做单元测试，保障代码质量，避免我们犯一些低级错误、强制帮助我们思考问题全面，罗列边界情况。
2. 社区的一些库，为了保证代码质量很多会使用jest单元测试，以证明库的质量。作为维护者的我们，在fix bug或者是add feature的时候，也必须写单元测试以证明代码质量。所以用到jest。
#### 2. 什么是单元测试？
针对程序模块（软件设计的最小单位）来进行正确性检验的测试工作。在前端中，一个函数、一个类、一个组件、一个模块文件，都可以进行单元测试，测试时每个模块都是互不干扰的。
#### 3. TDD 和 BDD是什么？
TDD: 测试驱动开发（Test Driven Development）
需要开发者先写测试，后写功能，要求开发着对实现的功能非常了解，趋向于白盒测试。
BDD 行为驱动开发（Behavior Driven Development）
开发者先实现功能，然后写测试用例。

个人更推荐使用TDD。因为先写测试用例，可以更有助于开发着清晰的梳理要实现的功能，但是对开发者的要求更高。

### 如何学习并在项目中使用jest
我之前学习jest的方式是通过别人的博客和jest的官方文档进行学习的。但是我发现很多人的博客，只是照搬jest官方文档，只是把其中的例子拿过来改了改。其中的简单api没什么问题，基本上属于一看就会，但是我发现我还是不能在项目中用起来，因为我学的都是一个个的点，串起来的时候有各种各样的问题。所以我打算通过一个React项目来从实践中学习jest。一步一步由点到面，到能在项目中使用。

#### 项目说明
1. 使用React，其实和框架关系不大，思想都是一样的。
2. 语言使用typescript，现在typescript用的比较多，但是JavaScript也是通用的，typescript就是加了一些额外的配置进行解析。
#### 创建项目

```
 npx create-react-app react-jest-project --template typescript
```
`create-react-app`创建项目时，自动帮我们配置了jest相关内容，但是因为我们需要从0开始，所以我们要删除默认的jest配置。以方便我们从零开始。

  <img width="1360" alt="image" src="https://github.com/askwuxue/jest-develop/assets/32808762/1d92e223-9e91-4d95-b009-f4499e781596">


#### 配置jest
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


我们发现报错了，因为我们的配置文件是`jest.config.ts`。我们都知道，typescript文件是不能被直接执行的，需要先转义成JavaScript才能被执行，按照报错信息，提示我们可以安装`ts-node`来进行转义。

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
