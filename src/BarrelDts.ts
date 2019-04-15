import * as fs from 'fs';

export interface Settings {
    source: string;
    moduleName: string;
    target: string;
}

export function generateBarrelDts(settings: Settings) {
    var data = fs.readFileSync(settings.source);

    if (data == undefined) {
        throw new Error(`Could not read file "${settings.source}".`);
    }


    const header: string = generateHeader(settings);
    const processedContent: string = processContent(settings, data.toString(), "    ");
    const footer: string = generateFooter();

    const dtsFileContent: string = header + "\n" + processedContent + "\n" + footer;

    fs.writeFileSync(settings.target, dtsFileContent);
}

const exportStatementReplacePartSingleQuoteRegex: RegExp = new RegExp("'[.\/]{0,2}");
const exportStatementReplacePartDoubleQuoteRegex: RegExp = new RegExp("\"[.\/]{0,2}");

function generateHeader(settings: Settings): string {
    return `declare module "${settings.moduleName}" {`;
}

function processContent(settings: Settings, content: string, formattingPrefix: string): string {
    var lines = content.split("\n");

    lines = lines
        .filter(i => !isLineComment(i))
        .map(i => removeBlockComments(i))
        .map(i => insertModuleName(i, settings))
        .filter(i => i != "");

    return formattingPrefix + lines.join("\n" + formattingPrefix);
}

function generateFooter(): string {
    return "}";
}

function isLineComment(line: string) {
    return line.trimLeft().startsWith("//");
}

function removeBlockComments(line: string) {
    return line.replace("\/\*.*\*\/", "");
}

function insertModuleName(line: string, settings: Settings) {
    var partToReplace = exportStatementReplacePartSingleQuoteRegex.exec(line);
    if (partToReplace != null) {
        return line.replace(partToReplace[0], `'${settings.moduleName}/`);
    }

    partToReplace = exportStatementReplacePartDoubleQuoteRegex.exec(line);
    if (partToReplace != null) {
        return line.replace(partToReplace[0], `"${settings.moduleName}/`);
    }

    return "";
}