import { App, markRaw, Component } from 'vue'
import { FormItemData, PreDefineCompData } from './types'

interface SmartForm {
  predefinedComponents: Map<string, Component>
  install: (app: App) => void
}

export function createSmartForm(): SmartForm {
  const smartForm: SmartForm = markRaw({
    install(app: App) {
      setActiveSmartForm(smartForm)
    },
    predefinedComponents: new Map(),
  })

  return smartForm
}

let activeSmartForm: SmartForm

export const setActiveSmartForm = (s: SmartForm) => {
  activeSmartForm = s
}

export const getActiveSmartForm = (): SmartForm => {
  // const currentInstance = getCurrentInstance()
  // return (currentInstance && inject(SmartFormSymbol)) ||
  return activeSmartForm
}

type Comp = {
  component: Component
  modelValueKey?: string
}

// const SmartFormSymbol: InjectionKey<SmartForm> = Symbol('SmartFormSymbol')

export const defineFormType = <A extends string, C extends Component>(
  alias: A,
  comp: C
) => {
  const sf = getActiveSmartForm()
  //todo check name
  sf.predefinedComponents.set(alias, comp)

  const usePredefineComponentType = (
    options: POptions<A, C>
  ): PreDefineCompData<A, C> => {
    return {
      ...options,
      component: markRaw(comp),
      type: 'PREDEFINE',
      alias: alias,
    }
  }
  return usePredefineComponentType
}

export const defineFormTypes = <C extends Record<string, Comp>>(compMap: C) => {
  const useDefineSchema = () => {
    Object.entries(compMap).forEach(([k, c]) => defineFormType(k, c.component))

    const sf = getActiveSmartForm()

    const defineSchema = <T extends keyof C & string>(
      options: POptions<T, C[T]['component']>[]
    ): FormItemData[] => {
      return options.map((c) => {
        if (isValidAlias(sf.predefinedComponents, c)) {
          return {
            modelValueKey: compMap[c.alias].modelValueKey,
            ...c,
            component: markRaw(sf.predefinedComponents.get(c.alias)!),
            type: 'PREDEFINE',
            alias: c.alias,
          }
        } else {
          //@ts-ignore
          return c as any
        }
      })
    }

    return defineSchema
  }

  return useDefineSchema
}

type POptions<A extends string, C = any> = Omit<
  PreDefineCompData<A, C>,
  'component' | 'type'
>

const isValidAlias = <T extends string>(
  map: SmartForm['predefinedComponents'],
  p: any
): p is POptions<T> => {
  return map.has(p.alias)
}
