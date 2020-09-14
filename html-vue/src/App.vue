<template>
	<router-view />
</template>

<script>
import { getBlogListUrl } from "./api";
export default {
	name: "app",
	mounted: function () {
		let str = "012345678901234567890123456789";
		let str1 = str.substr(0, 100);
		console.log(str1.length);
		this.axios.get(getBlogListUrl).then((res) => {
			console.log(res);
		});
	},
};
</script>

