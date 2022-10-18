<template>
  <div class="salary-container">
    <Navbar :title="title" :icon="icon" />
    <Person
      @change="change"
      @changeJava="changeJava"
      @changeRobot="changeRobot"
      @changevision="changevision"
    />
    <Talents
      :show="show"
      :call="call"
      :communication="communication"
      :face="face"
    />
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Talents from './components/talents.vue'
import Person from './components/person.vue'
export default {
  name: 'Salary',
  components: { Navbar, Person, Talents },
  data () {
    return {
      title: '人才管理',
      icon: 'el-icon-user',
      show: false,
      call: true,
      communication: false,
      face: false

    }
  },
  methods: {
    change (i) {
      this.call = i
      this.show = false
      this.face = false
    },
    changeJava (i) {
      this.show = i
      this.call = false
      this.communication = false
      this.face = false
    },
    changeRobot (i) {
      this.show = false
      this.call = false
      this.communication = i
      this.face = false
    },
    changevision (i) {
      this.show = false
      this.call = false
      this.communication = false
      this.face = i
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
