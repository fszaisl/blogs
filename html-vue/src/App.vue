<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  mounted:function(){
    console.log(this)
    this.axios.get('./sdf')
  }
};
</script>

