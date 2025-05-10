<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const $q = useQuasar() // 初始化
const router = useRouter()

// 记事本列表
const notes = ref([])

// 从localStorage加载记事本
const loadNotes = () => {
  const savedNotes = localStorage.getItem('q-notes')
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes)
  }
}

// 保存记事本到localStorage
const saveNotes = () => {
  localStorage.setItem('q-notes', JSON.stringify(notes.value))
}

let longPressTimer = null
const noteToDelete = ref(null)

// 开始长按
const startLongPress = (index) => {
  const startTime = Date.now() // 记录开始时间

  longPressTimer = setTimeout(() => {
    const duration = Date.now() - startTime // 计算实际持续时间
    console.log(`长按已触发，持续时长: ${duration}ms`)
    showDeleteDialog(index)
  }, 500) // 长按触发的时长
}

// 清除长按计时器
const clearLongPress = () => {
  if (longPressTimer) {
    console.log('长按未达到触发时长已释放')
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

// 显示删除对话框
const showDeleteDialog = (index) => {
  noteToDelete.value = index
  $q.dialog({
    title: '确认删除',
    message: '确定要删除这个记事本吗？',
    cancel: true,
    persistent: true,
    ok: {
      label: '确认',  // 将OK改为中文"确认"
      color: 'primary'
    },
    cancel: {
      label: '取消',  // 将CANCEL改为中文"取消"
      color: 'negative'
    }
  }).onOk(() => {
    deleteNote(index)
  })
}

// 删除记事本
const deleteNote = (index) => {
  notes.value.splice(index, 1)
  saveNotes()
}

// 编辑记事本
const editNote = (index) => {
  router.push(`/edit/${index}`)
}

// 添加日期格式化函数
const formatDate = (dateString) => {
  if (!dateString) return '未编辑'
  const date = new Date(dateString)
  return format(date, 'MM/dd HH:mm', { locale: zhCN })
}

// 组件挂载时加载记事本
onMounted(() => {
  loadNotes()
})
</script>

<template>
  <q-page class="q-pa-md">
    <!-- 改为网格布局的记事本卡片 -->
    <div class="row q-col-gutter-md">
      <div
        v-for="(note, index) in notes"
        :key="index"
        class="col-xs-12 col-sm-6"
      >
        <q-card
          class="note-card"
          :style="{ backgroundColor: note.color || '#ffffff' }"
          @click="editNote(index)"
          @touchstart="startLongPress(index)"
          @touchend="clearLongPress"
          @mousedown="startLongPress(index)"
          @mouseup="clearLongPress"
        >
          <q-card-section>
            <div class="note-title">{{ note.title || '无标题' }}</div>
            <div class="note-content">{{ note.content }}</div>
          </q-card-section>
          <!-- 添加时间显示 -->
          <q-card-actions align="right" class="q-px-md q-pb-md">
            <div class="text-caption text-grey-6">
              {{ formatDate(note.updatedAt) }}
            </div>
          </q-card-actions>

        </q-card>
      </div>
    </div>

    <!-- 添加按钮 -->
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

<style scoped>
.note-card {
  min-height: 120px;
  max-height: 300px;
  height: auto;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.note-card:active {
  transform: scale(0.98);
}

.note-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  word-break: break-word;
}

.note-content {
  font-size: 16px;
  color: #555;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 6; /* 限制最多显示6行 */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  flex-grow: 1;
}

/* 响应式间距 */
.row.q-col-gutter-md {
  margin-left: -8px;
  margin-right: -8px;
}

.row.q-col-gutter-md > div {
  padding-left: 8px;
  padding-right: 8px;
}
</style>