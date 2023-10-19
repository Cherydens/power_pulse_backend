const dirNames = {
  TEMP_DIR: process.env.TEMP_DIR || 'tmp',
  PUBLIC_DIR: process.env.PUBLIC_DIR || 'public',
  AVATARS_DIR: process.env.AVATARS_DIR || 'avatars',
};

module.exports = dirNames;
