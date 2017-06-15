<template>
  <div>
    <div class="form-group">
      <label class="col-sm-3 control-label">CEP</label>
      <div class="col-sm-5">
        <input @focus="$event.target.select()" type="tel" class="form-control" v-model="value.cep" @blur="buscaCep">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">Logradouro</label>
      <div class="col-sm-5">
        <input type="text" class="form-control" v-model="value.logradouro" placeholder="Rua, Avenida, etc">
      </div>     
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-xs-12 control-label">Número/Complemento</label>
      <div class="col-sm-3 col-xs-4">
        <input type="text" class="form-control" v-model="value.numeroEndereco" placeholder="Número">
      </div>
      <div class="col-sm-6 col-xs-8">
        <input type="text" class="form-control" v-model="value.complemento" placeholder="Complemento">
      </div>           
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">Bairro</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" v-model="value.bairro" placeholder="Bairro">
      </div>     
    </div> 
    <div class="form-group">
      <label class="col-sm-3 col-xs-12 control-label">Estado/Cidade</label>
      <div class="col-sm-3 col-xs-5">
        <select class="form-control" v-model="value.estado">
          <option value=''>- Estado -</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
        </select>
      </div>
      <div class="col-sm-6 col-xs-7">
        <input type="text" class="form-control" v-model="value.cidade" placeholder="Cidade">
      </div>           
    </div>       
  </div>
</template>
<script>

export default {
  name: 'UiEndereco',
  props: {
    value: { type: Object, default: function () { return {} } }
  },
  data: function () {
    return {
      model: this.value
    }
  },
  methods: {
    buscaCep () {
      let $vm = this
      $vm.model = $vm.value

      this.$api.getById('/publico/cep', this.model.cep).then((ret) => {
        $vm.$nextTick(() => {
          $vm.model.logradouro = ret.data.logradouro
          $vm.model.bairro = ret.data.bairro
          $vm.model.cidade = ret.data.localidade.toUpperCase()
          $vm.model.estado = ret.data.uf
          $vm.$emit('input', $vm.model)
          $vm.$emit('change', $vm.model)
          $vm.$forceUpdate()
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
