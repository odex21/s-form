<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'

import { SmartForm, useCustomItem } from '@s-form/core'
import { h } from 'vue'
const schema = [
  useCustomItem({
    component: WelcomeItem,
    key: '1',
    slot: () => ['`s-form`的文档，从这里开始了解s-form'],
    slots: {
      icon: DocumentationIcon,
      heading: 'Documentation',
    },
  }),
  useCustomItem({
    component: WelcomeItem,
    key: '2',
    slot: () => ['一些`s-form`的工具，例如常见UI库的预设包'],
    slots: {
      icon: ToolingIcon,
      heading: 'Tooling',
    },
  }),
]
</script>

<template>
  <SmartForm
    :form-schema="schema"
    item-class="item-wrapper"
    label-position="none"
  ></SmartForm>
</template>
<style>
@media (min-width: 1024px) {
  .item-wrapper:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item-wrapper:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item-wrapper:first-of-type:before {
    display: none;
  }

  .item-wrapper:last-of-type:after {
    display: none;
  }
}
</style>
