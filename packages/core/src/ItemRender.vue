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
        v-bind="
          mergeProps(proxyRefs(item.props ?? {}), item.attrs ?? {}, vModelProps)
        "
      >
        <component v-if="item.slot" :is="slotItem(item.slot)"></component>
        <template v-for="(k, name) in item.slots" v-slot:[name]>
          <component :is="slotItem(k)"></component>
        </template>
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
  mergeProps,
  toRef,
  nextTick,
  defineComponent,
  h,
} from 'vue'
import { sleep } from './utils'
import schmea from 'async-validator'
import { ValidateModel } from './FormItem/type'
import { pausableWatch, type WatchPausableReturn } from '@vueuse/core'

const props = defineProps<{
  item: FormItemData
  modelValue: any
  disabled?: boolean
  light: boolean
}>()

const { labelPosition, labelWidth, itemClass, emit, modelValue, rules } =
  useSmartFormState()

const itemEmit = defineEmits<{
  (name: 'update:modelValue', e: any, modelKey?: string): void
}>()

const createValidation = () => {
  const { modelKeyMap, key } = props.item
  if (modelKeyMap) {
    const data: Record<string, any> = {}
    Object.entries(modelKeyMap).forEach(([modelValueKey, modelKey]) => {
      const r = rules.value[key] ?? {}
      const validator: Record<string, any> = {}
      if (Object.keys(r).length) {
        validator.validate = createRules(r)
      }
      data[modelValueKey] = {
        $value: modelValue.value[modelKey],
        ...validator,
      }
    })
    return useValidation(data) as any as ValidateModel
    // return use
  } else {
    const validator: Record<string, any> = {}
    const r = Object.assign(props.item.rules ?? {}, rules.value[key] ?? {})
    if (Object.keys(r).length) {
      validator.validate = createRules(r)
    }

    const value = props.modelValue ?? props.item.initial ?? ''
    return useValidation({
      $value: value,
      ...validator,
    }) as any as ValidateModel
  }
}

const model = shallowRef<ReturnType<typeof createValidation>>({} as any)

const update = (cur: any, modelValueKey?: string) => {
  emit('itemChange', props.item.key, cur, model.value.$value, props.item)
  if (modelValueKey) {
    //@ts-ignore
    model.value[modelValueKey].$value = cur
  } else {
    model.value.$value = cur
  }
  if (!props.light) {
    pausableReturn.pause()
    itemEmit('update:modelValue', cur, props.item.modelKeyMap?.[modelValueKey!])

    nextTick(() => {
      pausableReturn.resume()
    })
  }
}

const watchHandler = (cur: Record<string, any>, prev?: Record<string, any>) => {
  /**
   * todo
   * shallow compare
   */
  model.value = createValidation()
}

let pausableReturn: WatchPausableReturn
if (props.item.modelKeyMap) {
  pausableReturn = pausableWatch(
    modelValue, // 当modelValue 为undefined时，返回空字符串触发watch
    watchHandler,
    {
      immediate: true,
      deep: true,
    }
  )
} else {
  pausableReturn = pausableWatch(
    toRef(props, 'modelValue'),
    (cur, prev) => {
      if (cur === prev) return
      model.value = createValidation()
    },
    {
      immediate: true,
    }
  )
}

const vModelProps = computed(() => {
  const { modelValueKey, modelKeyMap } = props.item
  const data: Record<string, any> = {}
  if (modelKeyMap) {
    Object.entries(modelKeyMap).forEach(([_modelValueKey, modelKey]) => {
      //@ts-ignore
      data[_modelValueKey] = model.value[_modelValueKey].$value
      data[`onUpdate:${_modelValueKey}`] = (cur: any) => {
        update(cur, _modelValueKey)
      }
    })
  } else if (modelValueKey) {
    data[modelValueKey] = model.value.$value
    data[`onUpdate:${modelValueKey}`] = update
  } else {
    data.modelValue = model.value.$value
    data['onUpdate:modelValue'] = update
  }
  return data
})

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

function createRules(r: Record<string, any>, modelValueKey?: string) {
  return async (v: any) => {
    const validator = new schmea({ [props.item.key]: r })
    const res = await validator
      .validate({ [props.item.key]: v }, { first: true })
      .then(() => true)
      .catch(({ errors, fields }) => {
        console.error('erros', errors)
        if (modelValueKey) {
          //@ts-ignore
          model.value[modelValueKey].$message = errors[0].message
        } else {
          model.value.$message = errors[0].message
        }
        return false // errors[0].message
      })
    return res
  }
}

const slotItem = (slot: any) =>
  defineComponent(() => () => {
    // const { slot } = props.item
    const __type = typeof slot
    if (__type === 'string') {
      return slot
    } else if (['object', 'function'].includes(__type)) {
      return h(slot)
    }
  })
</script>
