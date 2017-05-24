<template>
  <lte-content-page :loading="loading">
    <section class="content no-padding-if-mobile">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Comandas</h3>
          <div class="box-tools pull-right">
            <button @click="$router.push('/comanda/add')" type="submit" class="btn add-button btn-block btn-success btn-flat">
              <i class="fa fa-plus"></i>
                Abrir Comanda
            </button> 
          </div>      
        </div>
        <div class="box-body no-padding">
          <el-form ref="formFiltro" :model="filtro" label-width="120px" style="padding: 10px">
            <el-form-item label="Activity name">
              <el-input v-model="filtro.name"></el-input>
            </el-form-item>      
          </el-form>
          <el-table
            :data="items" v-show="items.length > 0"
            style="width: 100%">
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
          <div class="row" style="padding: 10px" v-show="items.length < 1">
            <div class="col-md-12">
              <lte-ui-alert title="Ops!" type="info" message="Nenhum registro encontrado."></lte-ui-alert>
            </div>
          </div>
        </div>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
  </lte-content-page>
</template>
<script>
export default {
  name: 'ListaComanda',
  data: () => {
    return {
      loading: false,
      items: [],
      filtro: {}
    }
  }
}
</script>
<style>
  .clear { clear: both; }
</style>
