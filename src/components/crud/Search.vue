<template>
  <lte-content-page>
    <section class="content-header">
      <h1>
        {{ pageTitle }}
      </h1>
      <lte-breadcrumb :items="breadcrumbs"></lte-breadcrumb>
    </section>
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div v-show="loading" class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <div class="box-header">       
          <form @submit.prevent.default>       
            <label>Descrição</label>          
            <div class="input-group">
              <input style="text-transform: uppercase" @input="objeto.descricao = $event.target.value.toUpperCase()" v-model="objeto.descricao" type="text" min="3" class="form-control">
              <span class="input-group-btn">           
                <button @click="$refs.paginator.changePage(1)" type="submit" class="btn btn-primary btn-flat">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
            <button style="margin-top: 10px" @click="$router.push(tableConfig.editUrl + 'add')" type="submit" class="btn btn-block btn-success btn-flat">
              <i class="fa fa-plus"></i>
                Adicionar novo
            </button> 
          </form>
        </div>
        <div class="box-body no-padding">
          <api-table :filter="filter" ref="apiTable" url="/produto" @finish="onLoadFinish" :sort="sort" :config="tableConfig" @reload="onPaginate(limit, skip)"></api-table>
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
export default {
  name: 'Search',
  data () {
    return {
      pageTitle: 'Produtos',
      breadcrumbs: [{text: 'Início', icon: 'home'}, 'Cadastros', 'Produto'],
      apiUrl: '/produto',
      filter: null,
      objeto: {},
      limit: null,
      skip: null,
      loading: false,
      total: 1,
      tableConfig: {
        fields: [
          { model: 'descricao', header: 'Descrição' }
        ],
        canEdit: true,
        canDelete: true,
        hasActivate: true,
        editUrl: '/produto/',
        descriptionField: 'descricao'
      },
      sort: { descricao: 1 }
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
      if (this.objeto.descricao && this.objeto.descricao.trim() !== '') {
        this.addFilter('descricao', { $regex: this.objeto.descricao })
      }
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$refs.apiTable.load({ skip, limit })
      })
    },
    addFilter (name, val) {
      this.filter = this.filter || {}
      this.filter[name] = val
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
</style>
