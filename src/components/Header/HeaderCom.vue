<template>
  <div id="Header-Container" class="flex">
    <Logo></Logo>
    <Nav></Nav>
    <Container></Container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Logo from './LogoCom.vue'
import Nav from './NavCom.vue'
import Container from './ControlCom.vue'

export default defineComponent({
  name: 'HeaderCom',
  components: {
    Logo,
    Nav,
    Container
  },
  setup () {}
})
</script>

<style scoped>
#Header-Container{
  padding: 16px 0;
}
</style>
