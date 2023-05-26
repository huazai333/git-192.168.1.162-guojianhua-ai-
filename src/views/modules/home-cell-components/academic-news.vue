<!-- 商家销量统计的横向柱状图 -->
<template>
	<div class="com-container">
		<div class="title">
			<h5>
				<i class="el-icon-document"></i>
				最新设备查询
			</h5>
		</div>
		<div class="center">
			<ul>
				<!-- 10条 -->
				<li v-for="(item) in dataList" :key="item.id" @click="viewHandle(item)">
					<a>
						<span  style="width: 30%">
							{{item.model}}
						</span>
						<span style="width: 30%">
							{{item.brandNew}}
						</span>

						<span style="width: 30%">
							{{item.osVersion}}
						</span>
<!--						<i>
							{{item.osVersion}}
						</i>-->
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	import {
		getDictLabel,
		getDictDataList
	} from '@/utils'
	export default {
		mixins: [mixinViewModule],
		components: {
 
		},
		data() {

			return {
				mixinViewModuleOptions: {
					getDataListURL: '/system/device',
					getDataListIsPage: true,
					activatedIsNeed: false,
					createdIsNeed:true
				},
				page:0,
				limit: 10,
				dataForm: {
					name: '15099015923',
					type:'3'
				},
				dataList: [],
			}
		},
		computed: {
		},
		methods: {
			viewHandle(item) {
				// console.log(row)
				this.$router.push({ name: 'equipment-info',query:item})
			},
		}
	}
</script>

<style lang="scss"  scoped>
.com-container {
	width: 100%;
	height: 500px;
	background: #fff;
	border: 1px solid #dedede;
	.title{
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		font-weight: bold;
		padding-left: 20px;
		border-bottom: 1px solid #dedede;
	}
	.center{
		width: 100%;
		height: 400px;
		padding:20px;
		ul{
			li{
				list-style: none;
				a{
					display: flex;
					justify-content: space-between;
					align-items:center;
					line-height: 40px;
					cursor: pointer;
					text-decoration: none;
					span{
						font-size: 16px;
						color: #333;
						display: block;
						width: 60%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					i{
						font-style: normal;
						font-size: 14px;
						color: #999;
					}
				}
			}
		}
	}
}

</style>
