import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    blogs: [],
    tags: {},
    recentViewed: [],
    hintShow: true,
    isMobile: false,
    env: 'development', // 'development' or 'production'
    fullWidth: false
  },
  mutations: {
    setFullWidth (state, payload) {
      state.fullWidth = payload
    },
    createBlog (state, payload) {
      state.blogs.push(payload)
    },
    setBlogs (state, payload) {
      state.blogs = payload
    },
    setTags (state, payload) {
      state.tags = payload
    },
    pushRecentViewed (state, payload) {
      let idx = state.recentViewed.indexOf(payload)
      if (idx > -1) {
        state.recentViewed.splice(idx, 1)
      }
      state.recentViewed.splice(0, 0, payload)
    },
    setHintShow (state, payload) {
      state.hintShow = payload
    },
    setLike (state, payload) {
      state.blogs.find((blog) => blog.id === payload.id).like = payload.value
    },
    setMobile (state, payload) {
      state.isMobile = payload
    },
    setEnv (state, payload) {
      state.env = payload
    }
  },
  actions: {
    setEnv ({commit}, payload) {
      commit('setEnv', payload)
    },
    setFullWidth ({commit}, payload) {
      commit('setFullWidth', payload)
    },
    pushRecentViewed ({commit}, payload) {
      commit('pushRecentViewed', payload)
    },
    setHintShow ({commit}, payload) {
      commit('setHintShow', payload)
    },
    createBlog ({commit}, payload) {
      commit('createBlog', payload)
    },
    loadBlogs ({commit}) {
      // reach out to server and fetch the blogs
      Vue.http.get('/api/all-articals').then((res) => {
        var blogsObj = res.body
        let blogs = []
        for (let blogId in blogsObj) {
          var blog = blogsObj[blogId]
          var date = blog['createdDate']
          blogs.push({
            id: blog['id'],
            title: blog['title'],
            createdDate: new Date(date.substring(0, 10) + 'T00:00:00'),
            viewCount: blog['viewCount'],
            like: blog['like'],
            tags: blog['tags'] instanceof Array ? blog['tags'] : [blog['tags']],
            abstract: blog['abstract'],
            md: blog['md']
          })
        }
        let sortedBlogs = blogs.sort((blogA, blogB) => {
          return blogB.createdDate - blogA.createdDate
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
      }, () => {
        console.log('error in store')
      })
    },
    setLike ({commit}, payload) {
      commit('setLike', payload)
      // update server like number
    },
    setMobile ({commit}, payload) {
      commit('setMobile', payload)
    }
  },
  getters: {
    blogs (state) {
      return state.blogs
    },
    tags (state) {
      return state.tags
    },
    hintShow (state) {
      return state.hintShow
    },
    isMobile (state) {
      return state.isMobile
    },
    recentViewed (state) {
      return state.recentViewed
    },
    fullWidth (state) {
      return state.fullWidth
    },
    env (state) {
      return state.env
    }
  }
})
