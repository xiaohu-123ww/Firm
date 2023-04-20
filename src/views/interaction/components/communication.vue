<template>
  <div class="max" style="height: 100%">
    <div v-if="!detailss">
      <div class="position">
        <div class="position-manage" style="display: flex">
          <div style="width: 88%">互动消息</div>
        </div>
        <div class="position-state" style="display: flex">
          <div style="display: flex; width: 72%">
            <a href="javascript:;"
              ><div
                :class="{ bd: changeColor === 1 }"
                class="line"
                @click="helloChange"
              >
                新招呼
              </div></a
            >
            <a href="javascript:;">
              <div
                :class="{ bd: changeColor === 2 }"
                class="line"
                @click="haveIntentionTo"
              >
                未回复
              </div></a
            >

            <a href="javascript:;">
              <div
                :class="{ bd: changeColor === 3 }"
                class="line"
                @click="inCommunicationC"
              >
                沟通中
              </div></a
            >

            <a href="javascript:;">
              <div
                :class="{ bd: changeColor === 4 }"
                class="line"
                @click="posted"
              >
                已约面
              </div></a
            >
            <a href="javascript:;">
              <div
                :class="{ bd: changeColor === 5 }"
                class="line"
                @click="inappropriate"
              >
                不合适
              </div></a
            >
          </div>
        </div>
      </div>

      <div class="search-checkbox">
        <span style="margin: 5px 10px">沟通职位</span>
        <el-radio-group v-model="position" size="mini">
          <el-radio-button
            v-for="(item, index) in firm"
            :key="index"
            class="radio"
            :label="item.id"
            @click.native="fast($event, item.id, item.name)"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </div>

      <div class="num">
        <div class="left">
          <!-- <div style="display: flex">
          <div style="width: 85%">
            <el-select v-model="text" placeholder="全部职位" style="width: 98%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button
              icon="el-icon-search"
              style="height: 33px; width: 35px; padding: 3px 0px 0px 3px"
            ></el-button>
          </div>
        </div> -->

          <div class="state">
            <!-- <div style="width: 85%; margin-top: 12px"> -->
            <!-- <el-radio
              v-model="radio"
              label="1"
              @click.native.prevent="radioClick(radio)"
              >未读</el-radio
            > -->
            <!-- </div> -->
            <!-- <el-button type="text" @click="batch">批量</el-button> -->

            <div class="innerbox" style="" :class="{ tall: !show }">
              <!-- <div v-if="show">
            <ul style="padding-left: 0">
              <li
                v-for="item in list"
                :key="item.id"
                style="list-style-type: none"
              >
                <el-checkbox
                  v-model="item.checked"
                  style="display: flex; align-items: center"
                >
                  <div
                    class="box"
                    :class="{ bg: count === item.id }"
                    @click="tinct(item.id)"
                  >
                    <div class="img">
                      <img
                        :src="item.img"
                        alt=""
                        style="width: 40px; height: 40px; border-radius: 100px"
                      />
                      <div class="texte">{{ item.text }}</div>
                    </div>

                    <div style="padding-left: 10px; font-size: 13px">
                      <div>
                        <span style="padding-right: 10px">{{ item.name }}</span
                        ><span>{{ item.job }}</span>
                      </div>
                      <div style="margin-top: 3px">{{ item.content }}</div>
                    </div>
                  </div>
                </el-checkbox>
              </li>
            </ul>
          </div> -->
              <div v-if="show" class="textnum">暂无30天内联系人</div>
              <div v-if="!show" style="margin-bottom: 30px">
                <div
                  v-for="(item, index) in list"
                  :key="item.id"
                  class="box"
                  style="width: 300px"
                  :class="{ bg: count === index }"
                  @click="
                    tinct(
                      index,
                      item.IM_info.hr_id,

                      item.left_data.user_id,
                      item
                    )
                  "
                >
                  <!--  :src="`https://znzz.tech/loc/${item.hr_info.avatar}`" -->
                  <div class="img">
                    <img
                      :src="`https://znzz.tech/loc/${item.left_data.image}`"
                      alt=""
                      style="width: 40px; height: 40px; border-radius: 100px"
                    />
                    <!-- <div class="texte">{{ item.text }}</div> -->
                  </div>

                  <div style="padding-left: 10px; font-size: 14px">
                    <div>
                      <span style="padding-right: 10px">{{
                        item.left_data.user_name
                      }}</span
                      ><span>{{ item.comm_info.comm_position }}</span>
                    </div>
                    <!-- <div style="margin-top: 3px">{{ item.content }}</div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-if="show" class="footer" style="display: flex">
          <div style="margin-top: 10px; width: 200px; margin-left: 25px">
            <el-checkbox v-model="checkAll" @change="handleCheckedCitiesChange"
              >全选</el-checkbox
            >
          </div>
          <div>
            <el-button type="text" style="">删除</el-button>
            <el-button
              type="text"
              style="color: rgb(96, 98, 102)"
              @click="abrogate"
              >取消</el-button
            >
          </div>
        </div> -->
        </div>
        <div class="right">
          <div
            v-if="messageTxt"
            style="
              height: 100%;
              height: 100%;

              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <div>
              <img
                src="../../../assets/image/互动消息.png"
                alt=""
                style="width: 250px; hieght: 100px"
              />
              <div style="font-size: 15px; color: #636567">
                与您进行过沟通的 Boss 都会在左侧列表中显示
              </div>
            </div>
          </div>
          <div v-if="!messageTxt">
            <div class="header" style="position: relative; width: 100%">
              <div style="width: 80%">
                <div>
                  <span style="margin-right: 10px; font-size: 17px">{{
                    hr.name
                  }}</span>
                  <Item
                    :icon="hr.sex === 1 ? 'nan' : 'nv'"
                    style="width: 0.8em"
                  />
                  <span style="margin-left: 10px; color: rgb(254, 135, 110)">{{
                    hr.state
                  }}</span>
                </div>
                <div style="margin-top: 12px">
                  <span class="age" style="padding-left: 0px"
                    >{{ hr.age }}岁</span
                  >
                  <span class="age">{{ hr.work_date }}年</span>
                  <span class="age">{{ hr.education }}</span>
                  <span
                    class="age"
                    style="border: 0; color: rgb(15, 171, 172)"
                    >{{ hr.status }}</span
                  >
                </div>
              </div>
              <div style="margin-top: 17px; width: 30%">
                <el-button
                  class="Btn"
                  icon="el-icon-document"
                  style="width: 90px"
                  @click="resumeOnline(hr.user_id)"
                  >在线简历</el-button
                >
                <el-button
                  class="Btn"
                  style="background-color: rgb(115, 131, 255); width: 90px"
                  icon="el-icon-paperclip"
                  :disabled="!hr.fileChange"
                  @click="blogroll(hr.user_id)"
                  >附件简历</el-button
                >
              </div>
            </div>

            <div
              style="
                position: absolute;

                width: 80%;
                background-color: #fff;
              "
            >
              <div v-if="!openDown" class="icons">
                <i
                  class="el-icon-caret-bottom"
                  style="font-size: 16px; line-height: 12px; transition: 0.3s"
                  @click="open"
                ></i>
              </div>
              <div
                v-if="openDown"
                style="
                  padding: 15px 17px 0px;
                  font-size: 13px;
                  width: 100%;
                  border-bottom: 1px solid #e6e3e3;
                "
              >
                <div style="display: flex">
                  <div style="width: 60%">
                    <div
                      v-if="work.education_data.length !== 0"
                      style="margin-bottom: 8px"
                    >
                      <Item icon="点" style="font-size: 15px" />
                      <span style="color: rgb(163 149 149); margin-right: 20px">
                        {{ work.education_data[0].start_date }}
                        {{ work.education_data[0].end_date }}</span
                      >
                      <span style="width: 210px; display: inline-block">{{
                        work.education_data[0].school | ellipsi
                      }}</span>
                      <span style="width: 180px; display: inline-block">{{
                        work.education_data[0].major
                      }}</span>
                      <!-- <span
                  >沟通职位:
                  <span style="color: rgb(15, 171, 172); margin-right: 10px"
                    >1`323</span
                  ></span
                >
                <i class="el-icon-refresh" style="color: rgb(15, 171, 172)"></i> -->
                    </div>
                    <div
                      v-if="work.education_data.length === 0"
                      style="
                        margin-bottom: 8px;
                        color: rgb(163 149 149);
                        margin-left: 25px;
                      "
                    >
                      再无学籍记录
                    </div>
                    <div v-if="work.jobexperience_data.length !== 0">
                      <div
                        v-for="item in work.jobexperience_data"
                        :key="item.id"
                        style="margin-bottom: 8px"
                      >
                        <Item icon="点" style="font-size: 15px" />
                        <span
                          style="color: rgb(163 149 149); margin-right: 17px"
                        >
                          {{ item.start_date }} {{ item.end_date }}
                        </span>
                        <span style="display: inline-block; width: 210px">{{
                          item.enterprise | ellipsi
                        }}</span>
                        <span style="display: inline-block; width: 200px">{{
                          item.position
                        }}</span>
                      </div>
                    </div>
                    <div
                      v-if="work.jobexperience_data.length === 0"
                      style="
                        margin-bottom: 8px;
                        color: rgb(163 149 149);
                        margin-left: 25px;
                      "
                    >
                      再无工作经历
                    </div>
                  </div>
                  <div>
                    <div style="margin-bottom: 8px">
                      <span>沟通职位：</span>
                      <span>{{ hr.comm_position }}</span>
                      <!-- <i
                    class="el-icon-refresh"
                    style="color: rgb(15, 171, 172)"
                  ></i> -->
                    </div>
                    <div style="margin-bottom: 8px">
                      <span>期望城市：</span>
                      <span>{{
                        hr.position_city ? hr.position_city : '再无'
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="icons" style="border: 0">
                  <i
                    class="el-icon-caret-top"
                    style="font-size: 16px"
                    @click="opens"
                  ></i>
                </div>
              </div>
            </div>
            <div>
              <!-- <RongCloud ref="send" /> -->
            </div>
            <div
              style="
                height: 400px;
                border-bottom: 1px solid #e6e3e3;
                overflow-y: auto;
                margin-top: 20px;
              "
              class="innerboxs"
            >
              <Message
                v-for="(item, index) in sayList"
                :key="index"
                :data="item"
                :index="index"
                :firsttime="sayList[0].time"
                :phones="phones"
                :phone-state="phoneState"
                :status="status"
                :name="hr.name"
                @again="again"
                @resetChange="resetChange"
              />
            </div>
            <div v-if="changeColor !== 1 && changeColor !== 5">
              <div class="chatIcon">
                <div>
                  <div style="display: flex">
                    <el-popover
                      ref="popoverRef"
                      placement="top-start"
                      width="400"
                      trigger="click"
                      class="emoBox"
                      style="
                        width: 20px;
                        margin-right: 10px;
                        border-radius: 0;
                        color: black;
                        background-color: #fff;
                        height: 100%;
                        margin-top: 3px;
                      "
                    >
                      <div class="emotionList">
                        <a
                          v-for="(item, index) in emojList"
                          :key="index"
                          href="javascript:void(0);"
                          rel="external nofollow"
                          class="emotionItem"
                          @click="checkedEmoji(item.symbol, item.emoji)"
                          v-html="item.node.outerHTML"
                        ></a>
                      </div>
                      <div slot="reference">
                        <Item icon="微笑" style="width: 1.2em" @click="num" />
                      </div>
                    </el-popover>
                    <el-popover
                      ref="popoveraite"
                      placement="top-start"
                      width="420"
                      trigger="click"
                      class="emoBoxs"
                      style="
                        margin-right: 10px;
                        border-radius: 0;
                        color: black;
                        background-color: #fff;
                        height: 100%;
                        margin-top: 3px;
                      "
                      @select="handleSelectaite"
                    >
                      <div class="frequent-expressions">
                        <div class="frequent">常用语</div>
                        <a href="javascript:;">
                          <div
                            v-for="item in expressions"
                            :key="item.id"
                            class="frequent"
                            style="font-size: 15px"
                            @click="expressionsClick(item.text)"
                          >
                            {{ item.text | ellipsis }}
                          </div>
                        </a>
                        <!-- <a
                    v-for="(item, index) in emojList"
                    :key="index"
                    href="javascript:void(0);"
                    rel="external nofollow"
                    class="emotionItem"
                    @click="checkedEmoji(item.symbol, item.emoji)"
                    v-html="item.node.outerHTML"
                  ></a> -->
                      </div>
                      <div slot="reference">
                        <Item icon="常" style="width: 1.2em" @click="num" />
                      </div>
                    </el-popover>
                    <span style="margin-right: 10px; margin-top: 3px">
                      <!-- <Item icon="添加" /> -->
                      <el-upload
                        class="upload-demo"
                        action="#"
                        :show-file-list="false"
                        :before-upload="handleInfoPic"
                        :http-request="testUpload"
                        :on-success="uploadSuccess"
                        accept=".png,.jpeg,.jpg"
                      >
                        <Item icon="添加1" />
                        <!-- <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div> -->
                      </el-upload>
                    </span>
                    <span style="margin-top: 3px" @click="mapState">
                      <Item icon="地图" style="width: 1.2em" />
                    </span>
                    <el-popover
                      ref="popovers"
                      placement="top-start"
                      width="200"
                      trigger="click"
                      class="emoBoxs"
                      style="
                        margin-left: 10px;
                        border-radius: 0;
                        color: black;
                        background-color: #fff;
                        height: 100%;
                        margin-top: 3px;
                      "
                    >
                      <div class="frequent-expressions">
                        <!-- <div class="frequent"></div> -->
                        <a href="javascript:;">
                          <div
                            v-for="item in jobChange"
                            :key="item.id"
                            class="frequent"
                            style="font-size: 15px"
                            @click="nums(item.id, item.name)"
                          >
                            {{ item.name }}
                          </div>
                        </a>
                        <!-- <a
                    v-for="(item, index) in emojList"
                    :key="index"
                    href="javascript:void(0);"
                    rel="external nofollow"
                    class="emotionItem"
                    @click="checkedEmoji(item.symbol, item.emoji)"
                    v-html="item.node.outerHTML"
                  ></a> -->
                      </div>
                      <div v-if="changeColor === 3" slot="reference">
                        <Item icon="交换" style="width: 1.2em" @click="nums" />
                      </div>
                      <div v-if="changeColor === 4" slot="reference">
                        <Item icon="交换" style="width: 1.2em" @click="nums" />
                      </div>
                    </el-popover>
                    <span
                      style="font-size: 19px; color: #8a8a8a; margin: 5px 8px"
                      >|</span
                    >
                    <!-- <a href="javascript:;">
                <span class="block" @click="resumes">
                <el-upload
                    class="upload-demo"
                    action="#"
                    :on-preview="handlePreview"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="numList"
                    accept=".pdf,.doc,.docx"
                    :auto-upload="false"
                  >
                  发简历
                  </el-upload>
                </span>
              </a> -->
                    <!-- <a href="javascript:;"> -->
                    <el-button
                      v-if="changeColor !== 2 && changeColor !== 5"
                      class="block"
                      :class="{ small: isBackground }"
                      style="background-color: #fff"
                      @click="phoneChange"
                    >
                      换电话
                    </el-button>
                    <el-button
                      v-if="changeColor !== 2 && changeColor !== 5"
                      class="block"
                      @click="wetChatChange"
                    >
                      换微信
                    </el-button>
                    <el-button
                      v-if="changeColor !== 2 && changeColor !== 5"
                      class="block"
                      icon="el-icon-time"
                      @click="
                        interview(
                          information.left_data.user_id,
                          information.comm_info.comm_position_id
                        )
                      "
                    >
                      约面试
                    </el-button>
                    <!-- <el-button
                      v-if="changeColor === 4 && InterviewDetails === true"
                      class="block"
                      icon="el-icon-time"
                      @click="
                        interview(
                          information.left_data.user_id,
                          information.comm_info.comm_position_id
                        )
                      "
                    >
                      约面试
                    </el-button> -->
                    <el-button
                      v-if="changeColor !== 2 && changeColor !== 5"
                      class="block"
                      @click="ResumeSeeking"
                    >
                      求简历
                    </el-button>
                    <el-button
                      v-if="changeColor === 4 && changeColor !== 5"
                      class="block"
                      @click="particularsClick"
                    >
                      面试详情
                    </el-button>
                    <el-button
                      v-if="changeColor !== 5"
                      class="block"
                      @click="reject(information.comm_info.comm_id)"
                    >
                      不合适
                    </el-button>

                    <!-- </a> -->
                  </div>
                </div>
                <!--   @keyup.enter.native="usernameInput(say)"  @input="usernameInput"-->
                <el-input
                  id="textarea"
                  v-model="say"
                  class="chatText"
                  resize="none"
                  type="textarea"
                  rows="5"
                  :autosize="{ minRows: 5.6, maxRows: 5.6 }"
                  @input="usernameInput"
                  @keyup.enter.native="usernameInputs(say)"
                >
                </el-input>
              </div>
              <div style="display: flex">
                <div style="width: 88%"></div>
                <div>
                  <el-button
                    v-if="changeColor !== 1"
                    type="primary"
                    style="
                      width: 50px;
                      height: 23px;
                      font-size: 12px;
                      padding: 2px 0px 0px 2px;
                    "
                    :disabled="enterText || say === ''"
                    @click="sendMessage"
                    >发送</el-button
                  >
                </div>
              </div>
            </div>
            <div v-if="changeColor === 1" style="">
              <div style="margin: 35px 300px; width: 100%">
                <div style="font-size: 15px; color: rgb(163, 149, 149)">
                  点击“可以聊”展开新的聊天，并可以解锁交互微信、交换联系方式
                </div>
                <el-button
                  type="primary"
                  style="
                    margin: 20px 80px;
                    background-color: #409eff;
                    color: #fff;
                  "
                  @click="chat(information.comm_info.comm_id)"
                  >可以聊</el-button
                >
                <el-button
                  type="danger"
                  style="background-color: #f78989; color: #fff"
                  @click="reject(information.comm_info.comm_id)"
                  >不合适</el-button
                >
              </div>
            </div>
            <div v-if="changeColor === 5" style="">
              <div style="margin: 35px 300px; width: 100%">
                <div style="font-size: 15px; color: rgb(163, 149, 149)">
                  点击“撤销不合适”将候选人移出不合适列表，即可开始沟通
                </div>
                <el-button
                  type="danger"
                  style="
                    background-color: #f78989;
                    color: #fff;
                    margin: 20px 130px;
                  "
                  @click="revocation"
                  >撤销不合适</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <Safety
          :visible="visible"
          @padlock="padlock"
          @phoneNumber="phoneNumber"
        />
      </div>
    </div>
    <Recommendsss
      v-if="detailss"
      :resume-list="resumeList"
      :pid="pid"
      @titleList="titleList"
    />
    <WetChat
      :wetchatvisible="wetchatvisible"
      @wetcancel="wetcancel"
      @wetExchange="wetExchange"
    />
    <WetNumbers
      :wetnumber="wetnumber"
      :wechatnumber="wechatnumber"
      @wetSubmit="wetSubmit"
      @wetExchange="wetExchange"
      @wetresumeSend="wetresumeSend"
      @wetExchanges="wetExchanges"
    />
    <Dialog
      ref="dialogResume"
      :flag-show="flagShow"
      :interviewer="interviewer"
      :position-list="positionList"
      :addresss="addresss"
      @reset="resets"
      @ret="ret"
    />
    <Particulars
      :flag="flag"
      :firm="firms"
      :interviews="interviews"
      @submit="submit"
      @reset1="reset1"
    />
  </div>
</template>
<script>

// import { getDetail } from '@/api/department/online'
// import { getBase } from '@/api/personage/index.js'
import Dialog from '@/views/Salary/components/dialog.vue'
import WetChat from './wechat.vue'
import WetNumbers from './WeNumber.vue'
import Item from '@/layout/components/Sidebar/Item.vue'
import Message from './Message.vue'
import { init } from '@/utils/Rongyun.js'
import { getFirm } from '@/api/firm/index.js'
// import { Sticky } from 'vant'
// import { string } from 'clipboard'
import Safety from './dialog.vue'
// import { getCv } from '@/api/my/resume'
import { getAuthentication } from '@/api/personage/index'
import { getChat } from '@/api/salarys/index'
// 账号id
import { getBase } from '@/api/personage/index'
import { getRongyun, getpreChat, getInterest, getComming, getPosted, getReject, getPhoneChange, getWetChat, getWetChatChange, getWetNumber, getParticulars, getRejectss, getCommunication, getRejectNum } from '@/api/Rongyun.js'
import { getEnterprise, getResume } from '@/api/setting/index'
import Recommendsss from '@/views/Setting/components/resumeDetails.vue'
import { getDetail } from '@/api/department/online'
import Particulars from '@/views/Salary/components/particulars.vue'
import { getChating } from '@/api/salarys/index'

// import { getAuthentication } from '@/api/personage/index'
// import { getList } from '@/api/my/safety'
var appData = RongIMLib.RongIMEmoji.list
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { WetNumbers, Item, Message, Safety, Recommendsss, WetChat, Dialog, Particulars },
  filters: {
    // 超过20位显示 ...
    ellipsis: function (value) {
      if (!value) return ''
      if (value.length > 23) {
        return value.slice(0, 23) + '...'
      }
      return value
    },
    ellipsi: function (value) {
      if (!value) return ''
      if (value.length > 14) {
        return value.slice(0, 14) + '...'
      }
      return value
    }
  },
  data () {
    return {
      flag: false,
      firms: {},
      interviews: [],
      // 约面试
      flagShow: false,
      positionList: 0,
      interviewer: 0,
      addresss: '',

      // 微信
      wetchatvisible: false,
      wechatnumber: '',
      wetnumber: false,
      pid: '',
      resumeList: {},
      detailss: false,
      isBackground: false,
      numList: '',
      visible: false,
      // 上传
      images: true,
      fileList: [],
      // 常用语
      expressions: [
        {
          id: 1,
          text: '看了你的过往经历，比较感兴趣，方便聊聊吗?'
        },
        {
          id: 2,
          text: '方便发一份简历过来么?'
        },
        {
          id: 3,
          text: '好的 方便了解一下不考虑的原因嘛?'
        },
        {
          id: 4,
          text: '您的简历我们已查阅，感觉与职位不是很匹配，祝您早日找到满意工作。'
        }
      ],
      emojList: [],
      appkey: 'x18ywvqfxzbbc', // 这是我们之前保存的 appkey *重要
      // token: 'LfWddfqXjPDAC0wBYe7EXs46VaBqkAqrId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // token 可以多次生成 之前也有介绍过
      token: 'kMZsHnaWejrAC0wBYe7EXlRo5VWDg4aBId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com',
      faceList: [],
      textarea: '',
      graph: 'el-icon-caret-bottom',
      openDown: false,
      checkAll: '',
      count: '',
      show: true,
      changeColor: 1,
      ematy: true,
      text: '',
      radio: '0',
      remove: [],
      options: [{
        value: '1',
        label: '前端'
      }, {
        value: '2',
        label: 'java'
      }, {
        value: '3',
        label: '招聘主管'
      }, {
        value: '4',
        label: '招聘经理'
      }, {
        value: '5',
        label: '人事'
      }],
      list: [

      ],
      say: '', // 消息
      answer: this.$store.state.num.answer, // 消息列表
      // answar: [],
      memberInfo: this.$store.state.num.memberInfo, // 用户信息
      targetId: this.$store.state.num.targetId,
      image: '', // 目标ID
      nowDate: '',
      nowTime: '',
      nowWeek: '',
      phones: '',
      phoneState: false,
      status: false,
      showDatas: [],
      messageTxt: true,
      rongYun: {
        sender_class: 1, // 0-求职者；1-hr
        sender_uid: 0,
        receiver_class: 0, // 同上
        receiver_uid: 0
      },
      hr: {
        name: '',
        sex: '',
        state: '',
        company: '',
        age: '',
        work_date: '',
        education: '',
        status: '',
        comm_position: '',
        position_city: '',
        user_id: '',
        fileChange: null,
        wechatChange: null,
        phoneChange: null

      },
      enterText: true,
      firm: [],
      position: '',
      pidList: {
        pid: 0
      },
      work: {

      },
      lang: {

      },
      // 链接
      interlinkage: '',
      pidResume: '',
      // 是否交换手机
      comm_id: null,
      // 切换岗位
      jobChange: [],
      information: {},
      jobTitle: '',
      uid: '',
      rongYuns: {
        sender_class: 1, // 0-求职者；1-hr
        sender_uid: 0,
        receiver_class: 0, // 同上
        receiver_uid: 143
      },
      answers: [],
      sayList: [],
      InterviewDetails: false

    }
  },
  computed: {

  },
  watch: {
    '$store.state.num.answer': {
      handler: function (newVal, oldVal) {
        const target = this.$store.state.num.targetId
        const answerList = newVal
        this.sayList = answerList.filter(function (item, index) { return item.targetId === target })
        sessionStorage.setItem('answer', JSON.stringify(newVal))
        console.log('11231', newVal, oldVal, this.sayList)
      }
    }
  },
  mounted () {
    // this.$router.go(0)
    // this.helloChange()
    // for (const i in appData) {
    //   console.log('appData', appData)
    //   this.emojList.push(appData[i].char)
    // }
  },

  created () {
    // this.sendMessage()

    this.emojList = appData

    // this.resume()
    this.getJob()
    this.initialize()
    // this.helloChange()
  },
  methods: {
    // 撤销不合适
    async revocation () {
      const res = await getRejectNum(this.comm_id)
      console.log(res)
      this.$message.success(res.data.msg)
      this.inCommunicationC()
    },
    // 数据处理
    async initialize () {
      const { data } = await getBase()
      console.log('用户id', data)
      this.rongYuns.sender_uid = data.data.id
      const res = await getRongyun(this.rongYuns)
      console.log('信息', res)
      this.$store.commit('SET_MEMBER', res.data.sender)
      // this.$store.commit('SET_TARGETID', res.data.receiver.uid)
      this.initRongCloud()
    },
    // 不合适
    async reject (id) {
      const res = await getRejectss(id)
      this.$message.success('操作成功')
      // this.$emit('reject')
      this.inappropriate()
    },
    // 可以聊
    async chat (id) {
      const res = await getChat(id)
      console.log('可以聊', res)
      this.$message.success('已向求职发送消息')
      this.inCommunicationC()
      // this.$emit('chat')
    },
    // 面试详情
    async particularsClick () {
      const res = await getParticulars(this.uid)
      console.log('详情', res)
      this.firms = res.data
      this.flag = true
    },
    submit () {
      this.flag = false
      // this.flagShow = true
    },
    reset1 () {
      this.flag = false
    },
    // 约面试
    resets (i, item, interview_id) {
      this.messageTxt = false
      this.flagShow = i
      this.resume()
      console.log('内容', item)

      const _this = this
      // 创建 RichContentMessage 对象
      var title = '面试邀约'
      var description = this.jobTitle
      // var imageUrl = 'http://www.rongcloud.cn/images/logo.png'
      item.content = _this.hr.comm_position
      item.interview_id = interview_id
      var url = item

      var richContentMessage = RongIMLib.RichContentMessage.obtain(title, description, url)
      const targetId = _this.$store.state.num.targetId
      // var conversationType = RongIMLib.ConversationType.PRIVATE
      // 创建消息对象
      var message = {
        content: richContentMessage,
        conversationType: RongIMLib.ConversationType.PRIVATE,
        targetId: targetId
      }

      // 发送消息
      RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.PRIVATE, targetId, message.content, {
        onSuccess: function (message) {
          console.log('Send RichContentMessage successfully.', message)
          const say = {
            css: 'right',
            title: message.content.title,
            content: _this.hr.comm_position,
            headImg: _this.$store.state.num.memberInfo.img,

            messageName: message.content.messageName,
            time: _this.nowTime,
            imageUri: message.content.imageUri,
            targetId: message.targetId

            // condition: 'false'

          }
          _this.answer.push(say)
          _this.sayList.push(say)
          if (_this.changeColor === 3) {
            _this.posted()
          }

          console.log(say, _this.answer, _this.sayList)
        },
        onError: function (errorCode, message) {
          console.log('Send RichContentMessage error: ' + errorCode)
        }
      })
      this.messageTxt = false
      // this.$refs.dialogResume.clear()

      // this.$emit('reject')
    },
    ret (i) {
      this.flagShow = i
    },
    async interview (user, id) {
      this.flagShow = true
      this.interviewer = user
      console.log('id', id)

      this.positionList = id
      const res = await getDetail(id)
      console.log('地址', res)
      if (res.code === 1002) {
        console.log(12)
      } else {
        console.log(23)
        this.addresss = res.data.data.adcode.second + res.data.data.adcode.third + res.data.data.work_adcode.adcode_detail
        console.log(23, this.addresss)
      }
    },
    // 微信
    wetresumeSend (wechat) {
      console.log('修改', wechat)

      this.resume()
      const _this = this
      // 创建 RichContentMessage 对象
      var title = '微信申请'
      var description = 'hr请求您交换微信您是否同意？'
      // var imageUrl = 'http://www.rongcloud.cn/images/logo.png'
      var url = wechat

      var richContentMessage = RongIMLib.RichContentMessage.obtain(title, description, url)
      const targetId = _this.$store.state.num.targetId
      // var conversationType = RongIMLib.ConversationType.PRIVATE
      // 创建消息对象
      var message = {
        content: richContentMessage,
        conversationType: RongIMLib.ConversationType.PRIVATE,
        targetId: targetId
      }

      // 发送消息
      RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.PRIVATE, targetId, message.content, {
        onSuccess: function (message) {
          console.log('Send RichContentMessage successfully.', message)
          const say = {
            css: 'right',
            title: message.content.title,
            content: message.content.content,
            headImg: _this.$store.state.num.memberInfo.img,

            messageName: message.content.messageName,
            time: _this.nowTime,
            targetId: message.targetId

            // condition: 'false'

          }
          _this.answer.push(say)

          _this.sayList.push(say)
          console.log(say, _this.answer, _this.sayList)
        },
        onError: function (errorCode, message) {
          console.log('Send RichContentMessage error: ' + errorCode)
        }
      })
      console.log('你好', this.answer)
    },
    wetSubmit () {
      this.wetnumber = false
    },
    wetExchanges () {
      // this.wetnumber = false
      this.wetchatvisible = true
    },
    // 微信绑定及更换
    async wetExchange (wechat) {
      // this.wetnumber = false
      // this.wetchatvisible = true
      // console.log('wetchat', wechat)
      // if (wechat !== '') {
      const { data } = await getWetChatChange(wechat)
      console.log('微信绑定', data)
      this.wetresumeSend(wechat)
      // }
      // this.wetcancel()
    },
    // 取消微信绑定
    wetcancel () {
      this.wetchatvisible = false
    },
    // 交换微信
    async wetChatChange () {
      const res = await getWetNumber(this.comm_id)
      console.log('是否交换', res)

      if (res.data.is_valid) {
        this.$notify({
          title: this.hr.name,
          message: '微信号：' + res.data.wechat,
          offset: 100,
          type: 'success'
        })
      } else {
        // 微信号查询
        const { data } = await getWetChat()
        console.log('微信', data)
        if (data.wechat === '' || data.wechat === null) {
          this.$message.success('未绑定微信！')
          this.wetchatvisible = true
        } else {
          this.wechatnumber = data.wechat
          this.wetnumber = true
        }
      }
    },
    // 求简历
    async ResumeSeeking () {
      console.log()
      const res = await getResume(this.hr.user_id, this.pidResume)
      console.log('简历', res)
      this.interlinkage = res.data.data.cvfile
      if (res.data.data.cvfile !== '') {
        var downloadPath = `https://znzz.tech/loc/${res.data.data.cvfile}`
        var downloadLink = document.createElement('a')
        downloadLink.style.display = 'none' // 使其隐藏
        downloadLink.href = downloadPath
        downloadLink.download = ''
        downloadLink.click()
        // document.body.removeChild(downloadLink)
      } else {
        // this.$message.success('暂无简历可查看')
        // this.numList = false
        const res = await getChating(this.comm_id)
        console.log('求简历', res.data)
        console.log('求简历')
        if (res.code === 200) {
          this.resume()
          const _this = this
          // 创建 RichContentMessage 对象
          var title = '简历申请'
          var description = 'hr请求您的简历是否同意？'
          // var imageUrl = 'http://www.rongcloud.cn/images/logo.png'
          // var url = 'http://www.rongcloud.cn'

          var richContentMessage = RongIMLib.RichContentMessage.obtain(title, description)
          const targetId = _this.$store.state.num.targetId
          // var conversationType = RongIMLib.ConversationType.PRIVATE
          // 创建消息对象
          var message = {
            content: richContentMessage,
            conversationType: RongIMLib.ConversationType.PRIVATE,
            targetId: targetId
          }

          // 发送消息
          RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.PRIVATE, targetId, message.content, {
            onSuccess: function (message) {
              console.log('Send RichContentMessage successfully.', message)
              const say = {
                css: 'right',
                title: message.content.title,
                content: message.content.content,
                headImg: _this.$store.state.num.memberInfo.img,

                messageName: message.content.messageName,
                time: _this.nowTime,
                targetId: message.targetId

                // condition: 'false'

              }

              _this.answer.push(say)
              _this.sayList.push(say)
              console.log(say, _this.answer, _this.sayList)
            },
            onError: function (errorCode, message) {
              console.log('Send RichContentMessage error: ' + errorCode)
            }
          })
        }
      }
    },
    // 地图
    async mapState () {
      console.log('地图')
      const { data } = await getDetail(this.pidResume)
      console.log('data', data)
      // this.initRongCloud()
      this.resume()
      this.lang = data.data.work_adcode
      this.lang.address = data.data.adcode.second + data.data.adcode.third + data.data.work_adcode.adcode_detail
      console.log(this.lang)
      // var msg = new RongIMLib.TextMessage({ content: _this.phone, extra: _this.memberInfo.avatar })
      // console.log('msg', msg)
      // var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      // var targetId = this.targetId // 目标 Id
      const _this = this
      var locationMessage = RongIMLib.LocationMessage.obtain(_this.lang.latitude, _this.lang.longitude, _this.lang.address, null)
      console.log('locationMessage', locationMessage)
      const targetId = _this.$store.state.num.targetId
      var conversationType = RongIMLib.ConversationType.PRIVATE
      const img = _this.$store.state.num.memberInfo.img
      // 创建一个消息对象
      var message = {
        content: locationMessage,
        conversationType: conversationType,
        targetId: targetId
      }
      // const that = this
      // console.log(_this.answer)
      var answar = {}
      // var answar = this.answer
      // 发送位置消息
      RongIMClient.getInstance().sendMessage(conversationType, targetId, message.content, {
        onSuccess: function (message) {
          console.log('Send location message successfully.', message)
          const say = {
            css: 'right',
            latitude: message.content.latitude,
            longitude: message.content.longitude,
            headImg: _this.$store.state.num.memberInfo.img,
            poi: message.content.poi,
            messageName: 'LocationMessage',
            time: _this.nowTime,
            targetId: message.targetId

            // condition: 'false'

          }
          _this.answer.push(say)
          _this.sayList.push(say)
          console.log(say, _this.answer, _this.sayList)
          // console.log(answar)
          // // const answar = []
          // answar = say
          // console.log(answar)
          // const answer = []
          // console.log(answar)
          // console.log('this.answar', _this.answar)
        },
        onError: function (errorCode, message) {
          console.log('Send location message error: ' + errorCode)
        }

      })

      // this.answar.push(answar)
      // console.log(this.answer)
      // this.sam(this.lang)
    },
    titleList () {
      this.detailss = false
    },
    // 上传简历
    reset () {
      this.isBackground = true
    },
    async resumes () {
      const res1 = await getCv()
      console.log('文件地址', res1, this.fileList1)
      if (res1.data.path !== null && res1.data.name !== null) {
        this.numList = `https://znzz.tech/loc/${res1.data.path}`
        this.sam(this.numList)
      } else {
        this.$message.success('没有上传的简历，去上传吧')
      }
      console.log(this.numList)
    },
    again () {
      this.phoneState = true
      // this.phoneNumber()
      this.reset()
      console.log('nkjno', this.phoneState)

      // this.resume()
      // const _this = this
      // // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
      // _this.answer = this.$store.state.num.answer // 消息列表
      // _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
      // _this.targetId = this.$store.state.num.targetId// 目标ID
      // var msg = new RongIMLib.TextMessage({ content: _this.phone, extra: _this.memberInfo.avatar })
      // console.log('msg', msg)
      // var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      // var targetId = this.targetId // 目标 Id
      // RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
      //   onSuccess: function (message) {
      //     console.log('message', message)
      //     // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
      //     const say = {
      //       css: 'left',
      //       txt: _this.phone,
      //       headImg: _this.memberInfo.avatar,
      //       time: _this.nowTime

      //       // condition: 'false'

      //     }
      //     console.log('_this.memberInfo', say, message.content.content)
      //     _this.answer.push(say)
      //     // _this.$store.commit('SET_ANSWER', _this.answer)
      //     // localStorage.setItem('answer', JSON.stringify(_this.answer))
      //     // _this.$store.commit('SET_ANSWER', _this.answer)
      //     console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)
      //     _this.image = ''
      //     _this.say = ''
      //   },
      //   onError: function (errorCode, message) {
      //     var info = ''
      //     switch (errorCode) {
      //       case RongIMLib.ErrorCode.TIMEOUT:
      //         info = '超时'
      //         break
      //       case RongIMLib.ErrorCode.UNKNOWN:
      //         info = '未知错误'
      //         break
      //       case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
      //         info = '在黑名单中，无法向对方发送消息'
      //         break
      //       case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
      //         info = '不在讨论组中'
      //         break
      //       case RongIMLib.ErrorCode.NOT_IN_GROUP:
      //         info = '不在群组中'
      //         break
      //       case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
      //         info = '不在聊天室中'
      //         break
      //     }
      //     console.log('发送失败: ' + info + errorCode)
      //   }
      // })
    },
    // 交换电话
    async phoneChange () {
      const res = await getPhoneChange(this.comm_id)
      console.log('手机号', res.data)
      if (res.data.is_valid) {
        // this.hr.phoneChange = true
        // this.visible = false
        this.$notify({
          title: this.hr.name,
          message: '手机号：' + res.data.phone,
          offset: 100,
          type: 'success'
        })

        // this.visible = true
      } else {
        this.visible = true
      }
    },
    // 取消发送
    padlock () {
      this.visible = false
    },
    resetChange () {
      this.status = false
    },
    // 电话确定发送
    async phoneNumber () {
      this.padlock()
      const { data } = await getAuthentication()

      console.log('安全中心', data)
      if (data.data.phone_number === '' || data.data.phone_number === null) {
        this.$message.success('未绑定手机号，去绑定吧')
      } else {
        // this.resume()
        // this.phoneState = false
        this.phones = data.data.phone_number
        // localStorage.setItem('phone1', data.data.phone_number)
        // this.resume()

        this.resume()
        const _this = this
        // 创建 RichContentMessage 对象
        var title = '电话申请'
        var description = 'hr请求您交换联系方式是否同意？'
        // var imageUrl = 'http://www.rongcloud.cn/images/logo.png'
        var url = this.phones

        var richContentMessage = RongIMLib.RichContentMessage.obtain(title, description, url)
        const targetId = _this.$store.state.num.targetId
        // var conversationType = RongIMLib.ConversationType.PRIVATE
        // 创建消息对象
        var message = {
          content: richContentMessage,
          conversationType: RongIMLib.ConversationType.PRIVATE,
          targetId: targetId
        }

        // 发送消息
        RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.PRIVATE, targetId, message.content, {
          onSuccess: function (message) {
            console.log('Send RichContentMessage successfully.', message)
            const say = {
              css: 'right',
              title: message.content.title,
              content: message.content.content,
              headImg: _this.$store.state.num.memberInfo.img,

              messageName: message.content.messageName,
              time: _this.nowTime,
              targetId: message.targetId

              // condition: 'false'

            }
            _this.answer.push(say)
            _this.sayList.push(say)
            console.log(say, _this.answer, _this.sayList)
          },
          onError: function (errorCode, message) {
            console.log('Send RichContentMessage error: ' + errorCode)
          }
        })
        // this.isBackground = true
      }
      // this.reset()
      // // this.padlock()
      // this.status = true
    },
    // 时间
    resume () {
      const myDate = new Date()
      const wk = myDate.getDay()
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      const min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      const sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const week = weeks[wk]
      this.nowDate = yy + '-' + mm + '-' + dd
      // this.nowTime = hou + ':' + min + ':' + sec
      this.nowTime = hou + ':' + min
      this.nowWeek = week
      console.log('日期', this.nowDate, this.nowTime, this.nowWeek)
    },
    // 上传
    handleInfoPic (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isJPG2 && !isPNG) this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
      return isJPG || isJPG2 || isPNG
    },
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      const res = await getFirm(formData)
      console.log('res', res)
      if (res.code === 200) {
        this.phoneState = false
        this.image = 'https://znzz.tech/loc/' + res.data.data.image
        console.log('this.say', this.say, this.image)
        console.log('131')
        this.resume()
        const _this = this
        const targetId = _this.$store.state.num.targetId
        var conversationType = RongIMLib.ConversationType.PRIVATE
        // 创建一个 ImageMessage 对象
        var imageMessage = RongIMLib.ImageMessage.obtain('图片', _this.image, '123')

        // 创建一个消息对象
        var message = {
          content: imageMessage,
          conversationType: conversationType,
          targetId: targetId
        }
        console.log('233', targetId, imageMessage, message)

        // 发送图片消息
        RongIMClient.getInstance().sendMessage(conversationType, targetId, message.content, {
          onSuccess: function (message) {
            console.log('Send image message successfully.', message)
            const say = {
              css: 'right',
              imageUri: message.content.imageUri,
              content: message.content.content,
              headImg: _this.$store.state.num.memberInfo.img,
              messageName: message.content.messageName,
              time: _this.nowTime,
              targetId: message.targetId

              // condition: 'false'

            }
            // _this.answer.push(say)
            _this.answer.push(say)
            _this.sayList.push(say)
            console.log(say, _this.answer, _this.sayList)
            _this.image = ''
            console.log(say, _this.answer)
          },
          onError: function (errorCode, message) {
            console.log('Send image message error: ' + errorCode)
          }
        })
        // this.images = false
      } else {
        this.message.error(res.data.msg)
      }
    },

    // numbhbh () {
    //   this.resume()
    //   const _this = this
    //   const targetId = _this.$store.state.num.targetId
    //   var conversationType = RongIMLib.ConversationType.PRIVATE
    //   // 创建一个 ImageMessage 对象
    //   var imageMessage = RongIMLib.ImageMessage.obtain(_this.image, thumbnailUrl)
    //   console.log('233', imageMessage)

    //   // 创建一个消息对象
    //   var message = {
    //     content: imageMessage,
    //     conversationType: conversationType,
    //     targetId: targetId
    //   }

    //   // 发送图片消息
    //   RongIMClient.getInstance().sendMessage(conversationType, targetId, message.content, {
    //     onSuccess: function (message) {
    //       console.log('Send image message successfully.', message)
    //     },
    //     onError: function (errorCode, message) {
    //       console.log('Send image message error: ' + errorCode)
    //     }
    //   })
    // },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.image = URL.createObjectURL(file.raw)
    },
    // 常用语
    expressionsClick (text) {
      console.log('text', text)
      this.handleSelectaite()
      // this.say = text
      // this.$refs['popovers'].doClose()
      // this.sendMessage()
      this.sam(text)
    },
    handleSelectaite () {
      this.$refs[`popoveraite`].doClose()
    },
    // usernameInput (val) {
    //   console.log('val', val)
    // },
    usernameInput (val) {
      if (val.replace(/(^\s*)|(\s*$)/g, '') === '') {
        console.log('未输入或者输入为空格')
        this.enterText = true
      } else {
        console.log('输入：', val)
        this.enterText = false
        // this.sendMessage()
      }
    },
    usernameInputs (val) {
      if (val.replace(/(^\s*)|(\s*$)/g, '') === '') {
        console.log('未输入或者输入为空格')
        this.enterText = true
      } else {
        console.log('输入：', val)
        this.enterText = false
        this.sendMessage()
      }
    },
    // 消息
    onClickLeft () {
      this.$router.go(-1)
    },
    addPromptInfo (prompt, userId = null) {
      //
      console.log(12113)
      console.log('prompt', prompt, userId)
      const _this = this

      // const avatarList = [
      //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2988245209,2476612762&fm=26&gp=0.jpg',
      //   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg',
      //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3684587473,1286660191&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=26&gp=0.jpg'
      // ]

      // 真实环境是通过登录 后台接口返回的 token 拿到的用户信息  我在这为为了模拟 所以给初始化后的用户随机生成一个头像
      // const avatar = avatarList[Math.floor(Math.random() * (3 + 1))]
      // const avatar = 'https://znzz.tech/loc/static/img/1 (2)_30e4b8e4.jpg'
      _this.showDatas.push(prompt)
      const timer = setInterval(() => {
        if (userId) {
          clearInterval(timer) // 路由跳转后销毁定时器
          _this.$store.commit('SET_UserId', { // 保存用户信息
            userId: userId,
            avatar: _this.$store.state.num.memberInfo.img
          })
          // _this.$store.commit('SET_TARGETID', _this.targetId)
          // this.$store.commit('SET_ANSWER', _this.showDatas)// 保存目标ID
          _this.states = true
          console.log('_this.$store.state.memberInfo', _this.$store.state.num.memberInfo, userId, _this.showDatas)
          // this.$refs.send.sendMessage()

          this.num()
          // this.$emit('res')

          // _this.$router.push({ name: 'RongCloud' })
        }
      }, 500)
    },
    initRongCloud () {
      var appkey = this.$store.state.num.appkey
      var token = this.$store.state.num.memberInfo.token
      if (!appkey || !token) {
        // alert('appkey 和 token 不能为空')
      } else {
        // 这个init 是我们之前撸的 `utils.js`
        init({
          appkey: appkey,
          token: token
        }, this.addPromptInfo)
      }
    },
    sendMessage () {
      // this.initRongCloud()
      this.resume()
      this.phoneState = false
      if (this.say !== '') {
        const _this = this
        // _this.initRongCloud()
        // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
        _this.answer = this.$store.state.num.answer // 消息列表
        _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
        _this.targetId = this.$store.state.num.targetId// 目标ID
        console.log('_this.memberInfo', _this.answer)
        console.log('_this.say', _this.say)
        // var msg = {}
        // if (this.image !== '') {
        //   // _this.say = this.image
        //   // msg = new RongIMLib.TextMessage({ content: _this.image, extra: _this.memberInfo.avatar })
        //   console.log('msg', msg)
        // } else {
        //   msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.avatar })
        // }
        // _this.say = RongIMLib.RongIMEmoji.symbolToEmoji(_this.say)
        console.log('this.say', _this.say)
        var msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.img })
        var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
        var targetId = _this.targetId // 目标 Id

        console.log('targetId', targetId)
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
            console.log('message', message)
            // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
            const say = {
              css: 'right',
              txt: message.content.content,
              headImg: _this.memberInfo.img,
              time: _this.nowTime,
              messageName: 'TextMessage',
              targetId: message.targetId

              // condition: 'false'

            }
            var sayList = say
            _this.answer.push(say)
            _this.sayList.push(say)
            console.log(say, _this.answer, _this.sayList)
            // localStorage.setItem('answer', JSON.stringify(_this.answer))
            // _this.$store.commit('SET_ANSWER', _this.answer)
            // console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)
            _this.image = ''
            _this.say = ''
            sayList = say
            // const this = this
          },
          onError: function (errorCode, message) {
            var info = ''
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时'
                break
              case RongIMLib.ErrorCode.UNKNOWN:
                info = '未知错误'
                break
              case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息'
                break
              case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中'
                break
            }
            console.log('发送失败: ' + info + errorCode)
            this.$message.warning('发送失败，刷新下页面吧')
          }
        })

        // console.log('你好', sayList)
        // this.say = ''
      }
    },
    sendInfo () {
      console.log(1313)
    },
    getEmo (index) {
      var textArea = document.getElementById('textarea')
      function changeSelectedText (obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str)
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length
          textArea.focus()
        } else if (document.selection) {
          // IE浏览器
          obj.focus()
          var sel = document.selection.createRange()
          sel.text = str
        }
      }
      changeSelectedText(textArea, this.faceList[index])
      this.say = textArea.value // 要同步data中的数据
      // console.log(this.faceList[index]);
      return
    },
    checkedEmoji (symbol, item) {
      this.enterText = false
      console.log('this.emojList', symbol)
      // this.stat.sendMsgVal += RongIMLib.RongIMEmoji.symbolToEmoji(symbol) // 表情包需要RongIMLib.RongIMEmoji.symbolToEmoji解析
      // this.emojiShow = false

      const emoji = []
      this.faceList.push(item)
      console.log('this', emoji, this.faceList)
      // this.$refs.popoverRef.doClose()
      this.say = this.say + item
    },
    // 交换沟通岗位
    async num () {
      console.log('13u9')
    },
    async nums (id, name) {
      console.log('13u9', id)
      const res = await getCommunication(this.comm_id, id)
      console.log('职位更改', res)
      if (res.code === 200) {
        this.position = id
        this.pidList.pid = id
        this.jobTitle = name
        if (this.changeColor === 1) {
          this.messageTxt = true
          this.helloChange()
        } else if (this.changeColor === 2) {
          this.messageTxt = true
          this.haveIntentionTo()
        } else if (this.changeColor === 3) {
          this.messageTxt = true
          this.inCommunicationC()
        } else if (this.changeColor === 4) {
          this.messageTxt = true
          this.posted()
        } else if (this.changeColor === 5) {
          this.messageTxt = true
          this.inappropriate()
        }
      } else {
        // this.$message.warning(res.data.msg)
      }
    },

    // 折叠消息
    open () {
      // this.graph = 'el-icon-caret-top'

      this.openDown = true
    },
    opens () {
      this.openDown = false
    },
    // 取消
    abrogate () {
      this.show = false
    },
    // 批量
    batch () {
      this.show = true
    }, // 边框  点击每一个联系人
    // tinct (i) {
    //   console.log('i', i)
    //   this.count = i
    // },
    async tinct (id, i, receiver, item) {
      this.sayList = []
      console.log('i', i, receiver, item)
      this.count = id
      this.uid = item.comm_info.last_interview_id
      console.log(this.uid)

      this.rongYun.sender_uid = i
      this.rongYun.receiver_uid = receiver
      this.information = item
      this.interviews = item.comm_info.interview_id
      console.log(this.rongYun)
      const res = await getRongyun(this.rongYun)
      console.log('信息', res)
      if (res.code === 200) {
        if (item.comm_info.comm_position_status === 2) {
          console.log(res.data.receiver, res.data.sender)
          this.$store.commit('SET_MEMBER', res.data.sender)
          this.$store.commit('SET_TARGETID', res.data.receiver.uid)
          const target = res.data.receiver.uid
          var answerList = []
          if (this.$store.state.num.answer.length === 0) {
            console.log(JSON.parse(sessionStorage.getItem('answer')))
            answerList = JSON.parse(sessionStorage.getItem('answer'))
          } else {
            answerList = this.$store.state.num.answer
          }
          // if (answerList.length !== 0) {
          //   const answers = answerList.filter(function (item, index) { return item.targetId === target })
          //   this.sayList = answers
          // }
          if (answerList !== null) {
            const answers = answerList.filter(function (item, index) { return item.targetId === target })
            this.sayList = answers
          }

          console.log('answers', answerList)
          // if (answers.length !== 0) {
          // this.sayList = answers
          console.log('this.sayList', this.sayList)
          // }
          // } else {
          //   this.sayList = []
          // }
          this.hr.name = item.left_data.user_name
          this.hr.sex = item.left_data.sex
          this.hr.state = item.left_data.online_status
          this.hr.work_date = item.left_data.work_date
          this.hr.education = item.left_data.education
          this.hr.status = item.left_data.status
          this.hr.age = item.left_data.age
          this.hr.comm_position = item.comm_info.comm_position
          this.hr.position_city = item.left_data.position_class_data.city
          this.hr.user_id = receiver
          this.hr.fileChange = item.comm_info.is_cv_exchanged
          this.hr.wechatChange = item.comm_info.is_wechat_exchanged
          this.hr.phoneChange = item.comm_info.is_phone_exchanged
          this.work = item.right_data
          this.pidResume = item.comm_info.comm_position_id
          this.comm_id = item.comm_info.comm_id
          this.InterviewDetails = item.comm_info.continue_interview

          console.log(this.work)
          // this.hr.company = item.position.enterprise.enterprise_name
          this.messageTxt = false
        } else {
          this.messageTxt = true
          this.$message.success('该职位已下线！')
        }

        // this.initRongCloud()
      } else {
        this.$message.success(res.data.msg)
      }
    },
    // 未读
    radioClick (e) {
      console.log('e', e)
      if (e === '1') {
        this.radio = '0'
      } else {
        this.radio = '1'
      }
    },
    // 新招呼
    async helloChange () {
      this.changeColor = 1
      if (this.pidList.pid === 0) {
        this.pidList = {}
      }
      // this.getJob()
      // // this.emojList = appData
      console.log('appData', appData)
      const res = await getpreChat(this.pidList)
      console.log('新招呼', res)
      this.messageTxt = true
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        // this.answer = []
        console.log('有人找')
        this.list = res.data.results

        console.log(this.list)
        this.show = false
      }
    },
    // 未回复
    async haveIntentionTo () {
      this.changeColor = 2
      if (this.pidList.pid === 0) {
        this.pidList = {}
      }
      const res = await getInterest(this.pidList)
      console.log('未回复', res)
      this.messageTxt = true
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        // this.answer = []
        console.log('有人找')
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 沟通中
    async inCommunicationC () {
      this.changeColor = 3
      if (this.pidList.pid === 0) {
        this.pidList = {}
      }
      const res = await getComming(this.pidList)
      console.log('沟通中', res)
      this.messageTxt = true
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        // this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 已约面
    async posted () {
      this.changeColor = 4
      if (this.pidList.pid === 0) {
        this.pidList = {}
      }
      const res = await getPosted(this.pidList)
      console.log('已约面', res)
      this.messageTxt = true
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        // this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 不合适
    async inappropriate () {
      this.changeColor = 5
      if (this.pidList.pid === 0) {
        this.pidList = {}
      }
      const res = await getReject(this.pidList)
      console.log('不合适', res)
      this.messageTxt = true
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        // this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // eslint-disable-next-line no-dupe-keys
    // num () {

    // },
    // 全选
    handleCheckedCitiesChange () {
      console.log('this.checkAll', this.checkAll)
      if (this.checkAll) {
        this.list.forEach(item => {
          // console.log(item)
          // this.arrList.push(item.enterprise_id)
          // console.log('123', this.arrList)
          item.checked = true // 只改变数据的状态
        })
      } else {
        this.list.forEach(item => {
          item.checked = false
        })
      }
    },
    sam (num) {
      console.log(num)
      this.resume()
      const _this = this
      // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
      _this.answer = this.$store.state.num.answer // 消息列表
      _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
      _this.targetId = this.$store.state.num.targetId// 目标ID
      var msg = new RongIMLib.TextMessage({ content: num, extra: _this.memberInfo.img })
      console.log('msg', msg)
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      var targetId = _this.targetId // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.log('message', message)
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          const say = {
            css: 'right',
            txt: message.content.content,
            headImg: _this.memberInfo.img,
            time: _this.nowTime,
            messageName: 'TextMessage',
            targetId: message.targetId

            // condition: 'false'

          }
          console.log('_this.memberInfo', say, message.content.content)
          _this.answer.push(say)
          _this.sayList.push(say)
          console.log(say, _this.answer, _this.sayList)
          // _this.$store.commit('SET_ANSWER', _this.answer)
          // localStorage.setItem('answer', JSON.stringify(_this.answer))
          // _this.$store.commit('SET_ANSWER', _this.answer)
          console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)
          _this.image = ''
          _this.say = ''
        },
        onError: function (errorCode, message) {
          var info = ''
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时'
              break
            case RongIMLib.ErrorCode.UNKNOWN:
              info = '未知错误'
              break
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = '在黑名单中，无法向对方发送消息'
              break
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = '不在讨论组中'
              break
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = '不在群组中'
              break
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = '不在聊天室中'
              break
          }
          console.log('发送失败: ' + info + errorCode)
          this.$message.warning('发送失败，刷新下页面吧')
        }
      })
    },
    async getJob () {
      const { data } = await getEnterprise()
      console.log('job', data)
      const list = Object.values(data.data)
      console.log('123', list)
      this.jobChange = data.data
      // if (JSON.stringify(data) === '{}') {
      //   console.log(2)
      //   // this.$message.success('暂无上线职位，去上线招聘岗位吧')
      // } else {
      //   console.log(123)
      //   //
      // }
      if (list.length === 0) {
        console.log(1)
        this.$confirm('暂无上线职位，去上线招聘岗位吧', '提示', {
          confirmButtonText: '确定', // 确认按钮的文字显示
          type: 'warning',
          center: true, // 文字居中显示
          showCancelButton: false, // 不显示取消按钮
          showClose: false, // 是否显示右上角的x
          closeOnClickModal: false
        }).then(() => {
          this.pidList.pid = 0
          this.$router.push('/department')
        })
      } else {
        console.log(2)
        const num = {
          name: '不限',
          id: 0
        }
        this.firm = list

        this.firm.unshift(num)
        this.pidList.pid = this.firm[0].id
        this.position = this.firm[0].id
        console.log('12', this.pidList)
        this.helloChange()
        // this.pid = list[0].id
        // console.log('122', this.pid)
      }
    },
    // 点击在线职位
    fast (e, id, name) {
      if (e.target.tagName === 'INPUT') return
      console.log(id, this.changeColor)
      this.pidList.pid = id
      this.jobTitle = name
      if (this.changeColor === 1) {
        this.messageTxt = true
        this.helloChange()
      } else if (this.changeColor === 2) {
        this.messageTxt = true
        this.haveIntentionTo()
      } else if (this.changeColor === 3) {
        this.messageTxt = true
        this.inCommunicationC()
      } else if (this.changeColor === 4) {
        this.messageTxt = true
        this.posted()
      } else if (this.changeColor === 5) {
        this.messageTxt = true
        this.inappropriate()
      }
    },
    // 在线简历
    async resumeOnline (id) {
      console.log(id)
      this.pid = id
      console.log('id', this.pid)
      // this.title = '人才推荐'
      // console.log('title', this.title)
      const res = await getResume(id, this.pidResume)
      console.log('简历', res)
      this.resumeList = res.data.data
      this.detailss = true
      // this.interlinkage = res.data.data.cvfile
    },
    // 附件简历
    async blogroll (id) {
      console.log('13123235135')
      const res = await getResume(id, this.pidResume)
      console.log('简历', res)
      this.interlinkage = res.data.data.cvfile
      if (res.data.data.cvfile !== '') {
        var downloadPath = `https://znzz.tech/loc/${res.data.data.cvfile}`
        var downloadLink = document.createElement('a')
        downloadLink.style.display = 'none' // 使其隐藏
        downloadLink.href = downloadPath
        downloadLink.download = ''
        downloadLink.click()
        // document.body.removeChild(downloadLink)
      } else {
        this.$message.success('暂无简历可查看')
        // this.numList = false
      }
    }
  }

}

