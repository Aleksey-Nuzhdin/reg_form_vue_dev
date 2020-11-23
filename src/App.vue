<template>
  <div id="app">
    <Form />
  </div>
</template>

<script>
import Form from './components/Form'

export default {
  name: 'App',
  components: {
    Form,
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  width: 100vw;
  height: 100vh;
  background-color: #6ed0f6;
}
ul, li{
  list-style: none;
}
#app {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
