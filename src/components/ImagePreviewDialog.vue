<template>
  <v-dialog :model-value="modelValue" fullscreen transition="fade-transition" @update:model-value="onDialogUpdate"
    @keydown.left.prevent="prevImage" @keydown.right.prevent="nextImage" @keydown.esc.prevent="close">
    <div class="ip-lightbox-shell" @click="close">
      <div v-if="titleText" class="ip-lightbox-title">
        {{ titleText }}
      </div>

      <div class="ip-lightbox-top-actions" @click.stop>
        <v-tooltip text="Rotacionar para a esquerda" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="ip-action-btn" variant="text" @click="rotateLeft" :disabled="!currentSrc">
              <v-icon :icon="mdiRotateLeft" size="22" />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Rotacionar para a direita" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="ip-action-btn" variant="text" @click="rotateRight"
              :disabled="!currentSrc">
              <v-icon :icon="mdiRotateRight" size="22" />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Diminuir zoom" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="ip-action-btn" variant="text" @click="zoomOut"
              :disabled="!currentSrc || zoom <= 0.6">
              <v-icon :icon="mdiMagnifyMinusOutline" size="22" />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Aumentar zoom" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="ip-action-btn" variant="text" @click="zoomIn"
              :disabled="!currentSrc || zoom >= 3.6">
              <v-icon :icon="mdiMagnifyPlusOutline" size="22" />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Baixar imagem" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="ip-action-btn" variant="text" @click="downloadCurrentImage"
              :disabled="!currentSrc">
              <v-icon :icon="mdiDownload" size="22" />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Fechar" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="ip-action-btn ip-action-btn--close" variant="text" @click="close">
              <v-icon :icon="mdiClose" size="24" />
            </v-btn>
          </template>
        </v-tooltip>
      </div>

      <div class="ip-lightbox-content" @click.stop>
        <transition :name="slideDirection === 'prev' ? 'ip-slide-prev' : 'ip-slide-next'">
          <div v-if="currentSrc" :key="`${activeIndex}-${currentSrc}`" class="ip-lightbox-image-frame">
            <img :src="currentSrc" :alt="titleText || 'Visualização de imagem'" class="ip-lightbox-image"
              :style="imageStyle" loading="lazy">
          </div>
        </transition>
      </div>

      <div v-if="imageItems.length > 1" class="ip-lightbox-bottom-nav" @click.stop>
        <v-btn icon variant="text" class="ip-nav-btn" @click="prevImage">
          <v-icon :icon="mdiChevronLeft" size="28" />
        </v-btn>

        <span class="ip-counter">{{ activeIndex + 1 }} / {{ imageItems.length }}</span>

        <v-btn icon variant="text" class="ip-nav-btn" @click="nextImage">
          <v-icon :icon="mdiChevronRight" size="28" />
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiDownload,
  mdiMagnifyMinusOutline,
  mdiMagnifyPlusOutline,
  mdiRotateLeft,
  mdiRotateRight,
} from '../icons/mdi'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  src: { type: String, default: '' },
  imageList: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 },
  title: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'update:index'])

const activeIndex = ref(0)
const zoom = ref(1)
const rotation = ref(0)
const slideDirection = ref('next')

const imageItems = computed(() => {
  if (Array.isArray(props.imageList) && props.imageList.length) {
    return props.imageList
      .map((item, index) => {
        if (typeof item === 'string') {
          return { src: item, title: '', index }
        }
        return { src: item?.src || '', title: item?.title || '', index }
      })
      .filter((item) => !!item.src)
  }

  if (props.src) {
    return [{ src: props.src, title: props.title || '', index: 0 }]
  }

  return []
})

const currentItem = computed(() => imageItems.value[activeIndex.value] || null)
const currentSrc = computed(() => currentItem.value?.src || props.src || '')
const titleText = computed(() => currentItem.value?.title || props.title || '')

const imageStyle = computed(() => ({
  transform: `scale(${zoom.value}) rotate(${rotation.value}deg)`,
}))

function clampIndex(index) {
  if (!imageItems.value.length) return 0
  return Math.min(Math.max(0, index), imageItems.value.length - 1)
}

function resetTransforms() {
  zoom.value = 1
  rotation.value = 0
}

function openAtStartIndex() {
  activeIndex.value = clampIndex(Number(props.startIndex) || 0)
  slideDirection.value = 'next'
  resetTransforms()
  emit('update:index', activeIndex.value)
}

