<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'

const router = useRouter()
const newNote = ref({
  title: '',
  content: '',
  color: generatePastelColor(), // 添加随机颜色
  updatedAt: new Date().toISOString() // 新增时间戳字段
})


// 生成柔和的随机颜色
function generatePastelColor() {
  const colors = [
    '#FFD3B6', // 浅橙色
    '#FFAAA5', // 浅红色
    '#DCEDC1', // 浅绿色
    '#A8E6CF', // 浅蓝绿色
    '#D4A5A5', // 浅紫色
    '#FF8B94', // 粉红色
    '#B5EAD7', // 薄荷绿
    '#C7CEEA', // 淡紫色
    '#20A6E2', // 淡蓝色
    '#61FFFF', // 浅青色
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const addNote = () => {
  // 更新时间戳
  newNote.value.updatedAt = new Date().toISOString()

  // 获取现有记事本
  const notes = JSON.parse(localStorage.getItem('q-notes') || '[]')

  // 添加新记事本
  notes.push(newNote.value)

  // 保存回localStorage
  localStorage.setItem('q-notes', JSON.stringify(notes))

  // 返回首页
  router.push('/')
}
</script>

<template>
  <q-page class="add-page q-pa-md">
    <q-form @submit="addNote">
      <q-input
        v-model="newNote.title"
        label="标题"
        class="q-mb-md text-h6"
      />

      <q-input
        v-model="newNote.content"
        label="内容"
        type="textarea"
        class="text-subtitle1"
      />

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          round
          icon="radio_button_checked"
          color="primary"
          size="lg"
          type="submit"
        />
      </q-page-sticky>
    </q-form>
  </q-page>
</template>

<style scoped>

</style>
