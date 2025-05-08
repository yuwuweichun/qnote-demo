<template>
  <q-page class="q-pa-md">
    <q-form @submit="addNote">
      <q-input
        v-model="newNote.title"
        label="标题"
        class="q-mb-md"
      />

      <q-input
        v-model="newNote.content"
        label="内容"
        type="textarea"
        class="q-mb-md"
      />

      <div class="row justify-end">
        <q-btn
          label="取消"
          class="q-mr-sm"
          @click="router.go(-1)"
        />
        <q-btn
          label="保存"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const newNote = ref({
  title: '',
  content: '',
  color: generatePastelColor() // 添加随机颜色
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
    '#C7CEEA'  // 淡紫色
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const addNote = () => {
  // 获取现有备忘录
  const notes = JSON.parse(localStorage.getItem('q-notes') || '[]')

  // 添加新备忘录
  notes.push(newNote.value)

  // 保存回localStorage
  localStorage.setItem('q-notes', JSON.stringify(notes))

  // 返回首页
  router.push('/')
}
</script>