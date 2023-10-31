import mainFields from '../../db/main-fields'

export default {
  state: {
    image: {
      link: ''
    },
    imageUrl: null,
    fields: mainFields.basic
  },
  getters: {
    imageUrl: (state) => state.imageUrl,
    getBasic: (state) => state
  },
  mutations: {
    setImageUrl (state, imageUrl) {
      state.imageUrl = imageUrl
    },
    ADD_BASIC_FIELD (state, data) {
      state.fields.push(data)
    },
    SET_BASIC_FIELD (state, { index, data }) {
      state.fields[index] = Object.assign(state.fields[index], data)
    },
    REMOVE_BASIC_FILED (state, index) {
      state.fields.splice(index, 1)
    },
    SET_IMAGE (state, data) {
      state.image = Object.assign(state.image, data)
    },
    SET_BASIC_STATE (state, data) {
      state = Object.assign(state, data)
    },
    RESET_BASIC_FIELDS (state) {
      state.image.link = ''
      state.fields = mainFields.basic
    }
  },
  actions: {
    setImageUrl ({ commit }, imageUrl) {
      commit('setImageUrl', imageUrl)
    },
    async addField ({ commit, dispatch, rootState }, data) {
      commit('ADD_BASIC_FIELD', data)
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateField ({ commit, dispatch, rootState }, { index, data }) {
      commit('SET_BASIC_FIELD', { index, data })
      await dispatch('updateProject', rootState.projects.project)
    },
    async removeField ({ commit, dispatch, rootState }, index) {
      commit('REMOVE_BASIC_FILED', index)
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateImage ({ commit, dispatch, rootState }, data) {
      commit('SET_IMAGE', data)
      await dispatch('updateProject', rootState.projects.project)
    }
  }
}
