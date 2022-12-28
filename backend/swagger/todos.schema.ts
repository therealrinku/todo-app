export const addTodoSchema = {
  schema: {
    properties: {
      title: { type: 'string' },
    },
  },
  required: true,
};

export const updateTodoSchema = {
  schema: {
    properties: {
      title: { type: 'number' },
      newTitle: { type: 'string' },
    },
  },
  required: true,
};

export const markTodoCompletedSchema = {
  schema: {
    properties: {
      id: { type: 'number' },
    },
  },
  required: true,
};

export const deleteTodoSchema = {
  name: 'id',
  description: 'Todo ID',
  schema: {
    properties: {
      id: { type: 'number' },
    },
  },
  required: true,
};
