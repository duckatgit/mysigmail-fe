<template>
  <div class="upload">
    <el-button
      class="upload__btn"
      @click="openCropDialog"
    >
      Upload image
    </el-button>
    <el-dialog
      title="Upload image"
      :visible.sync="showCropDialog"
    >
      <div class="crop-preview-wrapper">
        <div
          v-show="cropPreview"
          class="crop-preview"
        >
          <img
            ref="cropper"
            :src="cropPreview"
            alt="crop-preview"
          >
        </div>
      </div>
      <el-upload
        ref="upload"
        action=""
        :on-change="onChange"
        :http-request="onUpload"
        :before-upload="onBeforeUpload"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        @submit.prevent
      >
        <div slot="trigger">
          <button
            ref="uploadButton"
            style="display: none;"
          />
        </div>
        <div
          v-if="cropPreview"
          class="aspect-ratio-buttons"
        >
          <el-radio-group
            v-model="aspectRatio"
            size="mini"
            @change="changeAspectRation"
          >
            <el-radio-button :label="1">
              1:1
            </el-radio-button>
            <el-radio-button :label="4 / 3">
              4:3
            </el-radio-button>
            <el-radio-button :label="2 / 3">
              2:3
            </el-radio-button>
            <el-radio-button :label="16 / 9">
              16:9
            </el-radio-button>
            <el-radio-button :label="NaN">
              Free
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="upload-action">
          <!-- <el-button @click.prevent="$refs.uploadButton.click()">
            Select image
          </el-button> -->
          <label for="img">Select image:</label>
          <input
            id="img"
            type="file"
            name="img"
            accept="image/*"
            @change="handleFileSelect"
          >
          <div>
            <button
              style="background-color: #409eff;
  color: #fff; padding: 5px; width: 80px;"
              @click.prevent="uploadToAWS"
            >
              Save
            </button>
          </div>
          <!-- <el-button v-if="cropPreview" type="success" @click="onUpload">
            Save
          </el-button> -->
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import S3 from 'aws-sdk/clients/s3'
import { guid } from '@/util/helpers'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'Upload',

  props: {
    cropWidth: {
      type: Number,
      default: null
    },
    cropHeight: {
      type: Number,
      default: null
    },
    quality: {
      type: Number,
      default: 0.9
    },
    getSignDetails: {
      type: Function

    }

  },

  data () {
    return {
      fileRaw: '',
      showCropDialog: false,
      cropper: undefined,
      aspectRatio: NaN,
      selectedFile: null
    }
  },

  computed: {
    cropPreview () {
      if (this.fileRaw) {
        return URL.createObjectURL(this.fileRaw)
      }
    }
  },

  methods: {
    async uploadToAWS () {
      try {
        if (this.selectedFile) {
          const userId = localStorage.getItem('userId')
          const baseURL = process.env.VUE_APP_API_BASE_URL
          const URL = `${baseURL}/signature/upload-img/${userId}`

          const formData = new FormData()
          formData.append('image', this.selectedFile)

          const response = await fetch(URL, {
            method: 'POST',
            body: formData
          })
          const result = await response.json()

          if (response.ok) {
            this.$notify(
              {
                group: 'top',
                title: 'Image uploaded successfully'
              },
              4000
            )
            this.showCropDialog = false
            this.getSignDetails()
          } else {
            this.$notify(
              {
                group: 'top',
                title: result.data
              },
              4000
            )
          }
        } else {
          this.$notify(
            {
              group: 'top',
              title: 'Please select image'
            },
            4000
          )
        }
      } catch (error) {
        this.$notify(
          {
            group: 'top',
            title: 'Server Error!'
          },
          4000
        )
      }
    },
    handleFileSelect (input) {
      this.selectedFile = event.target.files[0]
    },
    onBeforeUpload (file) {
      this.checkUploadedFile(file)
    },
    checkUploadedFile (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      return new Promise((resolve, reject) => {
        if (!isJPG && !isPNG) {
          const message = 'Uploaded file should be a .jpg or .png.'

          this.$message({ message, type: 'error' })
          reject(new Error(message))
        }

        resolve(true)
      })
    },
    async onChange (file, fileList) {
      try {
        // await this.checkUploadedFile(file.raw)
        // this.fileRaw = file.raw
        // this.initCropper()
      } catch (err) {
        console.error(err)
      }
    },
    async onUpload (data) {
      const url = await this.uploadToS3()
      this.$emit('upload', url)
      this.showCropDialog = false
      this.fileRaw = ''
    },
    async uploadToS3 () {
      const bucket = new S3({
        accessKeyId: process.env.VUE_APP_AWS_S3_ID,
        secretAccessKey: process.env.VUE_APP_AWS_S3_KEY,
        region: process.env.VUE_APP_AWS_S3_REGION
      })

      const name = this.fileRaw.name
      const ext = name.match(/.jpg|.jpeg|.png$/i)[0]
      const date = new Date().toJSON().substr(0, 10)
      const file = `${date}-${guid()}${ext}`
      const key = `upload/${file}`
      const croppedImage = await this.getCroppedImage()

      return new Promise((resolve, reject) => {
        bucket.putObject({
          Bucket: process.env.VUE_APP_AWS_S3_BASKET,
          Key: key,
          ContentType: this.fileRaw.type,
          Body: croppedImage.blob
        }, (err, data) => {
          if (err) return reject(err)
          const res = process.env.VUE_APP_AWS_S3_URL + '/' + key
          return resolve(res)
        })
      })
    },
    changeAspectRation (aspect) {
      this.aspectRatio = aspect
      this.cropper.setAspectRatio(this.aspectRatio)
    },
    getCroppedImage () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas({
          width: this.cropWidth,
          height: this.cropHeight,
          imageSmoothingQuality: 'medium'
        }).toBlob(blob => {
          resolve({
            blob: blob,
            url: URL.createObjectURL(blob)
          })
        }, this.fileRaw.type, this.quality)
      })
    },
    openCropDialog () {
      this.showCropDialog = true
      this.$nextTick(() => {
        this.initCropper()
      })
    },
    initCropper () {
      if (typeof this.cropper === 'object') {
        this.cropper.destroy()
      }
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs.cropper, {
          aspectRatio: this.aspect,
          viewMode: 1,
          autoCropArea: 1
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.crop-preview-wrapper {
  overflow: hidden;
  padding-bottom: 5px;
}

.crop-preview {
  padding: 2px 0;
  max-height: 250px;
  padding-bottom: 20px;

  img {
    max-width: 100%;
  }

  &__placeholder {
    width: 100%;
    height: 200px;
    background-color: #eee;
    border: 1px dashed $color-info;
    border-radius: 3px;
  }
}

.upload-action,
.aspect-ratio-buttons {
  text-align: center;
}

.aspect-ratio-buttons {
  margin-bottom: 10px;
}
</style>
