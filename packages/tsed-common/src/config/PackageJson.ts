import { PackageJson as PackageJsonInterface, sync } from 'read-pkg';
import { BaseConfig } from './BaseConfig';

export interface PkgJson extends PackageJsonInterface {
  name: string;
  version: string;
  description: string;
}

export class PackageJson extends BaseConfig<PkgJson> {
  constructor() {
    // istanbul ignore next
    super({
      name: sync().name,
      description: sync().description ?? '',
      version: sync().version
    });
  }
}
