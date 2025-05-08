<template>
  <q-page class="q-pa-md">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const note = ref({
  title: '',
  content: ''
})

onMounted(() => {
  // 从localStorage加载备忘录
  const notes = JSON.parse(localStorage.getItem('q-notes') || '[]')
  const index = route.params.id

  if (index >= 0 && index < notes.length) {
    note.value = { ...notes[index] }
  }
})

const updateNote = () => {
  // 获取所有备忘录
  const notes = JSON.parse(localStorage.getItem('q-notes') || '[]')
  const index = route.params.id

  // 更新备忘录
  notes[index] = note.value

  // 保存回localStorage
  localStorage.setItem('q-notes', JSON.stringify(notes))

  // 返回首页
  router.push('/')
}
</script>