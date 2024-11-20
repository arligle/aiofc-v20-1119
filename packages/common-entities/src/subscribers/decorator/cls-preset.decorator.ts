import { getMetadataArgsStorage } from 'typeorm';

import { TrackedEntity } from '../../base/tracked-entity';
import { TenantClsStore } from '../../decorator/vo/tenant-base-cls-store';
import { PresetType } from '../../decorator/vo/preset-type';
import { defaultClsMetadataStore } from '../../decorator/cls-preset.metadata.storage';

interface ClsPresetDecoratorOptions<CLS_STORE extends TenantClsStore> {
  clsFieldName: keyof CLS_STORE;
  presetType?: PresetType;
}

export function ClsPreset<CLS_STORE extends TenantClsStore>(
  options: ClsPresetDecoratorOptions<CLS_STORE>,
): Function {
  return function (object: object, propertyName: string) {
    const metadataArgsStorage = getMetadataArgsStorage();

    if (!(object instanceof TrackedEntity)) {
      throw new TypeError(
        `Cls Preset functionality is available only for instances of BaseEntityHelper class`,
      );
    }

    const entityName = object.constructor.name;

    const foundProperty = metadataArgsStorage.columns.find(
      (c) => c.propertyName === propertyName,
    );

    /* istanbul ignore next */
    if (foundProperty === undefined) {
      // I don't really know how is it possible to get there
      throw `Can not find a property for cls preset functionality. Trying to find ${propertyName}, available properties: [${metadataArgsStorage.columns
        .map((c) => c.propertyName)
        .join(',')}]`;
    }

    defaultClsMetadataStore.addField({
      entityPropertyName: propertyName,
      entityName,
      clsStorageKey: options.clsFieldName as symbol,
      presetType: options.presetType ?? PresetType.ALL,
    });
  };
}
