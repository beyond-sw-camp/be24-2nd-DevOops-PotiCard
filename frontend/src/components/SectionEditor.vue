<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],

  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],

];
</script>

<template>
  <QuillEditor :toolbar="toolbarOptions" placeholder="프로젝트의 주요 성과와 해결 과정을 작성해주세요" theme="snow" />
</template>

<style>
/* 컨테이너고정 높이를 갖지 않도록 설정 */
.ql-container {
  height: auto !important;
}

/* 실제 글 쓰는 영역 설정 */
.ql-editor {
  min-height: 400px;
  /* 시작 높이 */
  max-height: 4000px;
  /* 이 높이까지는 늘어남 */
  overflow-y: auto;
  /* 4000px 넘어가면 그때 스크롤 생김 */
}

.ql-toolbar {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  border-color: #e5e7eb;
}

/* 에디터 본문 (아래쪽) 둥글게 깎기 */
.ql-container {
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-color: #e5e7eb;
}

/* Placeholder 색상 */
.ql-editor.ql-blank::before {
  color: #9ca3af !important;
  font-style: normal;
  opacity: 1;
}
</style>

<style scoped></style>