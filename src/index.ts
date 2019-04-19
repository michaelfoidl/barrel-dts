/*
Copyright 2019 Michael Foidl

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as program from 'commander';
import { Settings, generateBarrelDts } from './BarrelDts';

var source = "index.ts";
var moduleName = "myModule";
var targetFileName = "myModule.d.ts";

program
    .version('1.0.0')
    .option('-s, --source [sourceFile]', `Barrel source file [${source}]`)
    .option('-m, --module-name [moduleName]', `Module name [${moduleName}]`)
    .option('-t, --target [targetFileName]', `Target file name (if source file is set, it defaults to it) [${targetFileName}]`)
    .parse(process.argv);


if (program.source) {
    source = program.source;
}

if (program.moduleName) {
    moduleName = program.moduleName;
}

if (program.target) {
    targetFileName = program.target;
} else {
    targetFileName = `${moduleName}.d.ts`;
}

const settings: Settings = {
    source: source,
    moduleName: moduleName,
    target: targetFileName
};

generateBarrelDts(settings);

