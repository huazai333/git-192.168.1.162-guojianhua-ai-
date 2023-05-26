<template>
  <el-dialog
          :title="type=='post'?'新建':'修改'"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
  >
    <div>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="cName">
              <el-input v-model.trim="dataForm.cname" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="车牌号码" prop="carNo">
              <el-input v-model="dataForm.carNo" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="cId">
              <el-input v-model.trim="dataForm.cid" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="dataForm.lxdh" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="住址" prop="zzwz">
              <el-input v-model.trim="dataForm.zzwz" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="车牌类型" prop="cplx">
              <el-select v-model="dataForm.cplx" placeholder="请选择">
                <el-option
                        v-for="item in carTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="收费类型" prop="sflx">
              <el-select v-model="dataForm.sflx" placeholder="请选择">
                <el-option key="1" label="月卡" value="1"></el-option>
                <el-option key="2" label="临时车" value="2"></el-option>
                <el-option key="3" label="免费车" value="3"></el-option>
                <el-option key="4" label="储值卡" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="统计车位" prop="tjcw">
                <el-radio label="1" v-model="dataForm.tjcw">参与</el-radio>
                <el-radio label="2"  v-model="dataForm.tjcw">不参与</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" >
            <el-form-item label="通行时间" prop="date">
              <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="dataForm.date"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
              </el-date-picker>
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
  import debounce from 'lodash/debounce'
  import Cookies from 'js-cookie'
  import imgClip from '@/components/public/img-clip'
  export default {
    data(){
      return {
        carTypes: [{
          value: '1',
          label: '民用'
        }, {
          value: '2',
          label: '军队'
        }, {
          value: '3',
          label: '警用'
        }, {
          value: '4',
          label: '武警'
        }],
        dialogVisible:false,
        loading:false,
        imgLoading:false,
        type:'post',
        dataForm:{
          cname:'',
          carNo:'',
          lxdh:'',
          zzwz:'',
          cid:'',
          cplx:'1',
          sflx:'1',
          tjcw: '1',
          date:'',
          ksrq:'',
          jzrq:''
        },
        genderList:getDictDataList('gender').filter(item=>item.dictValue<2),
        rules:{
          carNo:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            {max: 10, message:'最多10个字符', trigger: ['blur','change']}
          ],
          cname:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            {max: 50, message:'最多50个字符', trigger: ['blur','change']}
          ],
          lxdh:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            { validator: isMobile, trigger: ['blur','change'] }
          ],
          zzwz:[
            {required: true, message:'请输入', trigger: ['blur','change']},
          ],
          cplx:[
            {required: true, message:'请输入', trigger: ['blur','change']},
          ],
          sflx:[
            {required: true, message:'请输入', trigger: ['blur','change']},
          ],
          tjcw:[
            {required: true, message:'请输入', trigger: ['blur','change']},
          ],
          date:[
            {required: true, message:'请输入', trigger: ['blur','change']},
          ],
          cid:[
            {required: true, message:'请输入', trigger: ['blur','change']},
            { validator: idCardValidate, trigger: ['blur','change'] }
          ],
        },
        uploadHeaders:{},
        uploadUrl:window.SITE_CONFIG['apiURL']+'/system/upload'
      }
    },
    created(){
      this.uploadHeaders={
        Authorization:'Bearer ' + Cookies.get('access_token') || ''
      }
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
          }
        }
        else{
          this.type="post";

          this.dataForm={
            cname:'',
            carNo:'',
            lxdh:'',
            zzwz:'',
            cid:'',
            cplx:'1',
            sflx:'1',
            tjcw: '1',
            date:'',
            ksrq:'',
            jzrq:''
          },
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
        }).catch(() => {})
      },
      submitInfo:debounce(function(){
        this.$refs['dataForm'].validate((valid)=>{
          if(!valid){
            return  false
          }
          console.log(this.dataForm.date)
          this.dataForm.ksrq = this.dataForm.date[0]
          this.dataForm.jzrq = this.dataForm.date[1]
          this.loading=true;
          this.$http({
            url:"/system/park/car",
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
