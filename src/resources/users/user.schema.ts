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

export default schema;
