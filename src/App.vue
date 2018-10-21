<template>
  <div class="container">
    <sidebar></sidebar>
    <main-frame></main-frame>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar';
  import MainFrame from './components/MainFrame';

  export default {
    name: 'App',
    components: {
      Sidebar,
      MainFrame
    }
  };
</script>
