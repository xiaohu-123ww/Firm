<template>
  <div>
    <div v-for="item in list" :key="item.id" class="recommend">
      <div class="recommend-my">
        <el-row>
          <el-col :span="1"
            ><div class="recommend-img">
              <img :src="item.image" class="image" /></div
          ></el-col>
          <el-col :span="8"
            ><div class="recommend-message">
              <div class="message-name">
                <div class="text">{{ item.name }}</div>
                <div style="margin-right: 15px; font-size: 19px">
                  <Item :icon="item.sex === '男' ? 'nan' : 'nv'"></Item>
                </div>
                <div class="onLine">{{ item.state }}</div>
              </div>
              <div class="message-age">
                <div class="age-four">{{ item.age }}岁</div>
                <div class="age-four four">{{ item.education }}</div>
                <div class="age-four four">{{ item.regular }}</div>
                <div style="margin-left: 10px">{{ item.stateNext }}</div>
              </div>
            </div></el-col
          >
          <el-col :span="13"
            ><div class="recommend-time">
              <div
                v-for="(itemss, index) in item.work"
                :key="index"
                class="recommend-experience"
              >
                <div class="experience-time">{{ itemss.time }}</div>
                <div class="experience-firm">{{ itemss.firm }}</div>
                <div>{{ itemss.job }}</div>
              </div>
            </div></el-col
          >
          <el-col :span="2"
            ><div class="recommend-bt">
              <el-button round class="recommend-button"
                ><Item icon="zhaohu" /> 打招呼
              </el-button>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="technical-ability">
        <div v-for="(skills, index) in item.skill" :key="index" class="ability">
          {{ skills }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
export default {
  components: { Item },
  props: {
    list: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.recommend {
  height: 120px;
  background-color: #fff;
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
  .recommend-my {
    height: 80px;
    // background-color: blueviolet;
    border-bottom: 2px solid #f8f8f8;
    padding: 10px 20px;
    .recommend-img {
      width: 45px;
      height: 45px;
      background-color: pink;
      margin-top: 3px;
      border-radius: 100px;
      overflow: hidden;
      .image {
        width: 45px;
        height: 45px;
      }
    }
    .recommend-message {
      height: 70px;
      width: 100%;
      // background-color: pink;
      .message-name {
        height: 30px;
        width: 100%;
        // background-color: aqua;
        display: flex;

        .text {
          font-size: 17px;
          margin-right: 10px;
        }
        .onLine {
          width: 70px;
          height: 20px;
          background-color: #f1fffd;
          color: #119954;
          font-size: 13px;
          line-height: 18px;
          text-align: center;
          border: 1px solid #ace9ca;
        }
      }
      .message-age {
        height: 40px;
        width: 100%;
        // background-color: darkgreen;
        margin-top: 5px;
        display: flex;
        color: #808080;
        font-size: 13px;
        .age-four {
          width: 50px;
          height: 18px;
          // background-color: darkgreen;
          border-right: 1px solid #808080;
        }
        .four {
          text-align: center;
        }
      }
    }
    .recommend-time {
      height: 70px;
      // background-color: #119954;
      .recommend-experience {
        height: 20px;
        // background-color: rgb(169, 83, 97);
        color: #a3a3a3;
        display: flex;
        font-size: 13px;
        // line-height: 20px;
        .experience-time {
          height: 100%;
          width: 150px;
          // background-color: blue;
          margin-right: 10px;
        }
        .experience-firm {
          height: 100%;
          width: 200px;
          // background-color: rgb(0, 251, 255);
          margin-right: 10px;
          color: black;
        }
      }
    }
    .recommend-bt {
      margin: 10px 40px;
      .recommend-button {
        width: 70px;
        height: 35px;
        border: 1px solid #acd5fe;
        background-color: #e6f1fc;
        color: #218dfa;
        line-height: 2px;
        padding-left: 6px;
        font-size: 13px;
      }
    }
  }
  .technical-ability {
    height: 40px;
    // background-color: #119954;
    padding: 7px 20px;
    display: flex;
    .ability {
      width: 50px;
      height: 25px;
      background-color: #f3f7ff;
      // border-radius: 20px;
      line-height: 25px;
      font-size: 12px;
      text-align: center;
      color: #799ce3;
      margin-right: 15px;
    }
  }
}
</style>
