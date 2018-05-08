import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    blogs: []
  },
  mutations: {
    createBlog (state, payload) {
      state.blogs.push(payload)
    },
    setBlogs (state, payload) {
      state.blogs = payload
    }
  },
  actions: {
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
          tags: ['HTML', 'WebGL'],
          imageUrl: '',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et fugiat blanditiis quo quam. Dolores possimus, mollitia minus, impedit quasi provident commodi alias ab repellat assumenda quia harum placeat nisi corrupti.',
          md: '# 在Ubuntu为特定用户安装全局NodeJS包\n\n在Ubuntu上通过NPM以全局方式安装NodeJS包时经常出现与路径访问权限的问题'
        }
      ]
      commit('setBlogs', blogs)
    }
  },
  getters: {
    blogs (state) {
      return state.blogs.sort((blogA, blogB) => {
        return blogA.createdDate > blogB.createdDate
      })
    }
  }
})
