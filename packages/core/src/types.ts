import type { RuleItem } from 'async-validator'
import { Component } from 'vue'

export enum FormItemType {
  /**
   * 自定义组件
   */
  CUSTOM = 'CUSTOM',

  /**
   * 预设组件，通过provide/inject 注册
   */
  PREDEFINE = 'PREDEFINE',
}

/**
 * 表单项基础数据
 */
export type BaseFormItemData<T extends FormItemType> = {
  /**
   * 类型
   */
  type: T | `${T}`

  /**
   * 唯一key
   */
  key: string

  /**
   * 初始值
   */
  initial?: number | string

  /**
   * 是否必填
   */
  rules?: RuleItem | RuleItem[]

  /**
   * label
   */
  label?: string

  /**
   * label
   */
  placeholder?: string

  /**
   * FormItem 样式
   */
  itemClass?: string

  disabled?: boolean
  modelValueKey?: string

  slot?: any
  attrs?: Record<string, any>

  /**
   * 自定义属性
   */
  // [x: string | symbol | number]: any
}

export type FormItemData = CustomCompData | PreDefineCompData

/**
 * 表单提交结果
 */

export type FormSchema = FormItemData[]

export interface CustomCompData<C = any>
  extends BaseFormItemData<FormItemType.CUSTOM> {
  component: C
  props?: C extends Component<infer P>
    ? P extends { $props: infer Props }
      ? Omit<Props, 'modelValue' | 'itemData'>
      : any
    : any
}

export interface PreDefineCompData<Alias extends string = any, C = any>
  extends BaseFormItemData<FormItemType.PREDEFINE> {
  component: C
  props?: C extends Component<infer P>
    ? P extends { $props: infer Props }
      ? Omit<Props, 'modelValue'>
      : any
    : any
  alias: Alias
}
