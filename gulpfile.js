/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
require('./build/gulpfile');

// Commenting out the mangler related code in the `vscode-win32-x64-min` task
// P1713
// const { Mangler } = require('./build/lib/mangle/index');
// const log = (...data) => fancyLog(ansiColors.blue('[mangler]'), ...data);
// const ts2tsMangler = new Mangler(projectPath, log, { mangleExports: true, manglePrivateFields: true });
// entry = ts2tsMangler.computeNewFileContents();
