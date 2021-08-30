import { applyDecorators } from '@nestjs/common';
import { plugin } from '@typegoose/typegoose';
// @ts-ignore
import * as autoPopulate from 'mongoose-autopopulate';
// @ts-ignore
import * as leanVirtuals from 'mongoose-lean-virtuals';

export const useMongoosePlugins = () =>
  applyDecorators(plugin(autoPopulate), plugin(leanVirtuals));
