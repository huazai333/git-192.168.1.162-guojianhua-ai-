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
			<el-form-item>
				<el-button @click="search">查询</el-button>
				<el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
			<el-form-item >
				<h5> * 查询设备详情已经换机换卡记录</h5>
			</el-form-item>
		</el-form>
		<el-table
				:data="historyDeviceList"
				style="width: 100%">
			<el-table-column label="设备信息">
				<el-table-column
						show-overflow-tooltip
						prop="sourceCertainty"
						label="相关度"
						align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="startTime"
						label="开始关联时间"
						align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="endTime"
						label="结束关联时间"
						align="center">
				</el-table-column>

				<el-table-column
						prop="imei"
						label="imei"
						show-overflow-tooltip
						align="center">
				</el-table-column>
				<el-table-column
						prop="imsi"
						label="imsi"
						show-overflow-tooltip
						align="center">
				</el-table-column>
				<el-table-column
						prop="mac"
						label="mac"
						align="center">
				</el-table-column>
				<!-- <el-table-column
						prop="oaid"
						label="oaid"
						align="center">
				</el-table-column> -->
				<el-table-column
						prop="model"
						label="设备型号"
						align="center">
				</el-table-column>
				<!-- <el-table-column
						prop="brand"
						label="品牌"
						align="center">
				</el-table-column> -->
				<el-table-column
						prop="phone"
						label="⼿机号码"
						align="center">
				</el-table-column>
				<!-- <el-table-column
						prop="qCellCore"
						label="归属地"
						width="150"
						align="center">
				</el-table-column> -->
				<!-- <el-table-column
						prop="isp"
						label="运营商"
						width="150"
						align="center">
				</el-table-column> -->
			</el-table-column>
		</el-table>

		<el-table
				:data="changeRecordDetailList"
				style="width: 100%">
			<el-table-column label="换机换卡详情">
				<el-table-column
						show-overflow-tooltip
						prop="startTime"
						label="开始关联时间"
						align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="endTime"
						label="结束关联时间"
						align="center">
				</el-table-column>

				<el-table-column
						prop="imei"
						label="imei"
						show-overflow-tooltip
						align="center">
				</el-table-column>
				<el-table-column
						prop="imsi"
						label="imsi"
						show-overflow-tooltip
						align="center">
				</el-table-column>

				<el-table-column
						show-overflow-tooltip
						prop="mac"
						label="mac"
						align="center">
				</el-table-column>

				<el-table-column
						show-overflow-tooltip
						prop="oaid"
						label="oaid"
						align="center">
				</el-table-column>

				<el-table-column
						show-overflow-tooltip
						prop="model"
						label="设备型号"
						align="center">
				</el-table-column>

				<el-table-column
						show-overflow-tooltip
						prop="brand"
						label="品牌"
						align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="qCellCore"
						label="归属地"
						align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="isp"
						label="运营商"
						align="center">
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="language"
					label="语⾔"
					align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="version"
						label="系统版本"
						align="center">
				</el-table-column>

			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	import {
		getDictLabel,
		getDictDataList
	} from '@/utils'
	import {
    Message
} from 'element-ui'
	export default {
		filters: {
			formatterDate(timeStr){
				if (undefined  !== timeStr && timeStr.length > 10) {
					return timeStr.substring(0,10)
				}
				return timeStr
			},
			filterLabel(val, type) {
				return getDictLabel(type, val)
			},
		},
		mixinViewModuleOptions: {
			createdIsNeed: false, // 此页面是否在创建时，调用查询数据列表接口？
			activatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
		}, 
		components: {
		},
		data() {
			return { 
				genderList:[],
				dataForm: {
					name: '18520882984',
					type:'3'
				},
				data:[],
				genderList: getDictDataList('informationType'),
				historyDeviceList:[],
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
						{ url: '/kepler/v2/deviceInfo?keyType=' + this.dataForm.type+'&key='+this.dataForm.name, method: 'get' }).then(({ data: res }) => {
					if (res.code !== 0) {
						//   return; 
						Message.warning(res.msg)
					}
					//console.log(JSON.parse(res.data).deviceFeatureInfo);
					this.data = JSON.parse(res.data)
					this.historyDeviceList = this.data.historyDeviceList;
					this.changeRecordDetailList = this.data.changeRecordDetailList;
					//console.log(this.latestTraceLbsInfo)
					//console.log(this.deviceFeatureInfo)

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
