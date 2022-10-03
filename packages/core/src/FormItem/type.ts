export type ValidateModel<T = any> = {
  $value: T
  $anyInvalid?: any
  $errors?: any
  $dirty: boolean
  $reset: () => void
  [customProp: `$${string}`]: any
}
