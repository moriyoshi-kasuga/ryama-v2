import { z } from 'zod';
export function createZodErrorMap(name: string): z.ZodErrorMap {
  return (issue, ctx) => {
    if (issue.code === 'invalid_type') {
      if (issue.received === 'undefined' || issue.received === 'null') {
        return { message: `${name} is required` };
      }
      return { message: `${name} must be a ${issue.received}` };
    }
    if (issue.code === 'too_small') {
      return {
        message: `${name} must be at least ${issue.minimum} characters`,
      };
    }
    if (issue.code === 'too_big') {
      return { message: `${name} must be at most ${issue.maximum} characters` };
    }
    return { message: ctx.defaultError };
  };
}