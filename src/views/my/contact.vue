<template>
  <div class='contact-page'>
    <HeaderBar title="联系我们" :shadow="true"></HeaderBar>
    <div class="content">
      <p>若您有任何疑问，请通过下面邮件联系我们。</p>
      <a class="email"  href="mailto:xjy1606a@163.com" target="_blank">xjy1606a@163.com</a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return { }
    },
    methods: {
    },
  }
</script>
<style lang='less' scoped>
  .contact-page {
    flex:1;
    background: #FFF;
    .content {
      padding:.5rem .3rem;
      p {
        font-size:.26rem;
      }
      .email {
        display: block;
        margin-top:.5rem;
        text-align: center;
        font-size:.3rem;
        color:blue;
      }
    }
  }
</style>