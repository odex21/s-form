# s-form
用JSON组合Vue组件，生成页面

## Usage
```bash
npm i @s-form/core @s-form/preset-element-plus
```

```ts
import { useDefineSchema } from '@s-form/preset-element-plus'
const schema = useDefineSchema()([
  {
    label: '输入框',
    alias: 'input',
    key: 'name',
  },
  {
    label: '多model绑定',
    alias: 'pagination',
    key: 'submit',
    modelKeyMap: {
      currentPage: 'page',
      pageSize: 'pageSize',
    },
    props: {
      total: 123,
      layout: 'sizes, prev, pager, next',
    },
  },
  {
    label: '自定义插槽',
    alias: 'button',
    key: 'link',
    slot: () => h(ElLink, { href: 'https://kokodayo.fun' }, () => '123'),
    slots: {
      icon: Share,
    },
  },
  {
    label: '默认插槽 事件绑定',
    alias: 'button',
    key: 'action',
    slot: 'reset',
    props: {
      onClick: () => {
        console.log(model)
        model.name = 'odex'
        model.page = 1
        model.pageSize = 20
      },
    },
  },
])

const model = reactive({ name: '123', page: 1, pageSize: 20 })

const rules: Rules = {
  name: {
    min: 10,
  },
}
```

```template
<SmartForm
  class="space-y-4"
  :model-value="model"
  :rules="rules"
  :form-schema="schema"
  label-width="auto"
/>
```
## Development

```shell
npm i -g pnpm@6
pnpm i
cd playground
pnpm dev
```
