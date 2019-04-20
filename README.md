# barrel-dts

`barrel-dts` is a simple command-line tool that generates TypeScript declaration files for barrels.

## Usage

The following commands are supported:
- `-s, --source [sourceFile]`: The barrel source file (defaults to `index.ts`).
- `-m, --module-name [moduleName]`: The name of the module (defaults to `myModule`).
- `-t, --target [targetFileName]`: The name of the target file (if `moduleName` is set, it defaults to it: `myModule.d.ts`).

## Example

To clarify its usage even more, let us pretend we want to generate a `.d.ts` file for this barrel: 

```typescript
export { MyFirstClass } from './myFirstClass/MyFirstClass';
export { MySecondClass } from './mySecondClass/MySecondClass';
```

Simply generating declarations via setting the corresponding property in the `tsconfig.json` file puts out a simple copy of this file and results in us having to use the following syntax to import from our barrel:

```typescript
import { MyFirstClass } from 'myModule/myModule';
```

This happens because the TypeScript compiler does not declare a module for our barrel. `barrel-dts` on the other hand does declare a module and we can now simply use this for our imports:

```typescript
import { MyFirstClass } from 'myModule';
```

Hooray!

## Version History

### 1.0.0 - Initial Release

##### 1.0.1 - Installation Fix

- fixed problems with installation over `npm`

##### 1.0.2 - Installation Fix

- fixed problems with installation over `npm`