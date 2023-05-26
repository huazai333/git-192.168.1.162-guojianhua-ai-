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
				<h5> * 查询设备安装APP记录</h5>
			</el-form-item>
		</el-form>
		<el-table
				:data="data"
				style="width: 100%">
			<el-table-column label="app应用">
				<!-- <el-table-column
						prop="icon"
						label="图标"
						width="100"
						align="center"style="width: 30px;height: 30px">
					<template slot-scope="scope">
						<el-image class="student-img" :src="scope.row.icon">
							<div slot="error" class="image-slot">
								<img class="student-img" src="../../../assets/img/person.jpg" >
							</div>
						</el-image>
					</template>
				</el-table-column> -->
				<el-table-column
						show-overflow-tooltip
						prop="name"
						label="应⽤名称"
						width="150"
						align="center">
				</el-table-column>
				<el-table-column
						show-overflow-tooltip
						prop="appVer"
						label="应⽤版本"
						width="100"
						align="center">
				</el-table-column>
				<el-table-column
						prop="clsOne"
						label="应⽤分类"
						align="center">
				</el-table-column>
				<!-- <el-table-column
						prop="pkg"
						label="包名"
						width="200"
						align="center">
				</el-table-column> -->
				<el-table-column
						prop="firstReportTimeTruly"
						label="⾸次安装时间"
						width="180"
						align="center">
				</el-table-column>
				<el-table-column
						prop="firstReportTime"
						label="末次安装时间"
						width="180"
						align="center">
				</el-table-column>
				<el-table-column
						prop="lastReportTime"
						label="最后活跃时间"
						width="180"
						align="center">
				</el-table-column>
				<el-table-column
					prop="uninstallTimes"
					label="卸载次数"
					align="center">
			   </el-table-column>
				<el-table-column
						prop="statusCname"
						label="安装状态"
						align="center">
				</el-table-column>
			<!--	<el-table-column
						prop="address"
						label="地址"
						align="center">
				</el-table-column>
				<el-table-column
						prop="wifi"
						label="wifi"
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
				</el-table-column>-->
				<el-table-column
						prop="isSystemApp"
						label="是否系统应⽤"
						align="center">
				</el-table-column>
				<el-table-column
						prop="isSmallApp"
						label="是否⼩众应⽤"
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
					type:'3'
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
						{ url: '/kepler/v2/app?keyType=' + this.dataForm.type+'&key='+this.dataForm.name, method: 'get' }).then(({ data: res }) => {
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
