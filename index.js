const path = require('path');
const fs = require('fs');

module.exports = (DatabaseClass) => {
    return class Database extends DatabaseClass {
        constructor(filenameGiven, options) {
            super(filenameGiven, options);

            // load default extensions
            try {
                let baseDirectory;

                // if the env variable is set use that directory
                if (process.env.DEFAULT_SQLITE_EXTENSIONS) {
                    baseDirectory = process.env.DEFAULT_SQLITE_EXTENSIONS_PATH;
                }
                // use the directory in root of project designated for better-sqlite3-extensions
                else {
                    baseDirectory = path.join(require.main.path, 'better-sqlite3-extensions');
                }

                const extensions = fs.readdirSync(baseDirectory).map(value => path.join(baseDirectory, value));

                if (fs.existsSync(baseDirectory)) {
                    for (const extension of extensions) {
                        try {
                            this.loadExtension(extension);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    };
};