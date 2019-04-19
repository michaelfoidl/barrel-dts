#!/usr/bin/env node

const fs = require('fs');

const shebang = "#!/usr/bin/env node\n\n";

var path = process.argv[2];

if (!fs.existsSync(path)) {
    console.error("Invalid path: '" + path + "'.");
}

try {
    const data = fs.readFileSync(path);
    fs.writeFileSync(path, shebang + data);
} catch (err) {
    console.error("'shebangification' failed with error: '" + err.message + "' for path '" + path + "' .");
}