<template>
  <div class="container-fluid card col-12 mr-1 border-0 rounded-lg">
    <div v-if="!editing">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <h6 class="col-3 p-0 mr-auto ml-4 mt-1 mb-1 text-info">{{profile.name}}</h6>
            <h6 class="col-7 p-0 mr-auto ml-4 mt-1 mb-1 text-info">{{noteData.title}}</h6>
            <div class="col-1 ml-auto mr-4 text-right">
              <!-- <button class="btn btn-sm textColor" @click="editing = true">
                <svg
                  class="bi bi-pencil"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>-->
              <button class="btn btn-sm text-danger" @click="deleteNote()" v-if="bug.closed == false">
                <svg
                  class="bi bi-trash"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div v-else></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-else>
      <form @submit.prevent="editNote()">
        <input type="text" v-model="noteData.title" />
        <button class="btn text-warning">submit</button>
      </form>
    </div>-->
  </div>
</template>


<script>
export default {
  name: "note",
  props: ["noteData"],
  data() {
    return {
      editing: false
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    bug() {
      return this.$store.state.activeBug
    }
  },
  methods: {
    deleteNote() {
      if (confirm("are you sure you want to delete this note?")) {
        this.$store.dispatch("deleteNote", this.noteData);
      }
    },
    editNote() {
      this.$store.dispatch("editNote", this.noteData);
      this.editing = false;
    }
  },
  components: {}
};
</script>


<style scoped>
</style>