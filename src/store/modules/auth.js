import { auth } from '@/firebase/auth';
import { onAuthStateChanged, logout } from '@/firebase/auth';

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state) {
    state.user = null;
  }
};

const actions = {
  async fetchUser({ commit }) {
    onAuthStateChanged((user) => {
      if (user) {
        commit('SET_USER', user);
      } else {
        commit('CLEAR_USER');
      }
    });
  },
  async logout({ commit }) {
    await logout();
    commit('CLEAR_USER');
  }
};

const getters = {
  isLoggedIn: (state) => !!state.user,
  user: (state) => state.user
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};