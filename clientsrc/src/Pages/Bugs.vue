<template>
  <div class="pt-5 bugs bg-dimg text-center">
    <h1 class="text-light">Choose from a Ticket below or create a new one</h1>
    <form @submit.prevent="addBug()">
      <div class=" col-6 input-group text-center m-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Issue..."
            v-model="newBug.title"
            required
          />
          <input
            type="text"
            class="form-control"
            placeholder="Please Be Descriptive..."
            v-model="newBug.description"
          />
          <button class="btn btn-warning btn-sm" type="submit">Create Ticket</button>
      </div>
    </form>
    <div class="container-fluid">
      <div class="row">

      <div class="card col-10 m-auto">
      <div class=" border-0 bg-transparent text-center text-light">
        <Bug v-for="bug in bugs" :bugData="bug" :key="bug.id"></Bug>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug";
export default {
  name: "bugs",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  created() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
    }
  },
  components: {
    Bug
  }
};
</script>