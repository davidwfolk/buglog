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
    setActiveBug(state, bug) {
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
  async getBugs({ commit, dispatch }) {
    try {
      let res = await api.get('bugs')
      commit("setBugs", res.data)
    } catch (error) {
      console.error(error);
    }
  },
  async getBug({ commit, dispatch }, bugId) {
    try {
      let res = await api.get("bugs/" + bugId)
      commit("setActiveBug", res.data)
    } catch (error) {
      console.error(error);
    }
  },
  async getBugPage({ commit, dispatch }, bugId) {
    try {
      let res = await api.get("bugs/" + bugId)
      commit("setActiveBug", res.data)
      router.push('bugs/' + bugId)
    } catch (error) {
      console.error(error);
    }
  },
  async addBug({ commit, dispatch }, bugData) {
    try {
      let res = await api.post("bugs/", bugData)
      dispatch("getBugPage", res.data.id)
    } catch (error) {
      console.error(error);
    }
  },
  async editBug({commit, dispatch}, bugData) {
    try {
      let res = await api.put("bugs/" + bugData.id, bugData)
      dispatch("getBug", res.data)
    } catch (error) {
      console.error(error);
    }
  },
  // async sortBugs({commit, dispatch}, bugData) {
  //   try {
  //     bugData.sort((b, a) => {return b[bugData.closed == true] > a[bugData.closed == false]})
  //     dispatch("getbugs", bugData)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  //#endregion

  //NOTE List
  //#region 
  async getNoteByBugId({ commit, dispatch }, bugId) {
    try {
      let res = await api.get("bugs/" + bugId + "/notes")
      commit('setActiveNote', res.data)
    } catch (error) {
      console.error(error);

    }
  },
  async addNewNote({ commit, dispatch }, newNote) {
    try {
      let res = await api.post("notes", newNote)
      dispatch("getBug", newNote.bugId)
      dispatch("getNoteByBugId", newNote.bugId)
    } catch (error) {
      console.error(error);
    }
  },
  async deleteNote({ commit, dispatch }, noteData) {
    try {
      let res = await api.delete("notes/" + noteData.id)
      dispatch("getBug", noteData.bugId)
      dispatch("getNoteByBugId", noteData.bugId)
    } catch (error) {
      console.error(error);
    }
  },
  async editNote({ commit, dispatch }, noteData) {
    try {
      let res = await api.put("notes/" + noteData.id, noteData)
      dispatch('getBug', noteData.bugId)
      dispatch("getNoteByBugId", noteData.bugId)
    } catch (error) {
      console.error(error);
    }
  },

  //#endregion
  }
});
