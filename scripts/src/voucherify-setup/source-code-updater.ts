import * as fs from 'fs/promises'
import * as path from 'path'

export async function replaceInFile(
  filePath: string,
  searchPhrase: string,
  replacePhrase: string
): Promise<void> {
  try {
    // Read the content of the file
    const fullPath = path.join(__dirname, filePath) // assuming file paths are relative to the script's directory
    const data = await fs.readFile(fullPath, 'utf8')

    // Replace the search phrase with the replacement phrase
    const updatedContent = data.replace(searchPhrase, replacePhrase)

    // Write the updated content back to the file
    await fs.writeFile(fullPath, updatedContent, 'utf8')

    console.log(`Replacement complete in ${fullPath}`)
  } catch (error) {
    const errorMessage = `Error replacing content in ${filePath}: ${error.message}`
    throw new Error(errorMessage)
  }
}

export async function replaceInFiles(
  filePaths: string[],
  searchPhrase: string,
  replacePhrase: string
): Promise<void> {
  try {
    for (const filePath of filePaths) {
      await replaceInFile(filePath, searchPhrase, replacePhrase)
    }
  } catch (err) {
    console.error(`The process of replacement has stopped due to error.`)
  }
}

export async function addDependencyToPackage(
  packageJsonPath: string,
  newDependency: string,
  newDependencyVersion: string
): Promise<void> {
  try {
    // Load the package.json file
    const fullPath = path.join(__dirname, packageJsonPath)
    const packageJsonContent = await fs.readFile(fullPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent)

    // Add the new dependency
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}
    }
    packageJson.dependencies[newDependency] = newDependencyVersion // Replace 'newDependency' with the actual package name

    // Save the updated package.json file
    await fs.writeFile(fullPath, JSON.stringify(packageJson, null, 2), 'utf8')

    console.log(`Dependency added to package.json: ${newDependency}`)
  } catch (error) {
    const errorMessage = `Error adding dependency to ${packageJsonPath}: ${error.message}`
    throw new Error(errorMessage)
  }
}

export async function removeDependencyFromPackage(
  packageJsonPath: string,
  dependency: string
): Promise<void> {
  try {
    // Load the package.json file
    const fullPath = path.join(__dirname, packageJsonPath)
    const packageJsonContent = await fs.readFile(fullPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent)

    // Add the new dependency
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}
    }
    packageJson.dependencies = Object.fromEntries(
      Object.entries(packageJson.dependencies).filter(
        ([key, val]) => key !== dependency
      )
    )

    // Save the updated package.json file
    await fs.writeFile(fullPath, JSON.stringify(packageJson, null, 2), 'utf8')

    console.log(`Dependency removed from package.json: ${dependency}`)
  } catch (error) {
    const errorMessage = `Error removing dependency from ${packageJsonPath}: ${error.message}`
    throw new Error(errorMessage)
  }
}
