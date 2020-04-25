<template>
  <div class="pt-5 bugs bg-dimg text-center">
    <h1 class="text-light">Choose from a Ticket below or create a new one</h1>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
    >Create New Ticket</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit.prevent="addBug()">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                <h6 class=" text-center mx-auto text-primary"> Reported by: {{ profile.name }}</h6>
                <div class="col-12 input-group text-center m-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Issue..."
                    v-model="newBug.title"
                    required
                  />
                </div>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                class="form-control"
                placeholder="Please Be Descriptive..."
                v-model="newBug.description"
              />
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Report Bug</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

      <div class="container-fluid">
        <div class="row">
          <div class="card col-10 m-auto">
            <div class="border-0 bg-transparent text-center text-light">
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
    },
    profile() {
      return this.$store.state.profile
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