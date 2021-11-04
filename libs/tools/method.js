// 封装公共方法

const { fse } = require('./module')

/**
 * @description 判断某个文件夹是否存在
 * @param { string } path 目标文件夹的路径
 */
function isExistsTargetDir(path) {
  try {
    return !!fse.existsSync(path)
  } catch (error) {
    console.log('isExistsTargetDir__err', err)
    return err
  }
}

/**
 * @description 读取某文件夹目录下的文件列表
 * @param { string } path 目标文件夹的路径
 * @param { function } cb 回调函数，需要返回处理后的文件列表
 */
function getTargetDirFiles(path, cb) {
  try {
    // 返回值格式为 [ 'fr.sh', 'gp.sh', 'rbm.sh' ]，进行过滤非sh文件
    let shFilesList = (fse.readdirSync(path) || [])
    shFilesList = cb ? cb(shFilesList) : shFilesList
    console.log(`Read shell directory success!`)
    return shFilesList
  } catch (err) {
    console.log('readdirSync__err', err)
    return []
  }
}

/**
 * @description 将某文件拷贝到指定目录下
 * @param { string } originPath 源文件的路径
 * @param { string } destPath 目标文件路径
 */
function copyFilesToDestDir(originPath, destPath) {
  try {
    fse.copySync(originPath, destPath)
    console.log(`Copy files success!`)
  } catch (err) {
    console.log('copyFilesToDestDir__err', err)
  }
}

/**
 * @description 创建文件目录
 * @param { string } destPath 需创建的目标路径
 */
function ensureDestDir(destPath) {
  try {
    fse.ensureDirSync(destPath)
    let dirName = ''
    if (destPath && destPath.lastIndexOf('/') !== 0) {
      const idx = destPath.lastIndexOf('/')
      dirName = destPath.slice(idx)
    }
    console.log(`Ensure directory ${dirName ? 'of' + dirName : ''} success!`)
  } catch (err) {
    console.log('ensureDestDir__err', err)
  }
}

module.exports = {
  isExistsTargetDir,
  getTargetDirFiles,
  copyFilesToDestDir,
  ensureDestDir
}