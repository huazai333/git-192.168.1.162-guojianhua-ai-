<template>
  <el-dialog
    title="档案信息"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false" >
    <div>
      <el-table
              :data="feature"
              style="width: 100%">

        <el-table-column label="设备信息">
            <el-table-column
                    prop="name"
                    label="系统类型"
                    >
            </el-table-column>
            <el-table-column
                    prop="model"
                    label="上报机型">
            </el-table-column>
            <el-table-column
                    prop="brandNew"
                    label="设备品牌">
            </el-table-column>
            <el-table-column
                    prop="osVersion"
                    label="操作系统">
            </el-table-column>
            <el-table-column
                    prop="macAddress"
                    label="MAC">
            </el-table-column>
            <el-table-column
                    prop="imeis"
                    label="IMEI">
            </el-table-column>
            <el-table-column
                    prop="imsis"
                    label="IMSI">
            </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上报时间">
          </el-table-column>
        </el-table-column>
      </el-table>

      <el-table
              :data="trajectory"
              style="width: 100%">

        <el-table-column label="轨迹信息">
            <el-table-column
                    prop="country"
                    label="国家">
            </el-table-column>
            <el-table-column
                    prop="province"
                    label="省">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="市">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="lng"
                    label="经度">
            </el-table-column>
            <el-table-column
                    prop="lat"
                    label="纬度">
            </el-table-column>
          <el-table-column
                  prop="coordinateSource"
                  label="地址来源">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上报时间">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
              :data="tableData"
              style="width: 100%">

        <el-table-column label="热点信息">
          <el-table-column
                  prop="ssid"
                  label="热点名称">
          </el-table-column>
          <el-table-column
                  prop="city"
                  label="WIFMAC">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="连接时间">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="连接类型">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="WIFI类型">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="数据源">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="经纬度">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上报时间">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
              :data="tableData"
              style="width: 100%">

        <el-table-column label="基站信息">
          <el-table-column
                  prop="province"
                  label="基站ID">
          </el-table-column>
          <el-table-column
                  prop="city"
                  label="区域代码">
          </el-table-column>
          <el-table-column
                  prop="接入号码"
                  label="市">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="网络代码">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上网模式">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="网络类型">a
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="坐标信息">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上报时间">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
              :data="tableData"
              style="width: 100%">

        <el-table-column label="应用信息">
          <el-table-column
                  prop="province"
                  label="包名">
          </el-table-column>
          <el-table-column
                  prop="city"
                  label="应用名">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="应用版本">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="应用类型">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="首次安装时间">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="最后安装时间">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="卸载次数">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上报时间">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
              :data="tableData"
              style="width: 100%">

        <el-table-column label="换机换卡">
          <el-table-column
                  prop="province"
                  label="IMEI">
          </el-table-column>
          <el-table-column
                  prop="city"
                  label="IMSI">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="MAC">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="手机号码">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="运营商">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="设备型号">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="品牌">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="上报时间">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" v-loading="loading" @click="submitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getDictDataList} from '@/utils'
import { isMobile,idCardValidate } from '@/utils/validate'
import debounce from 'lodash/debounce'
import Cookies from 'js-cookie'
import imgClip from '@/components/public/img-clip'
import qs from 'qs'
export default {
  filters: {
    formatterStatus(status){
      if (1 === status) return '审核中'
      else if (2 === status) return '审核通过'
      else if (3 === status) return '审核不通过'
      else if (4 === status) return '已取消'
    },
  },
    components:{ imgClip },
    watch:{
        'dataForm.idcard':{
            immediate:true,
            handler(val){
                let gender='2';
                if(val&&val.length==18){
                    gender=val[16]%2==0?'2':'1';
                }
                this.dataForm.sex=gender
            }
        }
    },
    data(){
        return {
          app: [],
          feature: [],
          trajectory: [],
          unitList: [],
          dialogVisible: false,
          loading: false,
          imgLoading: false,
          type: 'post',
          dataForm: {
            id: '',
            unitId: '',
            photo: '',
            name: '',
            idcard: '',
            sex: '1',
            mobile: '',
            code: '',
            status: '',
            endTime: '',
            result: 1,
            describe: ''
          },
          reviewFrom: {
            result: true,
            describes: ''
          },
          genderList: getDictDataList('gender').filter(item => item.dictValue < 2),
          rules: {
            result: [
              { required: true, message: '请输入', trigger: ['blur', 'change'] }
            ]
          },
          uploadHeaders: {},
          uploadUrl: window.SITE_CONFIG['apiURL'] + '/system/upload'
        }
    },
    created(){
        this.uploadHeaders={
            Authorization:'Bearer ' + Cookies.get('access_token') || ''
        }
        //this.getGender()
        this.getUnitList()
    },
    methods:{

      getGender(key) {
        this.$http(
          { url: '/system/device/' + key, method: 'get' }).then(({ data: res }) => {
          if (res.code !== 0) {
            return
          }
          console.log(res.data);
          this.dataForm = {
            ...this.dataForm,
            ...res.data.feature
          }
          this.feature=[this.dataForm];
          this.app = res.data.app;
          this.trajectory = res.data.trajectory;

        })
      },

        init(data){
            this.dialogVisible=true;
            // 编辑
            if(data){
                //this.type="put";
                this.dataForm={
                    ...data,
                  status:String(data.status),
                  date:[data.startDate,data.endDate],
                  result:true
                }
            }
            else{
                this.type="post";
                this.dataForm={
                      unitId:'',
                      photo:'',
                      name:'',
                      idcard:'',
                      sex:'1',
                      mobile:'',
                      code:'',
                      status:'',
                      endTime:''
                }
                this.$nextTick(()=>{
                  this.$refs['dataForm'].clearValidate()
                })
            }
          this.getGender(data.key);
        },
      // 获取部门列表
      getUnitList () {
        return this.$http.get('/system/unit/all').then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.unitList = res.data
        }).catch(() => {})
      },
        submitInfo:debounce(function(){
            this.$refs['dataForm'].validate((valid)=>{
                if(!valid){
                    return  false
                }
                this.loading=true;
                this.reviewFrom.result = this.dataForm.result
                 this.$http({
                    url:"/system/review/"+3+"/" + this.dataForm.id,
                    method:'post',
                    data:qs.stringify(this.reviewFrom)
                }).then(({data})=>{
                    if(data.code!=0){
                        return this.$message.error(data.msg)
                    }
                    this.dialogVisible=false;
                   this.$parent.$parent.search();
                    this.$message.success(data.msg)
                }).finally(()=>{
                  this.loading=false;
                })
            })

        },1000),
        handleUploadSuccess(res){
            this.imgLoading=false;
            if(res.code!=0){
                return this.$message.error(res.msg)
            }
            this.dataForm.scPhotoimg=res.data.path;
        },
        beforeUpload(file){
            const isJPG=file.type=='image/jpeg'||file.type=='image/png';
            const isLess2M=file.size/1024 /1024<2;
            if(!isJPG){
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if(!isLess2M){
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.imgLoading=isJPG && isLess2M;
            return isJPG && isLess2M;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-dialog {
  .el-form {
    .el-form-item {
      .el-date-editor--date,
      .el-select {
        width: 100%;
      }
      /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-left: 20px;
        .avatar-uploader-icon {
          font-size: 28px;
          color: #fff;
          height: 150px;
          width: 106px;
          line-height: 150px;
          text-align: center;
        }
        .avatar {
          height: 150px;
          width: 106px;
          display: block;
        }
      }
    }
  }
}
</style>
