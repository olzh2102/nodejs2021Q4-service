const schema = {
  body: {
    type: 'object',
    required: ['title', 'order', 'description', 'userId', 'boardId'],
    properties: {
      title: { type: 'string' },
      order: { type: 'integer' },
      description: { type: 'string' },
      userId: {
        oneOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }],
      },
      boardId: {
        oneOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }],
      },
      columnId: {
        oneOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }],
      },
    },
  },
  params: {
    type: 'object',
    required: ['boardId', 'taskId'],
    properties: {
      boardId: {
        type: 'string',
        format: 'uuid',
      },
      taskId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    '2xx': {
      type: 'object',
      required: ['id', 'title', 'order', 'description', 'userId', 'boardId'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: {
          oneOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }],
        },
        boardId: {
          oneOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }],
        },
        columnId: {
          oneOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }],
        },
      },
    },
  },
};

const oneTaskSchema = {
  schema: { params: schema.params, response: schema.response },
};

const newTaskSchema = {
  schema: { body: schema.body, response: schema.response },
};

const updateTaskSchema = {
  schema: {
    body: schema.body,
    params: schema.params,
    response: schema.response,
  },
};

const deleteTaskSchema = {
  schema: { params: schema.params },
};

const noTaskIdSchema = {
  schema: {
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
  },
};

export {
  oneTaskSchema,
  newTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  noTaskIdSchema,
};
