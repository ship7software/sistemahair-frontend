<template>
    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column :key="field.model" v-for="field in config.fields"
        :prop="field.model"
        :label="field.header">
      </el-table-column>
      <el-table-column
        label="Ações"
        width="150">
        <template scope="scope">
          <div class="btn-group">
          <button @click="changeActivation(scope.row._id, scope.row[config.descriptionField], false)" type="button" v-if="config.hasActivate && scope.row.ativo" class="btn btn-warning" title="Desativar"><i class="fa fa-pause"></i></button>
          <button @click="changeActivation(scope.row._id, scope.row[config.descriptionField], true)" type="button" v-if="config.hasActivate && !scope.row.ativo" class="btn btn-success" title="Ativar"><i class="fa fa-play"></i></button>
          <button @click="edit(scope.row._id)" type="button" v-if="config.canEdit" class="btn btn-info" title="Editar"><i class="fa fa-edit"></i></button>
          <button @click="remove(scope.row._id, scope.row[config.descriptionField])" type="button" v-if="config.canDelete" class="btn btn-danger" title="Excluir"><i class="fa fa-trash"></i></button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  <!--<table class="table table-bordered table-hover dataTable">
    <thead>
      <tr>
        <th v-if="config.canEdit || config.canDelete || config.hasActivation" style="width:1%;
    white-space:nowrap;">Ações</th>            
        <th v-for="field in config.fields">{{ field.header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td v-if="config.canEdit || config.canDelete || config.hasActivate">
          <div class="btn-group">
            <button @click="changeActivation(item._id, item[config.descriptionField], false)" type="button" v-if="config.hasActivate && item.ativo" class="btn btn-warning" title="Desativar"><i class="fa fa-pause"></i></button>
            <button @click="changeActivation(item._id, item[config.descriptionField], true)" type="button" v-if="config.hasActivate && !item.ativo" class="btn btn-success" title="Ativar"><i class="fa fa-play"></i></button>
            <button @click="edit(item._id)" type="button" v-if="config.canEdit" class="btn btn-info" title="Editar"><i class="fa fa-edit"></i></button>
            <button @click="remove(item._id, item[config.descriptionField])" type="button" v-if="config.canDelete" class="btn btn-danger" title="Excluir"><i class="fa fa-trash"></i></button>
          </div>                
        </td>              
        <td v-for="field in config.fields">{{ item[field.model] }}</td>
      </tr>
    </tbody>
  </table>-->
</template>
<script>
export default {
  name: 'ApiTable',
  props: {
    url: String,
    filter: Object,
    sort: { type: Object, default: function () { return { _id: 1 } } },
    config: Object
  },
  data: () => {
    return {
      items: null,
      total: 0,
      fullWidth: null
    }
  },
  mounted () {
    this.fullWidth = window.innerWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize (event) {
      let $vm = this
      this.$nextTick(() => {
        $vm.fullWidth = window.innerWidth
      })
    },
    load (pagination) {
      const sort = this.sort
      let $vm = this
      $vm.$emit('init')
      let params = Object.assign({}, { sort }, this.filter, pagination)
      this.$api.getWithPage(this.url, params).then((response) => {
        if (pagination) {
          $vm.items = response.data.items
          $vm.$emit('finish', response.data.total)
        } else {
          $vm.items = response.data
          $vm.$emit('finish', response.data.items.length)
        }
      }).catch((err) => console.log(err))
    },
    edit (id) {
      this.$router.push(this.config.editUrl + id)
    },
    remove (id, description) {
      let $vm = this
      this.$showMessage({
        title: 'Você tem certeza?',
        text: 'Você está excluindo ' + description,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim, EXCLUIR!'
      }).then(function () {
        $vm.$api.delete($vm.url, id).then((ret) => {
          $vm.$emit('reload')
        }).catch(err => {
          console.log(err)
        })
      })
    },
    doChangeActivate (id, val) {
      this.$api.save(this.url, {_id: id, ativo: val}).then((ret) => {
        this.$emit('reload')
      }).catch(err => {
        console.log(err)
      })
    },
    changeActivation (id, description, val) {
      if (!val) {
        let $vm = this
        this.$showMessage({
          title: 'Você tem certeza?',
          text: 'Você está desativando ' + description,
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Não',
          confirmButtonText: 'Sim, desativar!'
        }).then(function () {
          $vm.doChangeActivate(id, val)
        })
      } else {
        this.doChangeActivate(id, val)
      }
    }
  }
}
</script>
<style scoped>
.btn-group {
  white-space: nowrap;
}
td {
  vertical-align: middle !important
}

.btn-group .btn {
  float: none;
  display: inline-block;
  margin: -2px
}
</style>
