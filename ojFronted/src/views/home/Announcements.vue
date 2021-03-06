<template>
  <Panel shadow :padding="10">
    <div slot="title">{{title}}</div>
    <div slot="extra">
      <Button v-if="listVisible" type="info" @click="init" :loading="btnLoading">刷新</Button>
      <Button v-else ghost icon="ios-undo" @click="goBack">返回</Button>
    </div>

    <transition-group name="announcement-animate" mode="in-out">
      <div class="no-announcement" v-if="!announcements.length" key="no-announcement">
        <p>目前没有公告呀</p>
      </div>
      <template v-if="listVisible">
        <ul class="announcements-container" key="list">
          <li v-for="announcement in announcements" :key="announcement.title">
            <div class="flex-container">
              <div class="title">
                <a class="entry" @click="goAnnouncement(announcement)">{{announcement.title}}</a>
              </div>
              <div class="date">{{announcement.create_time }}</div>
              <div class="creator">By {{announcement.created_by.username}}</div>
            </div>
          </li>
        </ul>
        <Pagination
          v-if="!isContest"
          key="page"
          :total="total"
          :page-size="limit"
          @on-change="getAnnouncementList"
        ></Pagination>
      </template>

      <template v-else>
        <div v-html="announcement.content" key="content" class="content-container markdown-body"></div>
      </template>
    </transition-group>
  </Panel>
</template>

<script>
import Pagination from "../../components/Pagination";

export default {
  name: "Announcement",
  components: {
    Pagination
  },
  data() {
    return {
      limit: 10,
      total: 10,
      btnLoading: false,
      announcements: [
        {
          title:'你好呀',
          created_by : {
            username:'rickey',
          },
          
          create_time:'2019/6/20',
          content:'哈喽哈喽哈'
        }
      ],
      announcement: "",
      listVisible: true
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.isContest) {
        this.getContestAnnouncementList();
      } else {
        this.getAnnouncementList();
      }
    },
    getAnnouncementList(page = 1) {
      let params = {
        limit: this.limit,
        offset: (page - 1) * this.limit
      };
      this.btnLoading = true;
     
    },
    getContestAnnouncementList() {
      this.btnLoading = true;
      
    },
    goAnnouncement(announcement) {
      this.announcement = announcement;
      this.listVisible = false;
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.Hub.Queue([
            "Typeset",
            window.MathJax.Hub,
            "problem-content"
          ]);
        }
      });
    },
    goBack() {
      this.listVisible = true;
      this.announcement = "";
    }
  },
  computed: {
    title() {
      if (this.listVisible) {
        return this.isContest ? "Contest Announcements" : "Announcements";
      } else {
        return this.announcement.title;
      }
    },
    isContest() {
      return !!this.$route.params.contestID;
    }
  }
};
</script>

<style scoped lang="less">
.announcements-container {
  margin-top: -10px;
  margin-bottom: 10px;
  li {
    padding-top: 15px;
    list-style: none;
    padding-bottom: 15px;
    margin-left: 20px;
    font-size: 16px;
    border-bottom: 1px solid rgba(187, 187, 187, 0.5);
    &:last-child {
      border-bottom: none;
    }
    .flex-container {
      .title {
        flex: 1 1;
        text-align: left;
        padding-left: 10px;
        a.entry {
          color: #495060;
          &:hover {
            color: #2d8cf0;
            border-bottom: 1px solid #2d8cf0;
          }
        }
      }
      .creator {
        flex: none;
        width: 200px;
        text-align: center;
      }
      .date {
        flex: none;
        width: 200px;
        text-align: center;
      }
    }
  }
}
.content-container {
  padding: 0 20px 20px 20px;
}

.no-announcement {
  text-align: center;
  font-size: 16px;
}

.announcement-animate-enter-active {
  animation: fadeIn 1s;
}
</style>
