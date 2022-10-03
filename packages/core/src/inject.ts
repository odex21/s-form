import {
  computed,
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
  shallowRef,
} from 'vue'
import { FormItemData } from './types'

export type SmartFormState = {
  emit: {
    (name: 'update:modelValue', data: Record<string, any>): void
    (
      name: 'itemChange',
      id: string,
      value: any,
      prev: any,
      itemData: FormItemData,
      ctx?: any
    ): void
  }
  el: Ref<HTMLElement | null>
  labelWidth: Ref<string>
  labelPosition: Ref<LabelPoistion>
  itemClass: Ref<string | undefined>
}

export type LabelPoistion = 'left' | 'top' | 'sticky' | 'none'

export const SMART_FORM_STATE: InjectionKey<SmartFormState> =
  Symbol('SMART_FORM_STATE')

export const provideFormState = (s: SmartFormState) => {
  provide(SMART_FORM_STATE, s)
  return s
}

export const useSmartFormState = () =>
  inject(SMART_FORM_STATE, {
    el: shallowRef(null),
    labelPosition: computed((): LabelPoistion => 'left'),
    labelWidth: computed(() => '20px'),
    itemClass: ref(''),
    emit: () => {},
  })
