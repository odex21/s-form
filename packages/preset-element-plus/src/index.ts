import { defineFormTypes } from '@s-form/core'
import {
  ElButton,
  ElInput,
  ElPagination,
  ElSelectV2,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElCheckbox,
  ElCascader,
  ElAutocomplete,
  ElSwitch,
  ElSlider,
  ElRate,
} from 'element-plus'

type TT = () => <
  T extends
    | 'input'
    | 'autocomplete'
    | 'button'
    | 'pagination'
    | 'select'
    | 'datePicker'
    | 'timeSelect'
    | 'timePicker'
    | 'checkbox'
    | 'cascader'
    | 'switch'
    | 'slider'
    | 'rate'
>(
  options: {
    disabled?: boolean | undefined
    placeholder?: string | undefined
    label?: string | undefined
    key: string
    props?:
      | ({
          input: {
            component: typeof ElInput
          }
          button: {
            component: typeof ElButton
          }
          pagination: {
            component: typeof ElPagination
          }
          select: {
            component: typeof ElSelectV2
          }
          datePicker: {
            component: typeof ElDatePicker
          }
          timePicker: {
            component: typeof ElTimePicker
          }
          timeSelect: {
            component: typeof ElTimeSelect
          }
          checkbox: {
            component: typeof ElCheckbox
          }
          cascader: {
            component: typeof ElCascader
          }
          autocomplete: {
            component: typeof ElAutocomplete
          }
          switch: {
            component: typeof ElSwitch
          }
          rate: {
            component: typeof ElRate
          }
          slider: {
            component: typeof ElSlider
          }
        }[T]['component'] extends import('vue').Component<
          infer P,
          any,
          any,
          import('vue').ComputedOptions,
          import('vue').MethodOptions
        >
          ? P extends {
              $props: infer Props
            }
            ? Omit<Props, 'modelValue'>
            : any
          : any)
      | undefined
    alias: T
    initial?: string | number | undefined
    rules?:
      | import('async-validator').RuleItem
      | import('async-validator').RuleItem[]
      | undefined
    itemClass?: string | undefined
    modelValueKey?: string | undefined
    modelKeyMap?: Record<string, string> | undefined
    slot?: any
    slots?: Record<string, any> | undefined
    attrs?: Record<string, any> | undefined
  }[]
) => import('@s-form/core').FormItemData[]

export const useEleSchema: TT = defineFormTypes({
  input: {
    component: ElInput,
  },
  button: {
    component: ElButton,
  },
  pagination: {
    component: ElPagination,
  },
  select: {
    component: ElSelectV2,
  },
  datePicker: {
    component: ElDatePicker,
  },
  timePicker: {
    component: ElTimePicker,
  },
  timeSelect: {
    component: ElTimeSelect,
  },
  checkbox: {
    component: ElCheckbox,
  },
  cascader: {
    component: ElCascader,
  },
  autocomplete: {
    component: ElAutocomplete,
  },
  switch: {
    component: ElSwitch,
  },
  slider: {
    component: ElSlider,
  },
  rate: {
    component: ElRate,
  },
})
