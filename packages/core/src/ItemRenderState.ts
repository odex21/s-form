import { ValidateModel } from './FormItem'

export type ItemRenderState = {
  model: ValidateModel
  /**
   * reset model
   */
  reset: () => void
  shake: () => void
}
