<template>
  <slot v-if="labelPosition === 'sticky'" name="label">{{ label }} </slot>
  <div ref="elRef" class="form-item" :class="labelClass">
    <div
      v-if="labelPosition !== 'sticky'"
      class="label-wrapper"
      :style="{ width: __labelWith }"
    >
      <slot name="label">{{ label }} </slot>
    </div>
    <div class="flex-1 relative">
      <slot />
      <div v-if="data?.$anyInvalid && data.$dirty" class="error-msg">
        {{ data.$errors[0] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { LabelPoistion } from '../inject'
import { ValidateModel } from './type'

const props = withDefaults(
  defineProps<{
    data: ValidateModel
    label?: string
    labelWidth?: string | number
    labelPosition?: LabelPoistion
    classList?: string
  }>(),
  {
    labelPosition: 'left',
    classList: '',
  }
)

const __labelWith = computed(() => {
  const { labelWidth } = props
  switch (typeof labelWidth) {
    case 'string':
      return labelWidth
    case 'number':
      return labelWidth + 'px'
    default:
      return '20px'
  }
})

const elRef = ref<HTMLElement | null>(null)

const LABEL_CLASS = {
  left: '',
  top: 'label-top',
  sticky: '',
  none: 'hide-label',
}
const labelClass = computed(() => {
  return [LABEL_CLASS[props.labelPosition], props.classList].flatMap((e) =>
    e.split(' ')
  )
})

defineExpose({
  el: elRef,
})
</script>
<style scoped lang="scss">
.label-wrapper {
  @apply flex-shrink-0 whitespace-nowrap relative z-1 mr-3;
}
.form-item {
  @apply flex text-sm  relative;

  &.label-top {
    @apply block;
  }

  &.hide-label {
    .label-wrapper {
      display: none;
    }
  }
}

.error-msg {
  @apply text-red-400 text-xs;
  @apply absolute -bottom-1.3em left-0;
}
</style>