</script>
<style scoped lang="scss">
.bd {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
.position {
  padding-left: 30px;
  height: 110px;
  background-color: #fff;
  // background-color: pink;
  .position-manage {
    height: 65px;
    // background-color: aqua;s
    line-height: 65px;
    font-weight: 700;
  }
  .position-state {
    height: 30px;
    // background-color: aquamarine;
    .line {
      height: 40px;
      font-size: 15px;
      width: 75px;
      // background-color: pink;
      text-align: center;
    }
    .bt {
      display: flex;
    }
  }
}
.interview {
  height: 50px;
  border-bottom: 1px solid #e6e3e3;
  line-height: 50px;
  padding-left: 30px;
  color: #256efd;
  font-weight: 600;
  font-size: 20px;
}
.bt {
  // border-bottom: 2px solid #256efd;
  color: #256efd;
  background-color: #fff;
}
.grid-content {
  // height: 45px;
  // width: 60px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  // margin-bottom: 10px;
  // background-color: pink;
}
.max {
  height: 100%;
  overflow: hidden;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.num {
  width: 100%;
  height: 655px;
  background-color: #fff;
  // margin-top: 10px;
  position: relative;
  display: flex;
  // background-color: #256efd;
  margin-bottom: 20px;
  .footer {
    position: absolute;
    bottom: 0px;
    left: 0;
    // margin-top: 20px;
  }
}
.left {
  width: 25%;
  height: 695px;
  padding-left: 25px;
  // border-right: 1px solid #e6e3e3;
}
.right {
  width: 75%;
  .header {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    // background-color: pink;
    font-size: 12px;
    padding-left: 20px;
    border-bottom: 1px solid #e6e3e3;
    display: flex;
    .age {
      padding: 0px 10px;
      border-right: 1px solid #e6e3e3;
    }
  }
  .icons {
    // height: 10px;
    // background-color: pink;
    text-align: center;
    // line-height: 30px;
    border-bottom: 1px solid #e6e3e3;
    color: rgb(211, 220, 230);
    // width: 80%;
  }
}
::v-deep .el-input__inner {
  height: 33px;
}
.state {
  // margin-top: 20px;
  display: flex;
  border-right: 1px solid #e6e3e3;
}
::v-deep
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
  .el-radio__inner {
  box-shadow: 0 0 2px 2px #fff;
}
// .num {
//   position: relative;
//   background-color: #256efd;
//   .footer {
//     position: absolute;
//     bottom: 0px;
//     left: 0;
//     // margin-top: 20px;
//   }
// }
.innerbox {
  margin-top: 10px;
  height: 640px;
  overflow-y: auto;
  width: 100%;
  .textnum {
    height: 100%;
    width: 100%;
    // background-color: pink;
    font-size: 15px;
    line-height: 500px;
    text-align: center;
    color: #636567;
  }

  .box {
    height: 70px;

    // border: 1px solid #256efd;
    // background-color: pink;
    // padding-top: 10px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 280px;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 100px;
      position: relative;
    }
    .text {
      width: 15px;
      height: 15px;
      border-radius: 100px;
      background-color: red;
      position: absolute;
      left: 60px;
      top: 10px;
      text-align: center;
      line-height: 15px;
      color: #fff;
    }
    .texte {
      width: 15px;
      height: 15px;
      border-radius: 100px;
      background-color: red;
      position: absolute;
      left: 30px;
      top: 0px;
      text-align: center;
      line-height: 15px;
      color: #fff;
    }
  }
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
  // color: none;
}
.bg {
  background-color: rgb(240, 242, 245);
}
/*滚动条样式*/
.innerbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0.5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.5px;
}
.innerbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgb(244, 246, 249);
  background: rgba(0, 0, 0, 0.2);
}
.innerbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

