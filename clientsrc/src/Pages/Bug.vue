<template>
  <div class="board container-fluid bg-dimg">
    <div class="row ml-2">
      <div class="mt-5 card col-12">
        <h5 class="text-primary mt-2 p-0 m-0 border-primary">
          <span class="text-info">Bug Issue:</span>
        </h5>
        <h2 class="text-primary">
          <strong>{{bug.title}}</strong>
        </h2>
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
          <h5>{{bug.description}}</h5>
        </div>
        <div class="col-1 mt-2 ml-auto">
        <button class="btn btn-danger" @click="closeBug()">Close</button>
        </div>
      <div class="row p-2">
        <div class="col-12">
          <div id="card-display" class="card border-0 bg-transparent text-light">
            <note v-for="note in notes" :noteData="note" :key="note._id"></note>
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
      false: "Open"
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
      if(confirm('are you sure you want to close this ticket?')) {
      this.bug.closed = true
      this.$store.dispatch("editBug", this.bug)
    }
    }
  },
  components: {
    Note
  }
};
</script>


<style scoped>
</style>