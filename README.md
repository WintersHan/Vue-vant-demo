
# 安装依赖
``` bash
npm install
```

# 启动项目
### dev - 推荐联调时使用
``` bash
npm run dev
```
### pro - 将接口转发到正式环境 慎用
``` bash
npm run pro
```
### build:beta 测试环境打包，将展示vconsole
``` bash
npm run build:beta
```
### build 正式环境打包
``` bash
npm run build
```

# 开发前请注意

* 框架已集成`postcss-pxtorem`，所以在开发过程中完全按照设计稿中的`px`来写就好，框架自动将`px`转换为`rem`
* 框架已设置`npmrc`，默认会走淘宝镜像，所以你在使用时不需要再配置默认镜像地址

# 目录介绍
``` bash
workspace
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   └── ... # API请求
│   ├── components
│   │   ├── ... # 公共组件
│   ├── config
│   │   └── index.js # 工程相关配置
│   ├── constants
│   │   ├── ... # 常量
│   ├── main.js
│   ├── plugins
│   │   └── vant.js
│   ├── router
│   │   └── index.js # router配置目录
│   ├── store
│   │   ├── index.js
│   │   ├── mutation-types.js # 整个工程中的mutation作为常量存放文件
│   │   ├── getters.js 
│   │   └── modules
│   │       ├── ... # vuex modules目录
│   ├── utils
│   │   ├── ... # 工具类
│   └── views
│       └── ... # 视图目录
├── vue.config.js
├── README.md
├── babel.config.js
├── package.json
├── postcss.config.js
├── yarn.lock
├── .npmrc
├── .browserslistrc
├── .env.development
├── .env.mock
├── .eslintrc.js
└── .gitignore
```

# 开发时请注意
* 所有的页面均写在`<v-page>`内，`<v-page>`作为公共的页面组件，实现了header、页面过渡效果等。现在可不参考这条***
* 所有代码中，避免出现magic number，所有常量相关代码请放置`constants`目录中
* 变量命名请语义化，避免出现拼音、拼写错误等问题。
* 请牢记**vuex**的作用，仅用于组件共享状态以及组件共同变更状态时使用。
* 当增加新`icon`时，请升级对应的`config`中的`ICON_VERSION`中的版本号，版本很重要！

## Lint

* 请一定遵循eslint规则，commit 和 push代码时不要关闭验证，确保上传到git的代码均符合规则，保证统一良好的代码风格。

--------------------------------------------------------------

# 开发完成请注意

* 请保证每次提交内容与本次需求有关，避免无效提交，永远不要使用`git add .`