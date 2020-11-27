<template>
  <div id="app">
    <div class="head__medods">
      <img src="madods.png" alt="">
      <h1>MEDODS</h1>
    </div>
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
  outline:none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  font-family: "Arial",'Lucida Grande', Tahoma, Verdana, sans-serif;
}

body{
  width: 100vw;
  height: 100vh;
  background-color: #24bbea;
}
ul, li{
  list-style: none;
}
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.head__medods{
  display: flex;
  align-items: center;
  
  height: 50px;
  width: 100%;
  background-color: #22b2ea;

  & img{
    height: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  & h1{
    margin-left: 10px;
    color: white;
  }
}
</style>
