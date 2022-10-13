<script setup lang="ts">
import { SmartForm } from '@s-form/core'
import { h, reactive } from 'vue'
import type { Rules } from 'async-validator'
import { ElLink } from 'element-plus'
import { Share } from '@element-plus/icons-vue'
import Hello from './HellowWord.md'
import { useEleSchema } from '@s-form/preset-element-plus'

const schema = useEleSchema()([
  {
    alias: 'input',
    key: 'name',
    label: '输入框',
    props: {},
  },
  {
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
    label: '多model绑定',
  },
  {
    alias: 'button',
    key: 'link',
    slot: () => h(ElLink, { href: 'https://www.baidu.com' }, () => '123'),
    slots: {
      icon: Share,
    },
    label: '自定义插槽',
  },
  {
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
    label: '默认插槽 事件绑定',
  },
])
const model = reactive({ name: '123', page: 1, pageSize: 20 })

const rules: Rules = {
  name: {
    min: 10,
  },
}
</script>

<template>
  <div class="greetings">
    <div class="flex items-center">
      <h1>s-form</h1>
      <h2 class="ml-5">用JSON组合Vue组件，生成页面</h2>
    </div>
    <div>
      <h2>JSON</h2>
      <div class="h-50vh overflow-y-auto">
        <Hello />
      </div>
      <h2>Result</h2>
      <div class="border p-2 rounded">
        <SmartForm
          class="space-y-4"
          :model-value="model"
          :rules="rules"
          :form-schema="schema"
          label-width="auto"
          item-class="item-label"
        />
      </div>
      <h2>model</h2>
      <div class="border p-2 rounded">
        {{ model }}
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
<style>
.item-label {
  @apply items-center;
}
</style>
