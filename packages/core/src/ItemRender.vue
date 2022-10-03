<template>
  <FormItem
    :key="item.key"
    ref="formItemRef"
    :class-list="formItemClass"
    :label-width="labelWidth"
    :data="model"
    :label-position="labelPosition"
  >
    <template #label>
      <slot name="label" v-bind="{ item, model: model.$value, shake }">
        {{ item.label }}
      </slot>
    </template>
    <div class="flex">
      <component
        :is="item.component"
        :[key]="model.$value"
        @[key]="update"
        v-bind="mergeProps(proxyRefs(item.props ?? {}), item.attrs ?? {})"
      >
        <template v-if="typeof item.slot === 'string'">
          {{ item.slot }}
        </template>
        <component
          v-else-if="['object', 'function'].includes(typeof item.slot)"
          :is="item.slot"
        />
      </component>

      <slot name="append" v-bind="{ item, model: model.$value }" />
    </div>
  </FormItem>
</template>
<script setup lang="ts">
import { useValidation } from 'vue-composable'
import { FormItem, provideFormItemState } from './FormItem'
import { useSmartFormState } from './inject'
import { FormItemData } from './types'
import {
  Ref,
  proxyRefs,
  shallowRef,
  computed,
  ref,
  watch,
  mergeProps,
  toRef,
} from 'vue'
import { sleep } from './utils'
import schmea from 'async-validator'
import { ValidateModel } from './FormItem/type'

const props = defineProps<{
  item: FormItemData
  modelValue: any
  disabled?: boolean
  light: boolean
}>()

const key = props.item.modelValueKey ?? 'modelValue'

const { labelPosition, labelWidth, itemClass, emit } = useSmartFormState()

const itemEmit = defineEmits<{
  (name: 'update:modelValue', e: any): void
}>()

const createValidation = () => {
  const { rules } = props.item

  const validator: Record<string, any> = {}
  if (rules) {
    validator.validate = async (v: any) => {
      const validator = new schmea({ [props.item.key]: rules })
      const res = await validator
        .validate({ [props.item.key]: v }, { first: true })
        .then(() => true)
        .catch(({ errors, fields }) => {
          return errors
        })
      return res
    }
  }
  const value = props.modelValue ?? props.item.initial ?? ''
  return useValidation({
    $value: value,
    ...validator,
  }) as any as ValidateModel
}

const model = shallowRef<ReturnType<typeof createValidation>>({} as any)
// let stopModelWatch: ReturnType<typeof watchModelChange>

const update = (cur: any) => {
  emit('itemChange', props.item.key, cur, model.value.$value, props.item)
  model.value.$value = cur
  if (!props.light) itemEmit('update:modelValue', cur)
}

watch(
  toRef(props, 'modelValue'), // 当modelValue 为undefined时，返回空字符串触发watch
  (cur, prev) => {
    if (cur === prev) return

    model.value = createValidation()
  },
  {
    //@ts-ignore
    immediate: true,
  }
)

const formItemClass = computed(() => {
  return [itemClass.value, props.item.itemClass].filter((e) => e).join(' ')
})

const reset = () => {
  // if (stopModelWatch) stopModelWatch()
  model.value.$reset()
  // stopModelWatch = watchModelChange()
}

const formItemRef = ref<{ el: Ref<HTMLElement> } | null>(null)
const formItemEl = computed(() => formItemRef.value?.el ?? null)

const shake = async () => {
  const el = formItemEl.value
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth' })
  // animate
  if (!el) return
  el.classList.add('animate__animated')
  el.classList.add('animate__shakeY')
  await sleep(1000)
  el.classList.remove('animate__animated')
  el.classList.remove('animate__shakeY')
}

//todo 如果校验的时候想要拿到组件的实例，那可能需要在这expose
provideFormItemState({ el: formItemEl, shake })

defineExpose({
  model,
  reset,
  shake,
  formItemRef,
})
</script>
