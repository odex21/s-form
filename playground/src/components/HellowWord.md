```ts 
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
    slot: () => h(ElLink, { href: 'https://www.baidu.com' }, () => '123'),
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
```