import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 10000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, board) {
      state.activeBug = bug
    },
    setActiveNote(state, notes) {
      state.notes = notes
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  

  //NOTE BUGS
  //#region
  getBugs({ commit, dispatch }) {
    api.get('bugs')
      .then(res => {
        commit('setBugs', res.data)
      })
  },
  async getBug({ commit, dispatch }, bugId) {
    try {
      let res = await api.get("bugs/" + bugId)
      commit("setActiveBug", res.data)
    } catch (error) {
      console.error(error);
    }
  },
  async addBug({ commit, dispatch }, bugData) {
    try {
      let res = await api.post("bugs/", bugData)
    } catch (error) {
      console.error(error);
    }
  },
  async deleteBug({commit, dispatch}, bugId) {
    try {
      let res = await api.put("bugs/" + bugId)
      dispatch("getBugs")
    } catch (error) {
      console.error(error);
    }
  },
  //#endregion

  //NOTE List
  //#region 
  async getListByBoardId({ commit, dispatch }, boardId) {
    try {
      let res = await api.get("boards/" + boardId + "/notes")
      commit('setActiveNote', res.data)
    } catch (error) {
      console.error(error);

    }
  },
  async addNewList({ commit, dispatch }, newNote) {
    try {
      let res = await api.post("notes", newNote)
      dispatch("getBug", newNote.bugId)
      dispatch("getNoteByBug", newNote.bugId)
    } catch (error) {
      console.error(error);
    }
  },
  async deleteList({ commit, dispatch }, noteData) {
    try {
      let res = await api.delete("notes/" + noteData.id)
      dispatch("getBug", noteData.boardId)
      dispatch("getNoteByBugId", noteData.boardId)
    } catch (error) {
      console.error(error);
    }
  },
  async editList({ commit, dispatch }, noteData) {
    try {
      let res = await api.put("notes/" + noteData.id, noteData)
      dispatch('getBoard', noteData.bugId)
      dispatch("getListByBoardId", noteData.bugId)
    } catch (error) {
      console.error(error);
    }
  },

  //#endregion
  }
});
