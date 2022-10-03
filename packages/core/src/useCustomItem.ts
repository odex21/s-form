import { markRaw } from 'vue'
import { CustomCompData, FormItemType } from './types'

/**
 * @example
 * import QuestionBankItem from './components/correction/QuestionBankItem.vue'
 * const schema = [
 *   useCustomItem({
 *     component: QuestionBankItem,
 *     props: {
 *       data: {
 *         //...
 *       },
 *     },
 *     key: 'key',
 *   }),
 * ]
 */
export const useCustomItem = <C = any>(
  data: Omit<CustomCompData<C>, 'type'>
) => ({
  ...data,
  component: markRaw(data.component as any),
  type: FormItemType.CUSTOM,
})
