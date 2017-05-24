<template>
  <div ref="cdSchedule" class="cd-schedule js-full" style="transform: rotateX(180deg);-ms-transform:rotateX(180deg); /* IE 9 */-webkit-transform:rotateX(180deg);overflow-y: scroll;">
    <div ref="timelineSchedule" class="timeline-schedule" :style="columnStyleWidth">
      <ul>
        <li v-for="item in timeList"><span>{{ item }}</span></li>
      </ul>
    </div> <!-- .timeline-schedule -->
    <div class="events" v-if="visibleItems.length > 0" :style="columnStyleWidth">
      <ul>
        <li :class="{ 'short-top': short }" class="events-group" v-for="(item, idx) in visibleItems" :style="styleWidth">
          <div class="top-info">
            <span v-if="!short">{{ getShortName(item) }}</span>
            <span v-if="!short" class="pull-right-container" style="padding-left: 0">
              <span class="label pull-right" :class="[{ 'label-success': item.agendas.length > 0 },{ 'label-warning': item.agendas.length == 0 }]" style="font-size: 13px">
                {{ item.agendas.length }}
              </span>
            </span>
            <el-select v-if="short" v-model="selectedIndex" @change="(selected) => { visibleItems = [items[selected]] }" class="profissionalSelect">
              <el-option
                v-for="(opt, optIdx) in items"
                :key="optIdx"
                :label="getShortName(opt) + ' (' + opt.agendas.length + ')'"
                :value="optIdx">
              </el-option>
            </el-select>
          </div>

          <ul :style="columnStyle">
            <li v-for="agenda in item.agendas" class="single-event" :data-event="getDataEvent(idx)" :style="getEventPositionStyle(agenda.horaInicio, agenda.horaFim)">
              <a href="#" @click="$emit('onSelect', agenda)"><span class="event-date">{{ agenda.horaInicio }} - {{ agenda.horaFim }}</span>
                <em class="event-name">{{ agenda.clienteId.nome }}</em>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import './../../assets/schedule.css'
import time from './../../util/time.js'
import _ from 'lodash'

export default {
  name: 'Schedule',
  props: {
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '19:00' },
    step: { type: Number, default: 30 },
    items: Array,
    short: { type: Boolean, default: false }
  },
  data: () => {
    return {
      timeList: [],
      columnStyle: '',
      columnStyleWidth: '',
      cdSchedule: {},
      styleWidth: '',
      visibleItems: [],
      selectedIndex: 0
    }
  },
  watch: {
    items: function (newValue) {
      if (this.short && this.items.length > 0) {
        this.visibleItems = [_.clone(this.items[0])]
      } else {
        this.visibleItems = _.clone(this.items)
      }

      this.columnStyleWidth = 'transform: rotateX(180deg);-ms-transform:rotateX(180deg); /* IE 9 */-webkit-transform:rotateX(180deg);overflow-y: scroll; min-width: ' + ((this.visibleItems.length * 109) + 60) + 'px; width: calc(100% - 48px)'
      if (this.visibleItems.length > 0) {
        this.styleWidth = 'width: ' + (97 / this.visibleItems.length) + '%'
      }
    }
  },
  created () {
    this.timeList = time.generateList(this.startTime, this.endTime, this.step)
    this.columnStyle = 'height: ' + (this.timeList.length * 50) + 'px'
  },
  mounted () {
    if (this.short && this.items.length > 0) {
      this.visibleItems = [_.clone(this.items[0])]
    } else {
      this.visibleItems = _.clone(this.items)
    }

    this.columnStyleWidth = 'transform: rotateX(180deg);-ms-transform:rotateX(180deg); /* IE 9 */-webkit-transform:rotateX(180deg);overflow-y: scroll; min-width: ' + ((this.visibleItems.length * 109) + 60) + 'px; width: calc(100% - 48px)'
    if (this.visibleItems.length > 0) {
      this.styleWidth = 'width: ' + (97 / this.visibleItems.length) + '%'
    }
  },
  methods: {
    getEventPositionStyle (start, end) {
      let duration = time.getDurationInMinutes(start, end)
      let durationFromStart = time.getDurationInMinutes(this.startTime, start)
      let height = 'height: ' + ((duration * 50 / 30) + 1) + 'px;'
      let top = 'top: ' + ((durationFromStart * 50 / 30) - 1) + 'px'

      return height + top
    },
    getShortName (item) {
      let parts = item.profissional.nome.split(' ')
      let ret = parts[0]
      return ret
    },
    getDataEvent (index) {
      return 'event-' + ((index % 4) + 1)
    },
    getSelectedProfissional () {
      if (this.short) {
        return this.items[this.selectedIndex].profissional
      }
      return null
    }
  }
}
</script>
<style scoped>
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .short-top {
    border: none !important
  }
</style>
<style>
  .profissionalSelect {
    width: 100%
  }

  .profissionalSelect .el-input .el-input__inner {
    border: 1px dotted #EAEAEA;
    height: 50px;
    border-radius: 0
  }
</style>
