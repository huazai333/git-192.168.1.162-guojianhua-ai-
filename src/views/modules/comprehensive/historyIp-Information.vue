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
			<el-form-item >
				<h5> * 查询设备详情已经换机换卡记录</h5>
			</el-form-item>
		</el-form>
		<el-table
				:data="data"
				style="width: 100%">
			<el-table-column label="历史IP信息">
				<el-table-column
						prop="ip"
						label="ip"
						align="center">
				</el-table-column>
				<el-table-column
						prop="wifiMac"
						label="wifiMac"
						align="center">
				</el-table-column>
				<el-table-column
						prop="ssid"
						label="WiFi名称"
						align="center">
				</el-table-column>
				<el-table-column
						prop="connectType"
						label="连接类型"
						align="center">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.connectType === 'S'" size="small" type="warning">扫描</el-tag>
						<el-tag v-else-if="scope.row.connectType === 'C'" size="small" type="success">连接</el-tag>
					</template>
				</el-table-column>
				<el-table-column
						prop="source"
						label="IP来源"
						align="center">
				</el-table-column>
				<el-table-column
						prop="location"
						label="经纬度"
						align="center">
				</el-table-column>

				<el-table-column
					prop="address"
					label="详细位置信息"
					show-overflow-tooltip
					align="center">
			   </el-table-column>
				<el-table-column
						prop="itime"
						label="上报时间"
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
	import {Message} from 'element-ui'
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
				dataForm: {
					name: '18520882984',
					type:'3',
					date:['2021-03-17','2021-03-18']
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
						{ url: '/kepler/v2/historyIp?keyType=' + this.dataForm.type+'&key='+this.dataForm.name+'&start='+this.dataForm.date[0]+'&end='+this.dataForm.date[1]+'', method: 'get' }).then(({ data: res }) => {
					if (res.code !== 0) {
						//   return; 
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
