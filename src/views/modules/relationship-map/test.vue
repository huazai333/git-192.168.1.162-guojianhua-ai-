<template>
	<div>
		<div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
			
			<SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick">

				<div slot="node" slot-scope="{node}" v-if="node.data.myicon ==='1'">
					<div style="color: forestgreen;font-size: 16px;position: absolute;width: 358px;height:25px;line-height: 25px;text-align: center;margin-left: -13px;">
						<el-table
								:data="tableData"
								header-align="center"
								align="center"
								style="width: 100%">
							<el-table-column
									prop="mac"
									header-align="center"
									align="center"
									width="180"
									label="设备Mac">
							</el-table-column>
							<el-table-column
									prop="name"
									header-align="center"
									align="center"
									label="连接次数">
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<div>
										<el-button type="text">分析</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<div slot="node" slot-scope="{node}" v-else-if="node.data.myicon ==='2'">
					<div style="color: forestgreen;font-size: 16px;position: absolute;width: 454px;height:25px;line-height: 25px;text-align: center;margin-left: -13px;">
						<el-table
								:data="tablesData"
								header-align="center"
								align="center"
								style="width: 100%">
							<el-table-column
									prop="mac"
									header-align="center"
									align="center"
									width="150"
									label="连接时间段">
							</el-table-column>
							<el-table-column
									prop="ssid"
									header-align="center"
									align="center"
									label="连接热点">
							</el-table-column>
							<el-table-column
									prop="name"
									header-align="center"
									align="center"
									label="连接次数">
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<div>
										<el-button type="text">分析</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<div slot="node" slot-scope="{node}" v-else>
					<div v-if="node.id==='2'">
						<div style="height:64px;line-height: 64px;border-radius: 32px;cursor: pointer; margin-top:40px;" >
							<i style="font-size: 30px;" :class="node.data.myicon" />
						</div>
						<div style="color: forestgreen;font-size: 16px;position: absolute;width: 160px;height:25px;line-height: 25px;margin-top:45px;margin-left:-20px;text-align: center;background-color: rgba(66,187,66,0.2);">
							{{ node.text }}
						</div>
					</div>
					<div v-else>
						<div style="height:64px;line-height: 64px;border-radius: 32px;cursor: pointer; margin-top: 5px;" >
							<i style="font-size: 30px;margin-top:5px" :class="node.data.myicon" />
						</div>
						<div style="color: forestgreen;font-size: 16px;position: absolute;width: 160px;height:25px;line-height: 25px;margin-top:5px;margin-left:-48px;text-align: center;background-color: rgba(66,187,66,0.2);">
							{{ node.text }}
						</div>
					</div>
				</div>

			</SeeksRelationGraph>
		</div>
	</div>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	import SeeksRelationGraph  from 'relation-graph'
	import {
		getDictLabel
	} from '@/utils'
	export default {
		mixins: [mixinViewModule],
		components: {
			SeeksRelationGraph 
		},
		data() {
			return {
				isShowCodePanel: false,
				graphOptions: {
					isMoveByParentNode:true,
					defaultNodeBorderWidth: 0,
					allowSwitchLineShape: true,
					allowSwitchJunctionPoint: true,
					defaultLineShape: 1,
					'layouts': [
						{
							'label': '中心',
							'layoutName': 'center',
							'layoutClassName': 'seeks-layout-center'
						}
					],
					defaultJunctionPoint: 'border'
					// 这里可以参考"Graph 图谱"中的参数进行设置
				},
				tableData: [{
					mac: 'mac:88:44:EE:55:22',
					name: '50 /次',
				}, {
					mac: 'mac:88:44:EE:55:22',
					name: '50 /次',
				}, {
					mac: 'mac:88:44:EE:55:22',
					name: '50 /次',
				}],
				tablesData: [{
					mac: '2021/12/28 09:00:00',
					name: '50 /次',
					ssid:'TP-LINK-004'
				}, {
					mac: '2021/12/28 09:00:00',
					name: '50 /次',
					ssid:'TP-LINK-005'
				}, {
					mac: '2021/12/28 09:00:00',
					name: '50 /次',
					ssid:'TP-LINK-005'
				}],
				links:null,
				nodes:null,
			}
		},
		created(){
          	this.$http("/hadoop/task/test").then((res) => {
				this.links = res.data.data.links
				this.nodes = res.data.data.nodes	
				
				console.log(res.data)
				
				this.showSeeksGraph()
				
			});
                
        },
		mounted() {

		},
		methods: { 
			showSeeksGraph(query) {
				
				var __graph_json_data = {
					rootId: '2',
					nodes: this.nodes,
					links: this.links
				}
				this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
					// 这些写上当图谱初始化完成后需要执行的代码
					
				})
			},
			showConInfo(nodeObject){
				var __graph_json_data = {
					rootId: nodeObject.id,
					nodes: [
						{ id: nodeObject.id+'E', text: 'mac:8E:6F:AE:FF:8E', borderWidth: 1, nodeShape: 1, width: 364, height: 255 ,data: { myicon: '1' }},
					],
					links: [
						{ from:nodeObject.id+'E'  , to:  nodeObject.id, text: '时间连接段详情' },
					]
				}
				this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
					// 这些写上当图谱初始化完成后需要执行的代码
				})
			},
			showPhoneInfo(nodeObject){
				var __graph_json_data = {
					rootId: nodeObject.id,
					nodes: [
						{ id: nodeObject.id+'E', text: 'mac:8E:6F:AE:FF:8E', borderWidth: 1, nodeShape: 1, width: 460, height: 255 ,data: { myicon: '2' }},
					],
					links: [
						{ from:nodeObject.id+'E'  , to:  nodeObject.id, text: '时间连接段详情' },
					]
				}
				this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
					// 这些写上当图谱初始化完成后需要执行的代码
				})
			},
			onNodeClick(nodeObject, $event) {
				console.log('onNodeClick:', nodeObject)

				console.log(nodeObject.id)
				if(nodeObject.id.indexOf('p') !=-1){
					this.showPhoneInfo(nodeObject);
				}else{
					this.showConInfo(nodeObject);
				}
				if(nodeObject.id.indexOf('E') !=-1){
					nodeObject.isHide=true;
				}
			},
			onLineClick(lineObject, $event) {
				console.log('onLineClick:', lineObject)
			},



		}
	}
</script>
<style lang="scss" scoped>
	.c-node-menu-item{
		line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
	}
	.c-node-menu-item:hover{
		background-color: rgba(66,187,66,0.2);
	}
</style>




