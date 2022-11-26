<template>
  <div class="content">
    <div class="container-left">
      <img src="@/assets/images/login/center_img.svg" />
    </div>
    <div class="container-right">
      <div class="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fupinqingkuang"></use>
        </svg>
        <span>精准扶贫系统</span>
      </div>
      <div class="form">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  background-color: #3a71ff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .container-left {
    position: relative;
    margin-right: 8%;
    img {
      width: 675px;
      height: 432px;
    }
  }
  .container-right {
    position: relative;
    z-index: 2;
    width: 480px;
    height: 430px;
    background-color: #fff;
    border-radius: 8px;
    @include flex-center;
    flex-direction: column;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .title {
      @include flex-center;
      height: 32px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 16px;
    }
    .form {
      flex: 1;
      width: 300px;
      margin: 0 auto;
    }
  }
}
</style>