::v-deep main.el-main.right {
  // overflow: hidden !important;
}
.tall {
  height: 640px;
}
::v-deep svg.svg-icon {
  width: 20px;
  // padding: 0px 10px;
}
.Btn {
  height: 35px;
  padding: 8px 2px;
  font-size: 14px;
  // padding-top: 10px;
  background-color: rgb(0, 186, 189);
  color: #fff;
}
.el-popover {
  height: 200px;
  width: 400px;
  overflow: scroll;
  overflow-x: auto;
}
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
}
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
::v-deep .el-textarea__inner {
  border: none;
  line-height: 1;
}
.innerboxs::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0.1px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.1px;
}
.innerboxs::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgb(244, 246, 249);
  background: rgba(0, 0, 0, 0.2);
}
.innerboxs::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.frequent-expressions {
  // background-color: pink;
  .frequent {
    // width: 100px;
    height: 40px;
    // background-color: #256efd;
    font-size: 17px;
    line-height: 40px;
    border-bottom: 1px solid #e6e3e3;
  }
  .frequent:hover {
    color: rgb(0, 186, 189);
  }
}
div#el-popover-700 {
  padding: 0px;
}
::v-deep [data-v-72b21b76] .el-textarea__inner {
  height: 55px;
}
::-webkit-scrollbar {
  width: 2px; /*滚动条宽度*/
  height: 2px; /*滚动条高度*/
}
::v-deep .el-textarea__inner::-webkit-scrollbar-thumb {
  background-color: rgba(168, 168, 168, 0.4); /*滚动条默认显示的颜色*/
}

