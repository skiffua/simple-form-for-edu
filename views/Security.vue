<script setup lang="ts">
import TableOfContents from '../src/components/TableOfContents.vue';
import Clacification from '../src/components/security/Clacification.vue';
import FichingExamples from '../src/components/security/FichingExamples.vue';
import Viruses from '../src/components/security/Viruses.vue';
import Http from '../src/components/security/Http.vue';
import HomeWork from '../src/components/security/HomeWork.vue';
import Ddos from '../src/components/security/Ddos.vue';
import Spam from '../src/components/security/Spam.vue';

const sections = [
  {
    id: 'section-1',
    title: 'Що вважаємо загрозою?',
    content: Clacification,
  },
  {
    id: 'section-2',
    title: 'Віруси',
    content: Viruses,
  },
  {
    id: 'section-4',
    title: 'DoS / DDoS атаки',
    content: Ddos,
  },
  {
    id: 'section-5',
    title: 'Фішинг',
    content: FichingExamples,
  },
  {
    id: 'section-6',
    title: 'Вразливість http протоколу',
    content: Http,
  },
  {
    id: 'section-7',
    title: 'Вербування, пропаганда, фейкова інформація',
    content: Spam,
  },
  {
    id: 'section-8',
    title: 'Завдання практичної роботи',
    content: HomeWork,
  },
]
</script>

<template>
  <TableOfContents
      :items="sections"
  />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
