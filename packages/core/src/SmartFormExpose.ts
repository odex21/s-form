import { ItemRenderState } from './ItemRenderState'

export interface SmartFormExpose {
  items: Record<string, ItemRenderState>
  /**
   * 获取结果
   * @param dirty 是否只获取修改过的 @default false
   */
  getResult: (dirtry?: boolean) => Record<string, any>
  reset: () => void
}
