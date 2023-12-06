import {
  CREATE_ORDER_FILE_PATH,
  COMMERCE_GENERIC_FILE_PATHS,
  IMPORT_CONTENT,
  DEPENDENCY_NAME,
  DEPENDENCY_VERSION,
  DEFAULT_IMPORT,
  UPDATED_ORDER_LINE,
  VOUCHERIFY_IMPORT,
  UPDATE_PAID_ORDER_CONTENT,
  PACKAGE_JSON_PATH,
} from './constants'
import {
  replaceInFiles,
  addDependencyToPackage,
  replaceInFile,
} from './source-code-updater'

const activate = async () => {
  // Update commerce generic files - replace classic usage with Voucherify usage
  await replaceInFiles(
    COMMERCE_GENERIC_FILE_PATHS,
    DEFAULT_IMPORT,
    VOUCHERIFY_IMPORT
  )

  // Update createOrder file
  await replaceInFile(CREATE_ORDER_FILE_PATH, '', IMPORT_CONTENT)
  await replaceInFile(
    CREATE_ORDER_FILE_PATH,
    UPDATED_ORDER_LINE,
    UPDATED_ORDER_LINE + UPDATE_PAID_ORDER_CONTENT
  )

  // Add Voucherify dependency to package.json
  await addDependencyToPackage(
    PACKAGE_JSON_PATH,
    DEPENDENCY_NAME,
    DEPENDENCY_VERSION
  )
}
;(async () => {
  await activate()
})()
