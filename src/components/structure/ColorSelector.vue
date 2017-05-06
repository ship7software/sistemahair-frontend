<template>
<div class="tab-pane active">
   <div class="color-selector">
      <h4 class="control-sidebar-heading">Cores</h4>
      <ul class="list-unstyled clearfix">
         <li v-for="color in colors">
            <a @click="$emit('change', color.id)" class="clearfix full-opacity-hover">
              <div>
                <span :style="'background: #' + color.hex1"></span>
                <span :style="'background: #' + color.hex2"></span>
              </div>
              <div>
                <span :style="'background: #' + color.hex3"></span>
                <span :style="'background: #' + color.hex4"></span>
              </div>
            </a>
            <p class="text-center no-margin">{{ color. name }}</p>
         </li>
      </ul>
   </div>
</div>
</template>
<script>
export default {
  name: 'ColorSelector',
  data: function () {
    return {
      colors: [
        { name: 'Azul', hex1: '367fa9', hex2: '3c8dbc', hex3: '222d32', hex4: 'f4f5f7', id: 'blue' },
        { name: 'Branco', hex1: 'fefefe', hex2: 'fefefe', hex3: '222', hex4: 'f4f5f7', id: 'black' },
        { name: 'Roxo', hex1: '555299', hex2: '605ca8', hex3: '222d32', hex4: 'f4f5f7', id: 'purple' },
        { name: 'Verde', hex1: '008d4c', hex2: '00a65a', hex3: '222d32', hex4: 'f4f5f7', id: 'green' },
        { name: 'Vermelho', hex1: 'd33724', hex2: 'dd4b39', hex3: '222d32', hex4: 'f4f5f7', id: 'red' },
        { name: 'Amarelo', hex1: 'db8b0b', hex2: 'f39c12', hex3: '222d32', hex4: 'f4f5f7', id: 'yellow' },

        { name: 'Light Azul', hex1: '367fa9', hex2: '3c8dbc', hex3: 'f9fafc', hex4: 'f4f5f7', id: 'blue-light' },
        { name: 'Light Branco', hex1: 'fefefe', hex2: 'fefefe', hex3: 'f9fafc', hex4: 'f4f5f7', id: 'black-light' },
        { name: 'Light Roxo', hex1: '555299', hex2: '605ca8', hex3: 'f9fafc', hex4: 'f4f5f7', id: 'purple-light' },
        { name: 'Light Verde', hex1: '008d4c', hex2: '00a65a', hex3: 'f9fafc', hex4: 'f4f5f7', id: 'green-light' },
        { name: 'Light Vermelho', hex1: 'd33724', hex2: 'dd4b39', hex3: 'f9fafc', hex4: 'f4f5f7', id: 'red-light' },
        { name: 'Light Amarelo', hex1: 'db8b0b', hex2: 'f39c12', hex3: 'f9fafc', hex4: 'f4f5f7', id: 'yellow-light' }
      ]
    }
  }
}
</script>
<style scoped>
  .color-selector ul li {
    float:left;
    width: 33.33333%;
    padding: 5px;
  }

  .color-selector ul li a {
    display: block;
    box-shadow: 0 0 3px rgba(0,0,0,0.4)   
  }


  .color-selector ul li a div span {
    display:block;
    float: left;
  }

  .color-selector ul li a div:first-child span {
    height: 7px
  }

  .color-selector ul li a div:nth-child(2) span {
    height: 20px
  }

  .color-selector ul li a div span:first-child {
    width: 20%
  }  

  .color-selector ul li a div span:nth-child(2) {
    width: 80%
  }

</style>
