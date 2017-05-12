<template>
  <lte-content-page :loading="loading">
    <section class="content-header" v-if="false">
      <h1>
        {{ pageTitle }}
      </h1>
      <lte-breadcrumb :items="breadcrumbs"></lte-breadcrumb>
    </section>
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">{{ pageTitle }}</h3>
          <div class="box-tools pull-right">
            <button @click="$router.push(tableConfig.editUrl + 'add')" type="submit" class="btn add-button btn-block btn-success btn-flat">
              <i class="fa fa-plus"></i>
                Adicionar novo
            </button>    
          </div>      
        </div>
        <div class="box-body no-padding">
          <form @submit.prevent.default v-if="configuration.search.filterFieldModel">
            <label>{{ configuration.search.filterFieldTitle }}</label>          
            <div class="input-group">
              <input style="text-transform: uppercase" @input="objeto = $event.target.value.toUpperCase()" v-model="objeto" type="text" min="3" class="form-control">
              <span class="input-group-btn">           
                <button @click="$refs.paginator.changePage(1)" type="submit" class="btn btn-primary btn-flat">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>      
          <api-table :filter="filter" ref="apiTable" :url="apiUrl" @finish="onLoadFinish" :sort="sort" :config="tableConfig" @reload="onPaginate(limit, skip)"></api-table>
        </div>
        <div class="box-footer">
          <lte-ui-pagination ref="paginator" @paginate="onPaginate" :total="total"></lte-ui-pagination>
        </div>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
  </lte-content-page>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'Search',
  props: {
    configuration: Object
  },
  data () {
    return {
      pageTitle: this.configuration.search.pageTitle,
      breadcrumbs: this.configuration.breadcrumbs,
      apiUrl: this.configuration.apiUrl,
      filter: null,
      objeto: null,
      limit: null,
      skip: null,
      loading: true,
      total: 1,
      tableConfig: this.configuration.search.table,
      sort: this.configuration.search.sort
    }
  },
  mounted () {
    let $vm = this
    this.$api.getWithPage(this.apiUrl, {skip: 0, limit: 1, sort: { _id: 1 }}).then((response) => {
      $vm.total = response.data.total
      $vm.$nextTick(() => {
        $vm.$refs.paginator.changePage(1)
      })
    })
  },
  methods: {
    onPaginate (limit, skip) {
      this.skip = skip
      this.limit = limit
      this.loading = true
      this.filter = null
      if (this.objeto && this.objeto.trim() !== '') {
        let filters = [].concat(this.configuration.search.filterFieldModel)

        let $vm = this
        _.each(filters, (field) => {
          $vm.addFilter(field, { $regex: this.objeto })
        })
      }
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$refs.apiTable.load({ skip, limit })
      })
    },
    addFilter (name, val) {
      this.filter = this.filter || { $or: [] }
      var actual = {}
      actual[name] = val

      this.filter.$or.push(actual)
    },
    onLoadFinish (total) {
      let $vm = this
      $vm.$nextTick(() => {
        $vm.total = total
        $vm.loading = false
        $vm.$refs.paginator.updateCount()
      })
    }
  }
}
</script>
<style scoped>
  .box-body.no-padding form {
    padding: 10px
  }
  .add-button {
    border-radius: 3px
  }

  .box-header > .box-tools {
    top: 3px;
    right: 3px
  }
</style>
