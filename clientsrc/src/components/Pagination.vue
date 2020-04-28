<template>
  <div class="pagination m-auto">
<div>
  <ul>
    <bug v-for="bug in bugs" :key="bug.id">
      {{bug.title}} 
      {{bug.creatorEmail}}  
      {{bug.closed}}
    </bug>
  </ul>
  <button @click="prevPage">
    Previous
  </button>
  <button @click="nextPage">
    Next
  </button>
</div>

  </div>
</template>


<script>
import Bug from"../components/Bug"
export default {
  name: 'pagination',
  props:{ 
    bugData:{
      type:Array,
      required:true
    },
    size:{
      type:Number,
      required:false,
      default: 2
    }
  },
  data(){
    return {
       pageNumber: 0  // default to page 0
    }
  },
  computed:{
    pageCount(){
      let l = this.bugData.length,
          s = this.size;
      return Math.ceil(l/s);
},
paginatedData(){
    const start = this.pageNumber * this.size,
          end = start + this.size;
     return this.bugData.slice(start, end);
}
  },
  methods:{
          nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      }
  },
  components:{
    Bug
  },
}
</script>


<style scoped>

</style>