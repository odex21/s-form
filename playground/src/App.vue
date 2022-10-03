<script setup lang="ts">
import { SmartForm } from '@s-form/core'
import { reactive } from 'vue'
import { useDefineSchema } from './useDefineSchema'

const schema = useDefineSchema()([
  {
    alias: 'input',
    key: 'name',
  },
  {
    alias: 'button',
    key: 'submit',
    slot: 'reset',
  },
])
const model = reactive({ name: '123' })
</script>

<template>
  <SmartForm :model-value="model" :form-schema="schema" />
</template>
