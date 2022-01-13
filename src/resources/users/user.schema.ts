const schema = {
  body: {
    type: 'object',
    required: ['name', 'login', 'password'],
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    '2xx': {
      type: 'object',
      required: ['id', 'name', 'login'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        name: { type: 'string' },
        login: { type: 'string' },
      },
    },
  },
};

const oneUserSchema = {
  schema: { params: schema.params, response: schema.response },
};

const newUserSchema = {
  schema: { body: schema.body, response: schema.response },
};

const updateUserSchema = {
  schema: {
    body: schema.body,
    params: schema.params,
    response: schema.response,
  },
};

const deleteUserSchema = {
  schema: { params: schema.params },
};

export { oneUserSchema, newUserSchema, updateUserSchema, deleteUserSchema };
