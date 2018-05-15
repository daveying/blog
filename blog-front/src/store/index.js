import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    blogs: [],
    tags: {},
    goTopBtnShow: false
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
    }
  },
  actions: {
    setGoTopBtnShow ({commit}, payload) {
      commit('setGoTopBtnShow', payload)
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
          createdDate: '2018-05-01',
          viewCount: 1231,
          tags: ['HTML', 'THREE'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog02',
          title: '第二篇博客',
          createdDate: '2018-05-02',
          viewCount: 1232,
          tags: ['HTML', 'WebGL', 'Network programming'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog03',
          title: '第三篇博客',
          createdDate: '2018-05-03',
          viewCount: 1232,
          tags: ['HTML', 'WebGL', 'Network programming'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog04',
          title: '第四篇博客',
          createdDate: '2018-05-04',
          viewCount: 122,
          tags: ['HTML', 'WebGL', 'Network programming'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        },
        {
          id: 'blog05',
          title: '第五篇博客',
          createdDate: '2018-05-05',
          viewCount: 122,
          tags: ['HTML', 'WebGL', 'Network programming'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        }
      ]
      commit('setBlogs', blogs)
      let tags = {
        'HTML': [0, 1, 3, 9],
        'CSS': [2, 3, 8, 9],
        'WebGL': [0, 1, 2],
        'THREE': [4, 5],
        'HTTP/S': [6, 7, 8],
        'ASP.NET core': [3, 7, 10],
        'NodeJs': [2, 9, 11],
        'VueJs': [1, 3, 7],
        'Vuetify': [1, 3, 7],
        'OpenGL': [0, 1, 2, 4, 5]
      }
      commit('setTags', tags)
    }
  },
  getters: {
    blogs (state) {
      return state.blogs.sort((blogA, blogB) => {
        return blogA.createdDate > blogB.createdDate
      })
    },
    tags (state) {
      return state.tags
    },
    goTopBtnShow (state) {
      return state.goTopBtnShow
    }
  }
})
