import * as program from 'commander';
import * as fs from 'fs';

interface Options {
    source: string;
    moduleName: string;
    target: string;
}

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

const options: Options = {
    source: source,
    moduleName: moduleName,
    target: targetFileName
};

fs.readFile(options.source, (err, data) => {
    console.log(err);
    var file = `declare module "${options.moduleName}" {\n    `;
    var content: string = data
        .toString()
        .split("\n")
        .filter(i => !i.startsWith("//") && i.trim() != "")
        .map(i => i.replace(".", options.moduleName))
        .join("\n    ");
    file += content;
    file += "\n}";
    fs.writeFile(targetFileName, file, (err) => {

    });
});
