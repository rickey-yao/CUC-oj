<template>
  <div class="layout">
    <Layout>
      <Header/>
      <Layout v-if="!goUserHome" :style="{padding: '92px 8% 24px'}">
        <Row :style="{height:'495px'}">
          <Col :sm="9" :lg="5">
            <Sider></Sider>
          </Col>
          <Col :sm="15" :lg="19">
            <router-view></router-view>
          </Col>
          
        </Row>
      </Layout>
      <Layout v-else>
        <router-view></router-view>
      </Layout>  
      <Footer>
        <div class="footer">
          <hr>
          <br>
          <h3>✎&nbsp;&nbsp;Welcome！&nbsp;✔</h3>
          <p>
            Powered by
            <a href="/">CUC-OJ</a>
            <span>&nbsp; Version: 1.0</span>
          </p>
        </div>
      </Footer>
      <BackTop></BackTop>
    </Layout>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Sider from "@/components/Sider";
export default {
  name: "App",
  components: {
    Header,
    Sider
  },
  computed: {
    goUserHome() {
      if(this.$route.path.indexOf('user') != -1){
        return true
      }
      return false
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: lightgray;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.footer {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: small;
}
>>>.ivu-back-top {
  background:#4bc0ff;
}
</style>
