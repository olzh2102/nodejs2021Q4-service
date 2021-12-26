const schema = {
  body: {
    type: 'object',
    required: ['title', 'columns'],
    properties: {
      title: { type: 'string' },
      columns: {
        type: 'array',
        items: {
          type: 'object',
          required: ['title', 'order'],
          properties: {
            title: { type: 'string' },
            order: { type: 'integer' },
          },
        },
      },
    },
  },
  params: {
    type: 'object',
    required: ['boardId'],
    properties: {
      boardId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    '2xx': {
      type: 'object',
      required: ['id', 'title', 'columns'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        title: { type: 'string' },
        columns: {
          type: 'array',
          items: {
            type: 'object',
            required: ['title', 'order'],
            properties: {
              title: { type: 'string' },
              order: { type: 'integer' },
            },
          },
        },
      },
    },
  },
};

const oneBoardSchema = {
  schema: { params: schema.params, response: schema.response },
};

const newBoardSchema = {
  schema: { body: schema.body, response: schema.response },
};

const updateBoardSchema = {
  schema: {
    body: schema.body,
    params: schema.params,
    response: schema.response,
  },
};

const deleteBoardSchema = {
  schema: { params: schema.params },
};

export { oneBoardSchema, newBoardSchema, updateBoardSchema, deleteBoardSchema };
