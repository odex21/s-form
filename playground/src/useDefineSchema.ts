import { defineFormTypes } from '@s-form/core'
import { ElButton, ElInput, ElPagination } from 'element-plus'

export const useDefineSchema = defineFormTypes({
  input: {
    component: ElInput,
  },
  button: {
    component: ElButton,
  },
  pagination: {
    component: ElPagination,
  },
})
