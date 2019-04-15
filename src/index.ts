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
}

const settings: Settings = {
    source: source,
    moduleName: moduleName,
    target: targetFileName
};

generateBarrelDts(settings);

