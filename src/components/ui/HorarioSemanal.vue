<template>
  <div>
      <div class="form-group">
        <label class="col-sm-3 control-label">{{ field.title }}</label>
        <div class="col-sm-9">
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'HorarioSemanal',
  props: {
    value: Array
  }
}
</script>
