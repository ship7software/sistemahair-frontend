<template>
  <div v-show="count > 0">
    <ul class="pagination pagination-sm no-margin pull-left">
      <li><a href="#" @click="changePage(1)" title="Primeira página">«</a></li>
      <li v-for="n in count" :class="{ 'active': (n + visibleFirst) == page }">
        <a href="#" @click="changePage(n + visibleFirst)">{{ (n + visibleFirst) }}</a>
      </li>        
      <li><a href="#" @click="changePage(lastPage)" title="Última página">»</a></li>
    </ul>
    <div class="pagination-page-size">
      <select class="form-control" v-model="size" @change="changePage(1)">
        <option value="5">5 registro(s) por página</option>
        <option value="10">10 registro(s) por página</option>
        <option value="20">20 registro(s) por página</option>
        <option value="50">50 registro(s) por página</option>
        <option value="100">100 registro(s) por página</option>
      </select>
    </div>
    <div class="pagination-page-size" v-if="total">
      <input class="form-control" type="text" :value="'Total: ' + total + ' registro(s)'" disabled>
    </div>                
  </div>    
</template>
<script>
export default {
  name: 'UiPagination',
  props: {
    defaultSize: { type: Number, default: 10 },
    total: { type: Number, default: 1000 }
  },
  data: function () {
    return {
      size: this.defaultSize,
      page: 1,
      count: 1,
      visibleFirst: 0,
      lastPage: Math.ceil(this.total / this.size)
    }
  },
  methods: {
    changePage (actualPage, notEmit) {
      this.page = actualPage
      let first = actualPage - 3
      let last = actualPage + 2

      this.count = this.lastPage = Math.ceil(this.total / this.size)
      if (this.count > 5) {
        this.count = 5

        if (first <= 0) {
          this.visibleFirst = first = 0
        } else {
          if (last <= this.lastPage) {
            this.visibleFirst = first
          } else {
            this.visibleFirst = this.lastPage - 5
          }
        }
      }
      this.$forceUpdate()
      if (!notEmit) {
        this.$emit('paginate', Number(this.size), this.size * (this.page - 1))
      }
    },
    updateCount () {
      let $vm = this
      this.$nextTick(() => {
        $vm.changePage(this.page, true)
      })
    }
  }
}
</script>
<style scoped>
.pagination-page-size {
  display: block !important;
  float: left !important;
}
.pagination-page-size .form-control {
  float: left !important;
  height: 39px !important;
  margin-right: 10px !important;  
}

.pagination-page-size input {
  background: none;
  padding: 0;
  margin-left: 10px;
  border: none;
  font-weight: bold;
  cursor: text
}

.pagination {
  margin-right: 10px !important;
  margin-bottom: 10px !important;
  min-width: 270px !important
}

.pagination li a {
  padding: 8px 15px !important;
  font-size: 14px !important;
  font-weight: bold !important
}
</style>
