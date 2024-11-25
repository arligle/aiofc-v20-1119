import {
  MIN_LENGTH,
  minLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { IValidatorDefinition } from '../dynamic';
import { i18nValidationMessage } from '@aiofc/i18n';
import { i18nString } from '../../utils';

const MESSAGE = 'validation.MIN_STRING_LENGTH';

export const MinLengthLocalized = (
  n: number,
  validationOptions?: ValidationOptions,
) =>
  MinLength(n, {
    message: i18nValidationMessage(MESSAGE),
    ...validationOptions,
  });

export const MinValidatorDefinition = {
  name: MIN_LENGTH,
  validator: minLength,
  defaultValidationMessage: i18nString(MESSAGE),
  decorator: MinLengthLocalized,
} satisfies IValidatorDefinition<string, number>;
