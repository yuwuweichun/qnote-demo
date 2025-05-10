<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const note = ref({
  title: '',
  content: '',
  color: '',
  updatedAt: '' // 新增时间戳字段
})

onMounted(() => {
  // 从localStorage加载记事本
  const notes = JSON.parse(localStorage.getItem('q-notes') || '[]')
  const index = route.params.id

  if (index >= 0 && index < notes.length) {
    note.value = { ...notes[index] }
  }
})

const updateNote = () => {
  // 更新时间戳
  note.value.updatedAt = new Date().toISOString()

  // 获取所有记事本
  const notes = JSON.parse(localStorage.getItem('q-notes') || '[]')
  const index = route.params.id

  // 更新记事本
  notes[index] = note.value

  // 保存回localStorage
  localStorage.setItem('q-notes', JSON.stringify(notes))

  // 返回首页
  router.push('/')
}
</script>


<template>
  <q-page class="edit-page q-pa-md">
    <q-form @submit="updateNote">
      <q-input
        v-model="note.title"
        label="标题"
        class="q-mb-md"
      />

      <q-input
        v-model="note.content"
        label="内容"
        type="textarea"
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
