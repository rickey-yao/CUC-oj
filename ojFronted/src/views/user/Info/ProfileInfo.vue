<template>
  <div class="setting-main">
    <div class="section-title">更改头像</div>
    <template v-if="!avatarOption.imgSrc">
      <Upload
        type="drag"
        class="mini-container"
        accept=".jpg, .jpeg, .png, .bmp, .gif"
        action=""
        :before-upload="handleSelectFile"
      >
        <div style="padding: 30px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>请将图像拖动到这里或者点击选择图像</p>
        </div>
      </Upload>
    </template>

    <template v-else>
      <Row class="flex-container">
        <Col span="10" class="cropper-main inline">
          <VueCropper
            ref="cropper"
            autoCrop
            fixed
            :autoCropWidth="200"
            :autoCropHeight="200"
            :img="avatarOption.imgSrc"
            :outputSize="avatarOption.size"
            :outputType="avatarOption.outputType"
            :info="true"
            @realTime="realTime"
          ></VueCropper>
        </Col>
        <Col span="4">
          <ButtonGroup vertical class="cropper-btn">
            <Button @click="rotate('left')">
              <Icon type="md-return-left" size="20"></Icon>
            </Button>
            <Button @click="rotate('right')">
              <Icon type="md-return-right" size="20"></Icon>
            </Button>
            <Button @click="reselect">
              <Icon type="md-refresh" size="20"></Icon>
            </Button>
            <Button @click="finishCrop">
              <Icon type="md-checkmark" size="20"></Icon>
            </Button>
          </ButtonGroup>
        </Col>
        <Col span="6" class="cropper-preview" :style="previewStyle">
          <div :style="preview.div">
            <img :src="avatarOption.imgSrc" :style="preview.img">
          </div>
        </Col>
      </Row>
    </template>
    <Modal v-model="uploadModalVisible" 
           title="上传头像">
      <div class="upload-modal">
        <p class="notice">你的头像将被设置为:</p>
        <img :src="uploadImgSrc">
      </div>
      <div slot="footer">
        <Button @click="uploadAvatar" :loading="loadingUploadBtn">上传</Button>
      </div>
    </Modal>

    <div class="section-title">个人信息</div>
    <Form ref="formProfile" :model="formProfile">
      <Row type="flex" :gutter="30" justify="space-around">
        <Col :span="11">
          <FormItem label="真实姓名">
            <Input v-model="formProfile.real_name"/>
          </FormItem>
          <FormItem label="学校">
            <Input v-model="formProfile.school"/>
          </FormItem>
          <FormItem label="专业">
            <Input v-model="formProfile.major"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="updateProfile" :loading="loadingSaveBtn">保存修改</Button>
          </FormItem>
        </Col>

        <Col :span="11">
          <FormItem label="简介">
            <Input v-model="formProfile.note"/>
          </FormItem>
          <FormItem label="博客地址">
            <Input v-model="formProfile.blog"/>
          </FormItem>
          <FormItem label="Github地址">
            <Input v-model="formProfile.github"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { VueCropper} from "vue-cropper"

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      loadingSaveBtn: false,
      loadingUploadBtn: false,
      uploadModalVisible: false,
      preview: {},
      uploadImgSrc: "",
      avatarOption: {
        imgSrc: "",
        size: 0.8,
        outputType: "png"
      },
      formProfile: {
        real_name: "",
        note: "",
        major: "",
        blog: "",
        school: "",
        github: ""
      }
    };
  },
  methods: {
    checkFileType(file) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.name)) {
        this.$Notice.warning({
          title: "不支持的文件格式",
          desc:
            file.name +
            " 格式不正确，请选择常见的图片格式"
        });
        return false;
      }
      return true;
    },
    checkFileSize(file) {
      // max size is 2MB
      if (file.size > 2 * 1024 * 1024) {
        this.$Notice.warning({
          title: "图片大小超过最大了",
          desc:
            "图片" +
            file.name +
            " 太大了，你可以上传图片大小最大为2M"
        });
        return false;
      }
      return true;
    },
    handleSelectFile(file) {
      let isOk = this.checkFileType(file) && this.checkFileSize(file);
      if (!isOk) {
        return false;
      }
      let reader = new window.FileReader();
      reader.onload = e => {
        this.avatarOption.imgSrc = e.target.result;
      };
      reader.readAsDataURL(file);
      return false;
    },
    realTime(data) {
      this.preview = data;
    },
    rotate(direction) {
      if (direction === "left") {
        this.$refs.cropper.rotateLeft();
      } else {
        this.$refs.cropper.rotateRight();
      }
    },
    reselect() {
      this.$Modal.confirm({
        title: '注意',
        content: "此操作将取消您的修改，是否继续?",
        onOk: () => {
          this.avatarOption.imgSrc = "";
        }
      });
    },
    finishCrop() {
      this.$refs.cropper.getCropData(data => {
        this.uploadImgSrc = data;
        this.uploadModalVisible = true;
      });
    },
    uploadAvatar() {
      
    },
    updateProfile() {
      
    }
  },
  computed: {
    previewStyle() {
      return {
        width: this.preview.w + "px",
        height: this.preview.h + "px",
        overflow: "hidden"
      };
    }
  }
};
</script>

<style lang="less" scoped>
.inline {
  display: inline-block;
}
.copper-img {
  width: 400px;
  height: 300px;
}
.flex-container {
  margin-bottom: 10px;
  .cropper-main {
    .copper-img;
  }
  .cropper-btn {
    margin-left: 5px;
    vertical-align: top;
  }
  .cropper-preview {
    box-shadow: 0 0 1px 0;
    .copper-img;
  }
}

.upload-modal {
  .notice {
    font-size: 16px;
    display: inline-block;
    vertical-align: top;
    padding: 10px;
    padding-right: 15px;
  }
  img {
    box-shadow: 0 0 1px 0;
    border-radius: 50%;
    display:block;
    width:40%;
    height:30%;
    margin:auto; 
  }
}
</style>
