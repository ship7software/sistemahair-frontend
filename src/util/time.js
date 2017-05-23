import moment from 'moment'
import Vue from 'vue'

let timeUtil = new Vue({
  methods: {
    generateList (start, end, step) {
      let list = []

      let startTime = moment('20000101 ' + start, 'YYYYMMDD HH:mm')
      let endTime = moment('20000101 ' + end, 'YYYYMMDD HH:mm')

      while (startTime.isSameOrBefore(endTime)) {
        list.push(startTime.format('HH:mm'))
        startTime.add(step, 'minutes')
      }

      return list
    },

    getDurationInMinutes (start, end) {
      let startTime = moment('20000101 ' + start, 'YYYYMMDD HH:mm')
      let endTime = moment('20000101 ' + end, 'YYYYMMDD HH:mm')

      return (endTime - startTime) / 60000
    },

    addMinutes (start, minutes) {
      let startTime = moment('20000101 ' + start, 'YYYYMMDD HH:mm')
      startTime.add(minutes, 'minutes')

      return startTime.format('HH:mm')
    }
  }
})

export default timeUtil
