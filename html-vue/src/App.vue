<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { getBlogListUrl } from "./api";
export default {
  name: "app",
  mounted: function () {
    console.log(this);
    this.axios.get(getBlogListUrl).then((res) => {
      console.log(res);
    });
  },
};
</script>

