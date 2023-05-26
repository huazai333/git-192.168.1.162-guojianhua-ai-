<template>
  <el-dialog
          :title="type=='post'?'新建':'修改'"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
  >
    <div>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="100px">
        <!--        <el-row>
                  <el-col>
                    <el-form-item class="block-item" label="照片" prop="photo">
                      <img-clip v-model="dataForm.photo"  folder-name="staff"></img-clip>
                    </el-form-item>
                  </el-col>
                </el-row>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="dataForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="dataForm.idcard" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="访客电话" prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="dataForm.sex" placeholder="请输入">
                <el-radio
                        disabled
                        v-for="item in  genderList"
                        :key="item.dictLabel"
                        :label="item.dictValue"
                >{{item.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item label="访问时间" prop="visitorTime">
              <el-date-picker
                      style="width: 100%"
                      v-model="dataForm.visitorTime"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="被访问人" prop="interviewedId">
              <!--<el-input v-model="dataForm.interviewee" placeholder="请输入"></el-input>-->
              <el-select v-model="dataForm.interviewedId" clearable placeholder="请选择" filterable @change="getPhoneHandle">
                <el-option v-for="item in staffList" :label="item.scWaname" :value="item.scWaid" :key="item.scWaid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>

            <el-col :span="12" >
              <el-form-item label="访问楼层" prop="floorId">
                <el-cascader v-model="dataForm.floorId" :props="{ value: 'df_floorid', label: 'df_floorname',emitPath:false}"
                             clearable placeholder="请选择" :options="FloorList" style="width: 100%;"></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="11"  :offset="1">
              <el-form-item label="被访人电话" prop="interviewedMobile">
                <el-input v-model="dataForm.interviewedMobile" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="访问地址" prop="address">
                <el-input v-model="dataForm.address" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11" :offset="1">
              <el-form-item label="车牌号码" prop="carNum">
                <el-input v-model="dataForm.carNum" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="说明" prop="describe">
              <el-input v-model="dataForm.describes" placeholder="请输入(200字以内)" type="textarea" :autosize="{ minRows: 1, maxRows: 4}"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item label="选择门禁" prop="carNum">
              <el-select
                      v-model="dataForm.devices"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择门禁">
                <el-option
                        v-for="item in deviceList"
                        :key="item.aeId"
                        :label="item.aeDevicename"
                        :value="item.aeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
  import { treeDataTranslate } from '@/utils'
  import debounce from 'lodash/debounce'
  import Cookies from 'js-cookie'
  import imgClip from '@/components/public/img-clip'
  export default {
    components:{ imgClip },
    watch:{
      'dataForm.idcard':{
        immediate:true,
        handler(val){
          let gender='0';
          if(val&&val.length===18){
            gender=val[16]%2 === 0 ? '0' : '1';
          }
          this.dataForm.sex=gender
        }
      }
    },
    data(){
      return {
        staffList:[],
        FloorList:[],
        deviceList:'',
        dialogVisible:false,
        loading:false,
        imgLoading:false,
        type:'post',
        dataForm:{
          devices:'',
          interviewedId:'',
          photo:'',
          name:'',
          idcard:'',
          sex:'0',
          mobile:'',
          visitorTime:'',
          startTime:'',
          endTime:'',
          describes:'',
          floorId:'',
          address:'',
          interviewedMobile:''
        },
        genderList:getDictDataList('gender').filter(item=>item.dictValue<2),
        rules:{
          /*                photo:[
                              {required: true, message:'请上传图片', trigger: ['blur','change']},
                          ],*/
          name:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            {max: 50, message:'最多50个字符', trigger: ['blur','change']}
          ],
          idcard:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            { validator: idCardValidate, trigger: ['blur','change'] }
          ],
          sex:[
            {required: true, message:'请输入', trigger: ['blur','change']}
          ],
          mobile:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            { validator: isMobile, trigger: ['blur','change'] }
          ],
          /*                 code:[
                              {required: true, message:'请输入', trigger: ['blur','change']},
                              {max: 15, message:'最多15个字符', trigger: ['blur','change']}
                          ],*/
          interviewedId:[
            {required: true, message:'请输入', trigger: ['blur','change']}
          ],
          floorId: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value.length === 0) {
              return callback(new Error("请选择"));
            } else if (value.length === 1) {
              return callback(new Error("请选择楼层"));
            } else {
              return callback();
            }
          },
          trigger: 'change'
        }],
          /*              scEmptype:[
                              {required: true, message:'请选择', trigger: ['blur','change']}
                          ], */
          visitorTime:[
            {required: true, message:'请选择', trigger: ['blur','change']}
          ]
          /*                , status:[
                              {required: true, message:'请选择', trigger: ['blur','change']}
                          ]*/

        },
        uploadHeaders:{},
        uploadUrl:window.SITE_CONFIG['apiURL']+'/system/upload'
      }
    },
    created(){
      this.uploadHeaders={
        Authorization:'Bearer ' + Cookies.get('access_token') || ''
      }
      //this.getGender()
      // this.getUnitList()
    },
    methods:{

      // 获取楼栋和楼层的cascader
      getTfSetupaddrList() {
        // -1是获取所有楼栋
        this.$http.get(`/system/scdormitoryfloor/tree/-1`).then(({
                                                                   data: res
                                                                 }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.FloorList = treeDataTranslate(res.data, 'df_floorid', 'df_parentid')
        }).catch(() => {})
      },
      // 获取职工信息
      getStaffList() {
        this.$http.get(`/system/scworkersarchives/getAll`).then(({
                                                                   data: res
                                                                 }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.staffList = res.data
        }).catch(() => {})
      },
      // 根据职工联动手机号码
      getPhoneHandle(e) {
        if (e) {
          this.staffList.forEach(item => {
            if (e === item.scWaid) {
              this.dataForm.interviewedMobile = item.scPhonenum
            }
          })
        } else {
          this.dataForm.interviewedMobile = ""
        }
      },
      getDeviceAll(){
        this.$http({
          url:"/system/scaidooreight/getAll",
          method:'get',
          data:this.dataForm
        }).then(({data})=>{
          if(data.code!=0){
            return this.$message.error(data.msg)
          }
          this.deviceList = data.data
        }).finally(()=>{
          this.loading=false;
        })
      },

      init(data){
        this.dialogVisible=true;
        this.getTfSetupaddrList() // 获取楼栋、楼层
        this.getStaffList() // 获取职工信息
        this.getDeviceAll()
        // 编辑
        if(data){
          this.type="put";
          this.dataForm={
            ...data,
            sex:String(data.sex),
            status:String(data.status),
          }
        }
        else{
          this.type="post";
          this.dataForm={
            unitId:'',
            photo:'',
            name:'',
            idcard:'',
            sex:'0',
            mobile:'',
            code:'',
            status:'',
            endTime:''
          }
          this.$nextTick(()=>{
            this.$refs['dataForm'].clearValidate()
          })
        }
      },

      submitInfo:debounce(function(){
        this.$refs['dataForm'].validate((valid)=>{
          if(!valid){
            return  false
          }
          this.dataForm.startTime =  this.dataForm.visitorTime[0]
          this.dataForm.endTime =  this.dataForm.visitorTime[1]
          this.loading=true;
          this.$http({
            url:"/system/visitor/apply",
            method:this.type,
            data:this.dataForm
          }).then(({data})=>{
            if(data.code!=0){
              return this.$message.error(data.msg)
            }
            this.dialogVisible=false;
            if(this.type=='post'){
              this.$parent.$parent.resetQuery();
            }
            else{
              this.$parent.$parent.search();
            }
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
