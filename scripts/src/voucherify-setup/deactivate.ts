import {
  CREATE_ORDER_FILE_PATH,
  COMMERCE_GENERIC_FILE_PATHS,
  IMPORT_CONTENT,
  DEPENDENCY_NAME,
  DEFAULT_IMPORT,
  VOUCHERIFY_IMPORT,
  UPDATE_PAID_ORDER_CONTENT,
  PACKAGE_JSON_PATH,
} from './constants'
import {
  replaceInFiles,
  removeDependencyFromPackage,
  replaceInFile,
} from './source-code-updater'

const deactivate = async () => {
  // Update commerce generic files Replace Voucherify usage with classic usage
  await replaceInFiles(
    COMMERCE_GENERIC_FILE_PATHS,
    VOUCHERIFY_IMPORT,
    DEFAULT_IMPORT
  )

  // Update createOrder file - remove Voucherify implementation from create order
  await replaceInFile(CREATE_ORDER_FILE_PATH, IMPORT_CONTENT, '')
  await replaceInFile(CREATE_ORDER_FILE_PATH, UPDATE_PAID_ORDER_CONTENT, '')

  // Remove Voucherify dependency from package.json
  await removeDependencyFromPackage(PACKAGE_JSON_PATH, DEPENDENCY_NAME)
}
;(async () => {
  await deactivate()
})()
