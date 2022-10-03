import { defineFormTypes } from '@s-form/core'
import { ElButton, ElInput } from 'element-plus'

export const useDefineSchema = defineFormTypes({
  input: {
    component: ElInput,
  },
  button: {
    component: ElButton,
  },
})
