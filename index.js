import path from 'path';
import fs from 'fs';

export default function (DatabaseClass) {
    return class Database extends DatabaseClass {
        constructor(filenameGiven, options) {
            super(filenameGiven, options);

            // load default extensions
            try {
                let baseDirectory;

                // if the env variable is set use that directory
                if (process.env.DEFAULT_SQLITE_EXTENSIONS_PATH) {
                    baseDirectory = process.env.DEFAULT_SQLITE_EXTENSIONS_PATH;
                }

                if (baseDirectory && fs.existsSync(baseDirectory)) {
                    const extensions = fs.readdirSync(baseDirectory).map(value => path.join(baseDirectory, value));

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