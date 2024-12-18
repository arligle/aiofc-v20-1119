import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse } from '@aiofc/exceptions';

/**
 * todo consider moving to the appropriate library
 * */
export const ApiConflictResponsePaginated = (description: string) =>
  applyDecorators(
    ApiExtraModels(ErrorResponse),
    ApiConflictResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ErrorResponse) },
          {
            properties: {
              status: {
                type: 'number',
                default: 409,
              },
            },
          },
        ],
      },
    }),
  );
