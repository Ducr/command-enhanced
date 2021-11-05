const { path, os, childProcess, execa } = require('../../libs/tools/module')
const { isExistsTargetDir, getTargetDirFiles, copyFilesToDestDir, ensureDestDir } = require('../../libs/tools/method')

// 初始化命令
module.exports = async function () {
  // 获取当前用户信息
  const userInfo = os.userInfo() || {}
  // 获取用户目录，格式为 C:\\Users\\ducr.du 转换为 C:/Users/ducr.du
  // const homedir = userInfo.homedir ? userInfo.homedir.replace(/\\\\/g, '/') : ''
  const homedir = userInfo.homedir ? path.normalize(userInfo.homedir) : ''
  // 拼接shell目录的路径
  const shellDir = path.join(__dirname, '../../shell')
  // 拼接需要复制到的当前用户目录下的目标路径，如：windows系统为 C:/Users/ducr.du/bin
  let destDir = path.join(homedir, 'bin')
  // 获取shell文件模板
  const shellFiles = getTargetDirFiles(shellDir) || []

  // 对window系统，目录分隔为'\', 对于UNIX系统，分隔符为'/'，针对'..'返回上一级；/与\\都被统一转换
  // path.normalize(p)

  // 若无shell模板文件，则不进行后续操作
  if (!shellFiles.length) {
    console.log(`No shell file can be copied`)
    return
  }
  
  // C:\Users\ducr.du目录下是否存在bin文件夹
  if (isExistsTargetDir(destDir) === true) {
    // 存在bin文件夹，直接复制进去
    copyFilesToDestDir(path.normalize(shellDir), path.normalize(destDir))
    executeScript(path.normalize(destDir))
  } else if (isExistsTargetDir(destDir) === false) {
    // 存在bin文件夹，需要先创建bin文件夹，再进行复制进去
    try {
      ensureDestDir(destDir)
      copyFilesToDestDir(path.normalize(shellDir), path.normalize(destDir))
      executeScript(path.normalize(destDir))
    } catch (error) {
      return
    }
  }

  // 执行脚本，使shell文件立即生效
  function executeScript(path) {
    execa('source', ['~/.bashrc'])
  }
}
