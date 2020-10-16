<template>
	<div class="blogHeader">
		<el-row class="container">
			<el-col :span="4">
				<div class="logo">个人博客系统</div>
			</el-col>
			<el-col :span="20">
				<div class="grid-content bg-purple-light"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: "BlogHeader",
};
</script>

<style lang="scss" scoped>
.blogHeader {
	background-color: #333;
	.container {
		height: 80px;
		line-height: 80px;
		margin: 0 auto;
		color: #b2b2b2;
		.logo {
			font-size: 36px;
			padding: 0 16px;
		}
	}
}
</style>>