function prevImage() {
  if (imageItems.value.length < 2) return
  slideDirection.value = 'prev'
  activeIndex.value = (activeIndex.value - 1 + imageItems.value.length) % imageItems.value.length
  resetTransforms()
}

function nextImage() {
  if (imageItems.value.length < 2) return
  slideDirection.value = 'next'
  activeIndex.value = (activeIndex.value + 1) % imageItems.value.length
  resetTransforms()
}

function zoomIn() {
  zoom.value = Math.min(3.6, Number((zoom.value + 0.2).toFixed(2)))
}

function zoomOut() {
  zoom.value = Math.max(0.6, Number((zoom.value - 0.2).toFixed(2)))
}

function rotateLeft() {
  rotation.value -= 90
}

function rotateRight() {
  rotation.value += 90
}

function normalizeFileName(name) {
  const safe = (name || 'imagem')
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return safe || 'imagem'
}

function getFileExtension(src) {
  try {
    const pathname = new URL(src, window.location.href).pathname
    const match = pathname.match(/\.([a-z0-9]+)$/i)
    return match?.[1]?.toLowerCase() || 'jpg'
  }
  catch {
    return 'jpg'
  }
}

function downloadCurrentImage() {
  if (!currentSrc.value) return
  const link = document.createElement('a')
  link.href = currentSrc.value
  link.target = '_blank'
  link.download = `${normalizeFileName(titleText.value || 'imagem')}.${getFileExtension(currentSrc.value)}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function onDialogUpdate(value) {
  emit('update:modelValue', value)
}

function close() {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) return
    openAtStartIndex()
  }
)

watch(
  () => props.startIndex,
  (index) => {
    if (!props.modelValue) return
    const nextIndex = clampIndex(Number(index) || 0)
    slideDirection.value = nextIndex < activeIndex.value ? 'prev' : 'next'
    activeIndex.value = nextIndex
    resetTransforms()
    emit('update:index', activeIndex.value)
  }
)

watch(activeIndex, (index) => {
  emit('update:index', index)
})
</script>

<style scoped>
.ip-lightbox-shell {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 8, 14, 0.94);
  overflow: hidden;
}

.ip-lightbox-title {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 3;
  color: rgba(244, 247, 255, 0.92);
  font-size: 0.86rem;
  font-weight: 500;
  max-width: 58vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ip-lightbox-top-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  display: flex;
  gap: 0.35rem;
  padding: 0.35rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(16, 24, 36, 0.58);
  backdrop-filter: blur(8px);
}

.ip-action-btn {
  color: #fff !important;
  border-radius: 10px !important;
}

.ip-action-btn:hover {
  background: rgba(255, 255, 255, 0.12) !important;
}

.ip-action-btn--close:hover {
  background: rgba(255, 122, 26, 0.2) !important;
}

.ip-lightbox-content {
  width: min(96vw, 1400px);
  height: min(86vh, 920px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.ip-lightbox-image-frame {
  position: absolute;
  inset: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ip-lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  border-radius: 10px;
  transition: transform 0.22s ease;
}

.ip-slide-next-enter-active,
.ip-slide-next-leave-active,
.ip-slide-prev-enter-active,
.ip-slide-prev-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.ip-slide-next-enter-from,
.ip-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(12%);
}

.ip-slide-next-leave-to,
.ip-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-12%);
}

.ip-lightbox-bottom-nav {
  position: absolute;
  left: 50%;
  bottom: 16px;
  z-index: 3;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.34rem 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(16, 24, 36, 0.58);
  backdrop-filter: blur(8px);
}

.ip-nav-btn {
  color: #fff !important;
  border-radius: 10px !important;
}

.ip-nav-btn:hover {
  background: rgba(255, 255, 255, 0.12) !important;
}

.ip-counter {
  min-width: 74px;
  text-align: center;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}

@media (max-width: 700px) {
  .ip-lightbox-title {
    top: calc(76px + env(safe-area-inset-top));
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    max-width: calc(100vw - 22px);
  }

  .ip-lightbox-top-actions {
    top: calc(8px + env(safe-area-inset-top));
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: calc(100vw - 16px);
    overflow-x: auto;
  }

  .ip-lightbox-content {
    width: 100vw;
    height: calc(100vh - 178px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    padding: 10px;
  }

  .ip-lightbox-image-frame {
    inset: 10px;
  }

  .ip-lightbox-bottom-nav {
    bottom: calc(10px + env(safe-area-inset-bottom));
  }
}
</style>
