import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export type FastifyInstanceWithZod = Parameters<FastifyPluginAsyncZod>[0];