::v-deep .el-textarea__inner::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: white; /*滚动条背景色显示的颜色*/
}
.block {
  width: 60px;
  height: 20px;
  font-size: 12px;
  padding: 1px 0px 0px 2px;
  margin-top: 8px;
  border: 1px solid #d3cccc;
  background-color: #fff;
  // display: inline-block;
  // width: 60px;
  // height: 20px;
  // // background-color: pink;
  // font-size: 11px;
  // // margin-top: 1px;
  // text-align: center;
  // line-height: 20px;
  // border: 1px solid #d3cccc;
  color: #8a8a8a;

  // margin-right: 8px;
  // border-radius: 5px;
}
::v-deep .el-upload:focus {
  color: #8a8a8a;
}
.small {
  // cursor: not-allowed;
  pointer-events: none;
  background-color: #f2efef;
  color: #b3a9a9;
}
::v-deep div#el-popover-7023 {
  border-radius: 0;
  color: black;
  background-color: #fff;
  height: 100%;
}
.chatText.el-textarea {
  height: 90px;
}
.search-checkbox {
  // margin: 0 auto;
  // margin-left: 25px;
  // width: 800px;
  // margin-bottom: 15px;
  padding-left: 20px;
  display: flex;
  background-color: #fff;
  font-size: 14px;
  height: 50px;
  margin-top: 10px;
  border-bottom: 1px solid #e6e3e3;
  align-items: center;
  .radio {
    margin-right: 10px;
  }
}
::v-deep.el-button [class*='el-icon-'] + span {
  margin-left: 0px;
}
::v-deep button:hover {
  // color: #fff;
  // border-color: #d3cccc;
  // background-color: #fff;
}
::v-deep button:focus {
  color: #8a8a8a;
  border-color: #d3cccc;
  background-color: #fff;
}
::v-deep .el-input__icon {
  line-height: 26px;
}
::v-deep .el-date-editor .el-range-separator {
  line-height: 26px;
}
</style>

