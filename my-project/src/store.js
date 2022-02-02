import { createStore } from 'vuex'

const mutations = {
    updateUrl(state, url) {
      state.favoriteUrl = url
      console.log(url)
    }
  },
  state = {
    favoriteUrl: 'No favorite saved yet'
  }

export default createStore({ mutations, state, strict: true })
