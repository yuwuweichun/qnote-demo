<template>
  <q-page class="q-pa-md">
    <!-- 备忘录列表 -->
    <q-list bordered separator class="note-list">
      <q-item
        v-for="(note, index) in notes"
        :key="index"
        clickable
        @click="editNote(index)"
        @touchstart="startLongPress(index)"
        @touchend="clearLongPress"
        @mousedown="startLongPress(index)"
        @mouseup="clearLongPress"
        :style="{ backgroundColor: note.color || '#ffffff' }"
      >
        <q-item-section>
          <q-item-label class="note-title">{{ note.title || '无标题' }}</q-item-label>
          <q-item-label caption class="note-content">{{ note.content }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>


    <!-- 添加按钮 - 圆形浮动按钮 -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="add"
        size="lg"
        @click="router.push('/add')"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar() // 初始化
const router = useRouter()

// 备忘录列表
const notes = ref([])

// 从localStorage加载备忘录
const loadNotes = () => {
  const savedNotes = localStorage.getItem('q-notes')
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes)
  }
}

// 保存备忘录到localStorage
const saveNotes = () => {
  localStorage.setItem('q-notes', JSON.stringify(notes.value))
}

let longPressTimer = null
const noteToDelete = ref(null)

// 开始长按
const startLongPress = (index) => {
  longPressTimer = setTimeout(() => {
    showDeleteDialog(index)
  }, 1000) // 1秒长按触发
}

// 清除长按计时器
const clearLongPress = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

// 显示删除对话框
const showDeleteDialog = (index) => {
  noteToDelete.value = index
  $q.dialog({
    title: '确认删除',
    message: '确定要删除这个备忘录吗？',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteNote(index)
  })
}

// 删除备忘录
const deleteNote = (index) => {
  notes.value.splice(index, 1)
  saveNotes()
}

// 编辑备忘录
const editNote = (index) => {
  router.push(`/edit/${index}`)
}

// 组件挂载时加载备忘录
onMounted(() => {
  loadNotes()
})
</script>

<style scoped>
.note-list {
  margin-top: 16px;
}

.note-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.note-content {
  font-size: 16px !important;
  color: #555 !important;
  white-space: pre-wrap;
}
</style>