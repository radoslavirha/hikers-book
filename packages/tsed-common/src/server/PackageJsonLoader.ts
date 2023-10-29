import { PackageJson as PackageJsonInterface, sync } from 'read-pkg';

export interface PackageJson extends PackageJsonInterface {
  name: string;
  version: string;
}

export class PackageJsonLoader {
  readonly _packageJson: PackageJson;

  public get packageJson() {
    return Object.assign({}, this._packageJson);
  }

  constructor() {
    this._packageJson = {
      name: sync().name,
      description: sync().description,
      version: sync().version
    };
  }
}
