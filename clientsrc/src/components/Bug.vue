<template>
  <div class="row border-2">
    <div class="col-12 mt-2 border-3">
      <form @submit.prevent="selectBug()">
        <div class="row">
          <div class="col-12 col-lg-3">
            <h4 class="text-info">Title</h4>
          </div>
                    <div class="col-12 col-lg-3">
            <h4 class="text-info">Reported By</h4>
          </div>
                    <div class="col-12 col-lg-3">
            <h4 class="text-info">Status</h4>
          </div>
                    <div class="col-12 col-lg-3">
            <h4 class="text-info">Last Modified</h4>
          </div>
        </div>
        <div class="row border align-items-center">
          <div class="col-12 col-lg-3">
            <h6 class="text-primary">
            {{bugData.title}}
            </h6>
          </div>
          <div class="col-12 col-lg-3">
            <h6 class="text-info">{{bugData.creatorEmail}}</h6>
          </div>
          <div class="col-12 col-lg-3">
            <h6 class="text-danger" v-if="bugData.closed">Closed</h6>
            <h6 class="text-success" v-else>Open</h6>
          </div>
          <div class="col-12 col-lg-3">
            <h6 class="text-info">{{bugData.updatedAt}}</h6>
          </div>
        </div>
      </form>
    </div>
    <button class="btn btn-light my-1" @click="selectBug()">Select</button>
    <!-- <button class="btn btn-danger mb-1" @click="deleteBug()">Delete</button> -->
  </div>
</template>

<script>
export default {
  name: "bug",
  props: ["bugData"],

  data() {
    return {};
  },
  computed: {},
  methods: {
    selectBug() {
      this.$store.commit("setActiveBug", {});
      this.$router.push({
        name: "bug",
        params: { bugId: this.bugData.id }
      });
    }
    // deleteBug() {
    //   if(confirm('are you sure you want to close this ticket?')) {
    //     this.$store.dispatch("deleteBug", this.bugData.id);
    //   }
    // }
  }
};
</script>

<style scoped>
</style>