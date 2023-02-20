<template>
  <div class="main">
    <div class="time">
      <div class="hour_wrap">
        <div
          v-for="(item, index) in 12"
          :key="index"
          class="hour_item"
          :style="{
            transform:
              'translate(-50%,-50%)' + 'rotate(' + 30 * (index + 1) + 'deg)'
          }"
        >
          {{ index + 1 }}
          <div class="ke"></div>
        </div>
      </div>
      <div class="minute_wrap">
        <div
          v-for="(item, index) in 60"
          :key="index"
          class="minute_item"
          :style="{
            transform:
              'translate(-50%,-50%)' + 'rotate(' + 6 * (index + 1) + 'deg)'
          }"
        >
          <div class="ke"></div>
        </div>
      </div>
      <div
        class="hour_hand"
        :style="{
          transform: 'translate(-50%,-100%)' + 'rotate(' + 30 * hour + 'deg)'
        }"
      ></div>
      <div
        class="minute_hand"
        :style="{
          transform: 'translate(-50%,-100%)' + 'rotate(' + 6 * minute + 'deg)'
        }"
      ></div>
      <div
        class="second_hand"
        :style="{
          transform: 'translate(-50%,-100%)' + 'rotate(' + 6 * second + 'deg)'
        }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      interval: {},
      date: '',
      hour: 0,
      minute: 0,
      second: 0

    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = this.getDate()
      this.hour = this.date.toString().split(' ')[1].split(':')[0]
      this.minute = this.date.toString().split(' ')[1].split(':')[1]
      this.second = this.date.toString().split(' ')[1].split(':')[2]
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    getDate (time, format) {
      var tf = function (i) {
        return (i < 10 ? '0' : '') + i
      }
      var now = time ? new Date(time) : new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      if (format === 'yyyy-mm-dd HH:mm:ss') {
        return year + '-' + tf(month) + '-' + tf(date) + ' ' + hour + ':' + tf(minute) + ':' + tf(second)
      } else {
        return year + '/' + tf(month) + '/' + tf(date) + ' ' + hour + ':' + tf(minute) + ':' + tf(second)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.time {
  border-radius: 50%;
  width: 140px;
  height: 140px;
  border: 1px solid #000;
  position: relative;
  .hour_wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    .hour_item {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      width: 12px;
      font-size: 12px;
      text-align: center;
      transform-origin: 6px 70px;
      //transform: translate(-50%,-50%);
      .ke {
        width: 3px;
        height: 8px;
        background-color: #000;
        margin: 0 auto;
      }
    }
  }
  .minute_wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    .minute_item {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      width: 10px;
      font-size: 12px;
      text-align: center;
      transform-origin: 5px 70px;
      //transform: translate(-50%,-50%);
      .ke {
        width: 2px;
        height: 4px;
        background-color: #000;
        margin: 0 auto;
        margin-top: 10px;
      }
    }
  }
  .hour_hand {
    width: 3px;
    height: 30px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 1.5px 30px;
  }
  .minute_hand {
    width: 2px;
    height: 50px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 1px 50px;
  }
  .second_hand {
    width: 1px;
    height: 60px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0.5px 60px;
  }
}
</style>
