<template>
  <form
    ref="smartFormRef"
    :label-width="labelWidth"
    :label-position="_labelPosition"
    :model="modelValue"
    @submit.prevent
  >
    <ItemRenderVue
      v-for="item in formSchema"
      :key="item.key"
      :ref="(e) => setItems(e, item.key)"
      :item="item"
      :disabled="disabled"
      :model-value="modelValue[item.key]"
      :light="light"
      @update:model-value="(e) => updateItem(item.key, e)"
    >
      <template #label="data">
        <slot name="label" v-bind="data" />
      </template>
      <template #append="data">
        <slot name="append" v-bind="data" />
      </template>
    </ItemRenderVue>
  </form>
</template>
<script setup lang="ts">
import { FormItemData, FormSchema } from './types'
import { LabelPoistion, provideFormState } from './inject'
import ItemRenderVue from './ItemRender.vue'
import { ItemRenderState } from './ItemRenderState'
import { ref, computed, reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    formSchema: FormSchema
    modelValue: Record<string, any>
    disabled?: boolean
    labelWidth?: string | number
    labelPosition?: LabelPoistion
    itemClass?: string
    light?: boolean
  }>(),
  {
    disabled: false,
    light: false,
  }
)

const emit = defineEmits<{
  (
    name: 'itemChange',
    key: string,
    value: any,
    prev: any,
    itemData: FormItemData,
    ctx?: any
  ): void
}>()

const smartFormRef = ref<any>(null)
// const getLabel = createGetLabel(id)

const _labelPosition = computed(() => props.labelPosition)

provideFormState({
  emit: emit as any,
  el: smartFormRef,
  labelWidth: computed(() =>
    typeof props.labelWidth === 'string'
      ? props.labelWidth
      : `${props.labelWidth ?? 60}px`
  ),
  labelPosition: computed(() => props.labelPosition ?? 'left'),
  itemClass: computed(() => props.itemClass),
})

const items = ref<Record<string, ItemRenderState>>({})
const setItems = (e: any, p: string) => {
  items.value[p] = e
}

const updateItem = (key: string, v: any) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue[key] = v
  console.log('update', key, v)
}

/**
 * 获取结果
 * @param dirty 是否只获取修改过的 @default false
 */
const getResult = (dirty = false) => {
  const errors: Error[] = []
  const res = Object.entries(items.value).reduce<{ [x: string]: any }>(
    (res, [k, e]) => {
      if (dirty && !e.model.$dirty) return res
      if (e.model.$anyInvalid) {
        e.model.$touch()
        errors.push(new Error(e.model.$errors[0]))
      }
      res[k] = e.model.$value
      return res
    },
    {}
  )
  if (errors.length) {
    throw errors[0]
  }
  return res
}

/**
 * 重制dirtry
 */
const reset = () => {
  Object.values(items.value).forEach((e) => e.reset())
}

defineExpose(
  reactive({
    getResult,
    items,
    reset,
  })
)
</script>
