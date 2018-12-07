<template>
  <div id="app">
    <ButtonGroup size="large" class="menu">
      <Button size="large" type="primary" @click="$router.push('/emitter')">
          <Icon type="ios-arrow-back" />
          Emitter
      </Button>
      <Button size="large" type="primary" @click="$router.push('/listener')">
          Listener
          <Icon type="ios-arrow-forward" />
      </Button>
    </ButtonGroup>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
  max-width: 800px;
}
.menu {
  margin-bottom: 20px;
}
</style>
