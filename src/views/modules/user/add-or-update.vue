<template>
	<el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false"
	 :close-on-press-escape="false">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()"
				 label-width="120px">
			<!--<el-form-item prop="photo" label="照片"  >
				<el-upload
					action="#"
					:limit="1"
					:file-list="fileList"
					list-type="picture-card"
					:on-change="changeFile"
					:auto-upload="false" >
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i class="el-icon-delete"></i></span>
						</span>
					</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" >
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>



			</el-form-item>-->


			<el-form-item prop="name" label="单位名称">
				<el-input v-model="dataForm.name" placeholder="单位名称"></el-input>
			</el-form-item>

		</el-form>
		<template slot="footer">
			<el-button @click="visible = false">{{ $t('cancel') }}</el-button>
			<el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
		</template>
	</el-dialog>
</template>

<script>
	import debounce from 'lodash/debounce'
	import imgClip from '@/components/public/img-clip'
	import {
		isEmail,
		isMobile
	} from '@/utils/validate'
	import {
		getDictDataList
	} from '@/utils'
	export default {
		components: {
			imgClip
		},
		data() {
			return {
				fileList:[],
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				visible: false,
				genderList: getDictDataList('gender'),
				dataForm: {
					id: '',
					name: ''
				}
			}
		},
		computed: {
			dataRule() {

				return {
					name: [{
						required: true,
						message: this.$t('validate.required'),
						trigger: 'blur'
					}]
				}
			}
		},


		methods: {


			init() {
				this.visible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
					if (this.dataForm.id) {
						this.getInfo()
					}
				})
			},

			// 获取信息
			getInfo() {
				this.$http.get(`/system/unit/${this.dataForm.id}`).then(({
					data: res
				}) => {
					if (res.code !== 0) {
						return this.$message.error(res.msg)
					}
					this.dataForm = {
						...this.dataForm,
						...res.data
					}
					let imgFile = this.base64ToFile(res.data.photo,'file')
					this.fileList = [imgFile]
				}).catch(() => {})
			},
			// 表单提交
			dataFormSubmitHandle: debounce(function() {
				this.$refs['dataForm'].validate((valid) => {
					if (!valid) {
						return false
					}
					this.$http[!this.dataForm.id ? 'post' : 'put']('/system/unit', this.dataForm
					).then(({
						data: res
					}) => {
						if (res.code !== 0) {
							return this.$message.error(res.msg)
						}
						this.$message({
							message: this.$t('prompt.success'),
							type: 'success',
							duration: 500,
							onClose: () => {
								this.visible = false
								this.$emit('refreshDataList')
							}
						})
					}).catch((error) => {
						alert(error)
					})
				})
			}, 1000, {
				'leading': true,
				'trailing': false
			})
		}
	}
</script>

<style lang="scss">
	.mod-sys__user {
		.dept-list {

			.el-input__inner,
			.el-input__suffix {
				cursor: pointer;
			}
		}

		.role-list {
			.el-select {
				width: 100%;
			}
		}
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
