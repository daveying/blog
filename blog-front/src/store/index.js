import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    blogs: [],
    tags: {},
    goTopBtnShow: false,
    toc: '',
    hintShow: true
  },
  mutations: {
    createBlog (state, payload) {
      state.blogs.push(payload)
    },
    setBlogs (state, payload) {
      state.blogs = payload
    },
    setTags (state, payload) {
      state.tags = payload
    },
    setGoTopBtnShow (state, payload) {
      state.goTopBtnShow = payload
    },
    setToc (state, payload) {
      state.toc = payload
    },
    setHintShow (state, payload) {
      state.hintShow = payload
    },
    setLike (state, payload) {
      state.blogs.find((blog) => blog.id === payload.id).like = payload.value
    }
  },
  actions: {
    setGoTopBtnShow ({commit}, payload) {
      commit('setGoTopBtnShow', payload)
    },
    setHintShow ({commit}, payload) {
      commit('setHintShow', payload)
    },
    createBlog ({commit}, payload) {
      commit('createBlog', payload)
    },
    loadBlogs ({commit}) {
      // reach out to server and fetch the blogs
      let blogs = [
        {
          id: 'blog01',
          title: '第一篇博客',
          createdDate: new Date(2018, 4, 1),
          viewCount: 1231,
          like: false,
          tags: ['HTML', 'THREE'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '## 三种声明\n\n' +
          '- `var`声明一个变量，可以在声明时进行初始化\n' +
          '- `let`声明一个块作用域的局部变量(block scope local variable)，可以在声明时进行初始化\n' +
          '- `const`声明一个只读常量\n\n' +
          '## 变量声明的三种方式\n\n' +
          '- 使用关键词`var`。例如`var x = 3;`，这个语法可以声明局部变量或者全局变量\n' +
          '- 直接赋值。例如`x = 4;`，这样会声明一个全局变量，但是在`use strict`模式下会产生一个`ReferenceError`。不推荐使用。\n' +
          '- 使用关键词`let`。例如`let y = 23;`。这个语法可以用来声明块作用域的局部变量\n\n' +
          '### 变量求值\n\n' +
          '<iframe width="100%" height="300" src="//jsfiddle.net/david_da/79hg7u24/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>\n\n' +
          '### 变量求值2\n\n' +
          '### 变量求值3\n\n' +
          '用`var`或this`let关键`声明的但是未赋值的变量，其值会被设定为`undefined`。但是`var`和`let`关键词有一点点区别：\n\n' +
          '```javascript\n' +
          'console.log(x);\n' +
          'var x; //代码输出undefined\n' +
          '```\n' +
          '而\n' +
          '```javascript\n' +
          'console.log(y); //出现ReferenceError: y is not defined\n' +
          'let y; \n' +
          '```\n' +
          '这是inline公式$\\sqrt{3x-1}+(1+x)^2$\n' +
          '这是block公式\n$$\\sqrt{3x-1}+(1+x)^2$$\n'
        },
        {
          id: 'blog02',
          title: '第二篇博客',
          createdDate: new Date(2018, 5, 1),
          viewCount: 1232,
          like: false,
          tags: ['HTML', 'WebGL', 'Network programming', 'HTTP/S'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog03',
          title: '第三篇博客',
          createdDate: new Date(2018, 5, 3),
          viewCount: 1232,
          like: false,
          tags: ['HTML', 'WebGL', 'Network programming'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog04',
          title: '第四篇博客',
          createdDate: new Date(2018, 5, 4),
          viewCount: 122,
          like: false,
          tags: ['HTML', 'WebGL', 'Network programming', 'HTTP/S'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog05',
          title: '第五篇博客',
          createdDate: new Date(2018, 5, 5),
          viewCount: 122,
          like: false,
          tags: ['HTML', 'WebGL', 'Network programming', 'HTTP/S'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在`Ubuntu`为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        }
      ]
      let sortedBlogs = blogs.sort((blogA, blogB) => {
        return blogA.createdDate < blogB.createdDate
      })
      commit('setBlogs', sortedBlogs)
      let tags = {}
      tags['all'] = {count: sortedBlogs.length, blogs: sortedBlogs}
      for (let i = 0, il = sortedBlogs.length; i < il; i++) {
        for (let j = 0, jl = sortedBlogs[i].tags.length; j < jl; j++) {
          if (!tags[sortedBlogs[i].tags[j]]) {
            tags[sortedBlogs[i].tags[j]] = {count: 0, blogs: []}
          }
          tags[sortedBlogs[i].tags[j]].count++
          tags[sortedBlogs[i].tags[j]].blogs.push(sortedBlogs[i])
        }
      }
      commit('setTags', tags)
    },
    setToc ({commit}, payload) {
      commit('setToc', payload)
    },
    setLike ({commit}, payload) {
      commit('setLike', payload)
      // update server like number
    }
  },
  getters: {
    blogs (state) {
      return state.blogs
    },
    tags (state) {
      return state.tags
    },
    goTopBtnShow (state) {
      return state.goTopBtnShow
    },
    toc (state) {
      return state.toc
    },
    hintShow (state) {
      return state.hintShow
    }
  }
})
