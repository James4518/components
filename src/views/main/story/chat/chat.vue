<template>
  <div v-if="isShow">
    <textarea id="chat"></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import Tinymce from "tinymce";
const zh_CN = require("@/components/page-editor/language/zh_CN");

export default defineComponent({
  name: "chat",
  setup() {
    const isShow = ref(true);
    onMounted(() => {
      Tinymce.addI18n("zh_CN", zh_CN);
      Tinymce.init({
        selector: "#chat",
        language: "zh_CN",
        width: 1000,
        height: 300,
        content_style: "p {margin: 5px 0;}",
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        toolbar_mode: "wrap",
        plugins:
          "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern autosave autoresize",
        toolbar:
          "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent formatpainter | \
          styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
          table image media charmap hr pagebreak insertdatetime | fullscreen preview",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        branding: false
      });
    });
    onBeforeUnmount(() => {
      isShow.value = false;
    });
    return {
      isShow
    };
  }
});
</script>

<style scoped></style>
