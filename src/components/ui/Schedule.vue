<template>
  <div ref="cdSchedule" class="cd-schedule js-full" style="transform: rotateX(180deg);-ms-transform:rotateX(180deg); /* IE 9 */-webkit-transform:rotateX(180deg);overflow-y: scroll;">
    <div ref="timelineSchedule" class="timeline-schedule" :style="columnStyleWidth">
      <ul>
        <li v-for="item in timeList"><span>{{ item }}</span></li>
      </ul>
    </div> <!-- .timeline-schedule -->
    <div class="events" v-if="items.length > 0" :style="columnStyleWidth">
      <ul>
        <li class="events-group" v-for="(item, idx) in items" :style="styleWidth">
          <div class="top-info">
            <span>{{ getShortName(item.profissional.nome) }}</span>
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

export default {
  name: 'Schedule',
  props: {
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '19:00' },
    step: { type: Number, default: 30 },
    items: Array
  },
  data: () => {
    return {
      timeList: [],
      columnStyle: '',
      columnStyleWidth: '',
      cdSchedule: {},
      styleWidth: ''
    }
  },
  watch: {
    items: function (newValue) {
      this.columnStyleWidth = 'transform: rotateX(180deg);-ms-transform:rotateX(180deg); /* IE 9 */-webkit-transform:rotateX(180deg);overflow-y: scroll; min-width: ' + ((this.items.length * 109) + 60) + 'px; width: calc(100% - 48px)'
      if (this.items.length > 0) {
        this.styleWidth = 'width: ' + (97 / this.items.length) + '%'
      }
    }
  },
  created () {
    this.timeList = time.generateList(this.startTime, this.endTime, this.step)
    this.columnStyle = 'height: ' + (this.timeList.length * 50) + 'px'
  },
  mounted () {
    this.columnStyleWidth = 'transform: rotateX(180deg);-ms-transform:rotateX(180deg); /* IE 9 */-webkit-transform:rotateX(180deg);overflow-y: scroll; min-width: ' + ((this.items.length * 109) + 60) + 'px; width: calc(100% - 48px)'
    if (this.items.length > 0) {
      this.styleWidth = 'width: ' + (97 / this.items.length) + '%'
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
    getShortName (name) {
      let parts = name.split(' ')
      let ret = parts[0]
      return ret
    },
    getDataEvent (index) {
      return 'event-' + ((index % 4) + 1)
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
</style>
