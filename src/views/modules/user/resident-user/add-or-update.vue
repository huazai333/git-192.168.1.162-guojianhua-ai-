<template>
  <el-dialog
    :title="type=='post'?'新建':'修改'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
  >
    <div>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item class="block-item" label="照片" prop="photo">
              <!-- <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
                :data="{folderName:'staff'}"
              >
                <img v-if="dataForm.scPhotoimg" :src="$ImgServerUrl+dataForm.scPhotoimg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" v-loading="imgLoading"></i>
              </el-upload> -->
              <img-clip v-model="dataForm.photo"  folder-name="staff"></img-clip>

            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item label="联系电话" prop="mobile">
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
          <el-col :span="12">
            <el-form-item label="编号" prop="code">
              <el-input v-model="dataForm.code" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="有效期" prop="endTime">
              <el-date-picker
                      v-model="dataForm.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
<!--          <el-col :span="11" :offset="1">
            <el-form-item label="类型" prop="scEmptype">
              <el-select v-model="dataForm.scEmptype" placeholder="请选择" clearable>
                <el-option
                  v-for="item in employTypeList"
                  :key="item.dictLabel"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item  label="常驻单位" prop="unitId">
              <el-select v-model="dataForm.unitId" filterable placeholder="请选择">
                <el-option
                        v-for="item in unitList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="说明" prop="describe">
              <el-input v-model="dataForm.describe" placeholder="请输入(200字以内)" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="11" :offset="1">
            <el-form-item label="状态" prop="status">
              <el-select v-model="dataForm.status" placeholder="请选择" clearable>
                <el-option
                  v-for="item in staffStatusList"
                  :key="item.dictLabel"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
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
import debounce from 'lodash/debounce'
import Cookies from 'js-cookie'
import imgClip from '@/components/public/img-clip'
export default {
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
            unitList: [],
            dialogVisible:false,
            loading:false,
            imgLoading:false,
            type:'post',
            dataForm:{
                unitId:'',
                photo:'',
                name:'',
                idcard:'',
                sex:'1',
                mobile:'',
                code:'',
                status:'',
                endTime:'',
              describe:''
            },
            genderList:getDictDataList('gender').filter(item=>item.dictValue<2),
            rules:{
                photo:[
                    {required: true, message:'请上传图片', trigger: ['blur','change']},
                ],
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
              unitId:[
                {required: true, message:'请输入', trigger: ['blur','change']}
              ],
/*              scEmptype:[
                    {required: true, message:'请选择', trigger: ['blur','change']}
                ], */
              endTime:[
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
        this.getGender()
        this.getUnitList()
    },
    methods:{

      getGender(){
        this.$http({url:'/sys/dict/data/getByType?type=gender',method:'get',data:{type : 'gender'}}).then(({ data: res }) => {
          if (res.code !== 0) {
            return
          }

          this.genderList = res.data

        })
      },

        init(data){
            this.dialogVisible=true;
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
                 this.$http({
                    url:"/system/resident/user/apply",
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
