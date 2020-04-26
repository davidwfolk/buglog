<template>
  <div class="board container-fluid bg-dimg">
    <div class="row ml-2">
      <div class="mt-5 card col-12">
          <div v-if="!edit">
        <h5 class="text-primary mt-2 p-0 m-0 border-primary">
          <span class="text-info">Bug Issue:</span>
        </h5>
        <h2 class="text-primary">
          <strong>{{bug.title}}</strong>
        <button class="btn btn-sm textColor" @click="edit = true">
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
            </button>
        </h2>
          </div>
          <div v-else>
            <form @submit.prevent="editBug()">
              <input type="text" v-model="bug.title" />
              <button class="btn text-warning">submit</button>
            </form>
          </div>
        <h5 class="text-primary mt-2 p-0 m-0 border-primary">
          <span class="text-info">Reported By:</span>
        </h5>
        <h2 class="text-primary">
          <h4>{{profile.name}}</h4>
          <h4 class="text-right">
            Status:
            <span>{{bug.closed}}</span>
          </h4>
        </h2>
        <div class="card">
          <div v-if="!editing">
            <h5 class="px-2">{{bug.description}}</h5>
            <button class="btn btn-sm textColor" @click="editing = true">
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
            </button>
          </div>
          <div v-else>
            <form @submit.prevent="editBug()">
              <input type="text" v-model="bug.description" />
              <button class="btn text-warning">submit</button>
            </form>
          </div>
          <div class="col-1 mt-2 ml-auto">
            <button class="btn btn-danger" @click="closeBug()">Close</button>
          </div>
          <div class="row p-2">
            <div class="col-12">
              <div id="card-display" class="card border-0 bg-transparent text-light">
                <note v-for="note in notes" :noteData="note" :key="note._id"></note>
                <div v-if="!closed">
                  <form @submit.prevent="addNewNote()">
                    <input
                      type="text"
                      v-model="newNote.title"
                      class="bg-light text-dark input-group-sm border-0 ml-2 rounded-lg mt-2"
                      placeholder=" New Note"
                    />
                    <button class="display-5 btn m-0 p-0" type="submit">
                      <strong>+</strong>
                    </button>
                  </form>
                </div>
                <div v-else></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Note from "../components/Note";
export default {
  name: "bug",
  props: ["bugData"],

  data() {
    return {
      newNote: {},
      editing:false ,
      edit: false,
      closed: false
    };
  },
  mounted() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch("getBug", this.$route.params.bugId);
    this.$store.dispatch("getNoteByBugId", this.$route.params.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    profile() {
      return this.$store.state.profile;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    addNewNote() {
      this.newNote.bugId = this.$route.params.bugId;
      this.newNote.creatorEmail = this.bug.creatorEmail;
      console.log("addNewNote", this.newNote.creatorEmail);
      this.$store.dispatch("addNewNote", this.newNote);
      this.newNote = {};
    },
    closeBug() {
      if (confirm("are you sure you want to close this ticket?")) {
        this.closed = true;
        this.$store.dispatch("editBug", this.bug);


      }
    },
    editBug() {
      this.$store.dispatch("editBug", this.bug);
      this.editing = false;
      this.edit = false
    },
  },
  components: {
    Note
  }
};
</script>


<style scoped>
</style>