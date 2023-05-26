<template>
	<el-card shadow="never" class="aui-card--fill">
		<el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
			<el-form-item label="类型" prop="type">
				<el-select v-model="dataForm.type" placeholder="请选择" >
					<el-option v-for="item in genderList" :key="item.dictLabel" :label="item.dictLabel" :value="item.dictValue">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="值" prop="name">
				<el-input v-model="dataForm.name" placeholder="请输入"  clearable ></el-input>
			</el-form-item>
			<el-form-item label="选择时间" prop="date">
				<el-date-picker
						v-model="dataForm.date"
						type="daterange"
						range-separator="至"
						value-format="yyyy-MM-dd"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button @click="search">查询</el-button>
				<el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<el-table
				:data="data"
				style="width: 100%">
			<el-table-column label="轨迹走势">
				<el-table-column
						prop="date"
						label="时间"
						width="150"
						show-overflow-tooltip
						align="center">
				</el-table-column>
				<el-table-column
						prop="longitude"
						label="经度"
						align="center">
				</el-table-column>
				<el-table-column
						prop="latitude"
						label="纬度"
						align="center">
				</el-table-column>
				<el-table-column
						prop="coordinateSource"
						label="数据来源"
						align="center">
				</el-table-column>
				<el-table-column
						prop="country"
						label="国家"
						align="center">
				</el-table-column>
				<el-table-column
						prop="province"
						label="省份"
						align="center">
				</el-table-column>
				<el-table-column
					prop="city"
					label="城市"
					align="center">
			   </el-table-column>
				<el-table-column
						prop="district"
						label="地区"
						align="center">
				</el-table-column>
				<el-table-column
						prop="town"
						label="镇"
						align="center">
				</el-table-column>
				<el-table-column
						prop="village"
						label="村"
						align="center">
				</el-table-column>
				<el-table-column
						prop="address"
						label="地址"
						show-overflow-tooltip
						align="center">
				</el-table-column>
				<el-table-column
						prop="wifi"
						label="wifi"
						show-overflow-tooltip
						align="center">
				</el-table-column>
				<el-table-column
						prop="poi"
						label="poi"
						align="center">
				</el-table-column>
				<el-table-column
						prop="poiType"
						label="poiType"
						align="center">
				</el-table-column>
			</el-table-column>
		</el-table>

	</el-card>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	import {Message} from 'element-ui'
	import {
		getDictLabel,
		getDictDataList
	} from '@/utils'
	export default {

		mixinViewModuleOptions: {
			createdIsNeed: false, // 此页面是否在创建时，调用查询数据列表接口？
			activatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
		}, 
		components: {
		},
		data() {
			return {
				dataForm: {
					name: '18520882984',
					type:'3',
					date:['2021-03-13','2021-03-30']
				},
				data:[],
				historyDeviceList:[],
				genderList: getDictDataList('informationType'),
				changeRecordDetailList:[]
			}
		},
		computed: {

		},
		mounted(){
this.getDeviceInfo();
		},
		methods: {
			resetForm(formName) {
			this.$refs[formName].resetFields();
			// 当存在 el-date-picker && （ type="daterange"||type="datetimerange"）时，将变量定义为daterange
			if (this.daterange) {
				this.daterange = null
			}
			this.dataForm = {}
		},
			search() {
				this.getDeviceInfo();
			},
			getDeviceInfo() {
				this.$http(
						{ url: '/kepler/v2/trace?keyType=' + this.dataForm.type+'&key='+this.dataForm.name+'&start='+this.dataForm.date[0]+'&end='+this.dataForm.date[1], method: 'get' }).then(({ data: res }) => {
					if (res.code !== 0) {
                        //   return; 
                        Message.warning(res.msg)
                    }
					//console.log(JSON.parse(res.data).deviceFeatureInfo);
					this.data = JSON.parse(res.data);

				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.el-table {
		.student-img {
			vertical-align: top;
			width: 53px;
			height: 70px;
		}
	}
</style>
