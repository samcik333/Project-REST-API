import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

export const validateUser = async (ctx: any, next: any) => {
  const registerSchema = {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8
      },

    },
    required: ["email", "password"]
  }

  const valid = ajv.validate(registerSchema, ctx.request.body)

  if (!valid) {
    return ctx.response.body = ajv.errors
  }
  return await next()
}

export const validateUserForPatch = async (ctx: any, next: any) => {
  const registerSchema = {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8
      },
    },

  }

  const valid = ajv.validate(registerSchema, ctx.request.body)

  if (!valid) {
    return ctx.response.body = ajv.errors
  }
  return await next()
}

export const validateCollection = async (ctx: any, next: any) => {
  const registerSchema = {
    type: "object",
    properties: {
      name: {
        type: "string",
      }
    },
    required: ["name"]
  }

  const valid = ajv.validate(registerSchema, ctx.request.body)
  if (!valid) {
    return ctx.response.body = ajv.errors
  }
  return await next()
}

