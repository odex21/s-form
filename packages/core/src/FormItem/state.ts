import { InjectionKey, ComputedRef, provide, computed, inject } from 'vue'

export type FormItemState = {
  el: ComputedRef<HTMLElement | null>
  shake: () => void
}
export const FORM_ITEM_STATE: InjectionKey<FormItemState> =
  Symbol('FORM_ITEM_STATE')

export const provideFormItemState = (s: FormItemState) => {
  provide(FORM_ITEM_STATE, s)
  return s
}

export const useFormItemState = () =>
  inject(FORM_ITEM_STATE, { el: computed(() => null), shake: () => {} })
