const fs = require('fs/promises');

/**
 * Checks if a file or directory at the given path is accessible.
 *
 * @param {string} path - The path to check accessibility for.
 * @returns {Promise<boolean>} A promise that resolves to true if accessible, false otherwise.
 */
const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

/**
 * Creates a folder at the specified path if it does not exist.
 *
 * @param {string} folder - The path of the folder to create if not already present.
 * @returns {Promise<void>} A promise that resolves once the folder is created or if it already exists.
 */
const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolderIsNotExist;
