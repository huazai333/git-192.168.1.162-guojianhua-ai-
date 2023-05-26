<template>
	<el-card shadow="never" class="aui-card--fill">
		<el-form ref="dataForm" :model="dataForm" label-width="80px" inline>
			<el-form-item label="姓名" prop="vrName">
				<el-input v-model="dataForm.name" placeholder="请输入" clearable></el-input>
			</el-form-item>
<!--			<el-form-item label="人证设备">
				<el-select v-model="dataForm.deviceNumber" placeholder="请选择" @change="setVistorEquip" clearable filterable>
					<el-option v-for="item in equipList" :key="item.pieEquipsn" :label="item.pieDevicename" :value="item.pieEquipsn">
					</el-option>
				</el-select>
			</el-form-item>-->
			<el-form-item>
				<el-button @click="search">查询</el-button>
				<el-button type="warning" @click="resetForm('dataForm')">重置</el-button>
				<!--<el-button type="primary" @click="addVisitor">新建</el-button>-->
			</el-form-item>
		</el-form>
		<el-table :data="dataList">
			<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
			<el-table-column prop="userName" label="姓名" width="100" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="cardNum" label="卡号" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="time" label="时间" show-overflow-tooltip align="center"></el-table-column>
		</el-table>
		<el-pagination :current-page="page" :page-sizes="[6,10, 20, 50, 100]" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper"
		 @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle">
		</el-pagination>

	</el-card>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	import {
		getDictLabel,
		getDictDataList
	} from '@/utils'
	export default {
		mixins: [mixinViewModule],

		data() {
			return {
				mixinViewModuleOptions: {
					getDataListURL: '/system/card/log',
					deleteURL: '/system/card/log',
					getDataListIsPage: true
				},
				genderList: getDictDataList('gender').filter(item => item.dictValue < 2),
				dataForm: {
					name:''
				},
				equipList: [],
				dataList: [],
				limit: 6,
			}
		},

		created() {
		},
		activated() {
			//let params = this.$route.params;

			// // 判断从闸机设备过来  查询对应出入数据
			// let visitorName = window.sessionStorage.getItem('visitorName');
			// if (visitorName) {
			// 	window.sessionStorage.removeItem('visitorName');
			// 	this.dataForm.vrName = visitorName;
			// 	this.search();
			// }
		},
		methods: {
			search() {
				this.page = 1;
				this.query();
			},
			resetQuery() {
				this.dataForm = {
					name: '',
				};
				this.search();
			},


			},
	}
</script>
<style lang="scss" scoped>
	.el-table {
		.student-img {
			vertical-align: top;
				width: 33px;
			height: 40px;
		}
	}
</style>
