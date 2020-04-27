<template>
  <div class="row border-0">
    <div class="col-12 mt-2">
      <form type="button" @click="selectBug()">
        <div class="row align-items-center">
          <div class="col-12 col-lg-3">
            <h5 class="text-primary">
            {{bugData.title}}
            </h5>
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
    <!-- <button class="btn btn-light my-1" @click="selectBug()">Select</button> -->
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