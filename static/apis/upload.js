import request from '@/static/js/base';

// 获取OSS上传参数
function getUploadOSSParams(file) {
  const ext = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
  return request({
    data: {
      method: "upload.getUploadData",
      data: {
        ext,
        type: 'ali-oss',
      },
    }
  })
}

function uploadImage2ServerByUniApp(file, {
  serverUrl,
  fileKey,
  policyBase64,
  accessid,
  signature,
}) {
  return uni.uploadFile({
    url: serverUrl,
    filePath: file,
    fileType: 'image',
    name: 'file',
    formData: {
      'key': fileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
  })
}

async function uploadImage(file) {
  try {
    const ossParams = await getUploadOSSParams(file);
    await uploadImage2ServerByUniApp(file, ossParams.data.result);
    return `${ossParams.data.result.serverUrl}${ossParams.data.result.fileKey}`
  } catch (e) {
    console.log('error ===>', e);
  }
}

export {
  getUploadOSSParams,
  uploadImage2ServerByUniApp,
  uploadImage,
}
