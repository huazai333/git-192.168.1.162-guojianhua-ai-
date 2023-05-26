<template>
    <el-card shadow="never" class="aui-card--fill">
        <div class="mod-sys__user">
            <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">

                <el-form-item>
                    <el-input v-model="dataForm.name" placeholder="单位名称" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="getDataList()">{{ $t('query') }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
                </el-form-item>

            </el-form>

            <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    border
                    @selection-change="dataListSelectionChangeHandle"
                    @sort-change="dataListSortChangeHandle"
                    style="width: 100%;">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>

                <el-table-column prop="name" label="单位名称"  header-align="center" align="center"></el-table-column>
                <el-table-column prop="status" label="状态"  header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1" size="small" type="success">正常</el-tag>
                        <el-tag v-else size="small" type="danger">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable="custom" header-align="center" align="center"></el-table-column>

                <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" >
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
                        <el-button  type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    :current-page="page"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="limit"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="pageSizeChangeHandle"
                    @current-change="pageCurrentChangeHandle">
            </el-pagination>
            <!-- 弹窗, 新增 / 修改 -->
            <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
            <device-details v-if="detailVisible" ref="deviceDetails" ></device-details>
        </div>
    </el-card>
</template>

<script>
    import mixinViewModule from '@/mixins/view-module'
    import AddOrUpdate from './add-or-update'
    export default {
        mixins: [mixinViewModule],
        data () {
            return {
                mixinViewModuleOptions: {
                    activatedIsNeed:false,
                    getDataListURL: '/system/unit',
                    getDataListIsPage: true,
                    deleteURL: '/system/unit',
                    deleteIsBatch: false
                },
                detailVisible:false,
                dataForm: {
                    account:'',
                    username:''
                }
            }
        },
        components: {
            AddOrUpdate
        },
        methods:{
            showDetails(id){
                this.detailVisible = true
                this.$nextTick(() => {
                    this.$refs.deviceDetails.deviceId = id
                    this.$refs.deviceDetails.init()
                })
            }
        }
    }
</script>
