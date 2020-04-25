<template>
 <div class="board container-fluid bg-dimg">
    <div class="row mt-2 ml-2">
      <div class="col-12">
        <h6 class="text-light mt-2 p-0 m-0 text-left"> 
          <strong>{{bug.title}} - {{bug.description}}</strong>
        </h6>
      </div>
    </div>
    <div class="row p-2">
      <div class="col-12">
        <div id="card-display" class="row card border-0 bg-transparent text-light">
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
</template>


<script>
import Note from "../components/Note"
export default {
  name: 'bug',
  props: ['bugData'],

  data(){
    return {
      newNote: {}
    }
  },
  mounted() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch("getBug", this.$route.params.bugId);
    this.$store.dispatch("getNoteByBugId", this.$route.params.bugId);
  },
  computed:{
    bug() {
      return this.$store.state.activeBug
    },
    profile() {
      return this.$store.state.user
    },
    notes() {
      return this.$store.state.notes
    }

  },
  methods:{
        addNewNote() {
      this.newNote.bugId = this.$route.params.bugId;
      this.newNote.creatorEmail = this.bug.creatorEmail;
      console.log("addNewNote", this.newNote.creatorEmail);
      this.$store.dispatch("addNewNote", this.newNote);
      this.newNote = {};
        }
  },
  components:{
    Note
    }
}
</script>


<style scoped>

</style>