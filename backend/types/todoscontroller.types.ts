interface DeleteTodoModel {
  author_email: string;
  id: number;
}

interface MarkTodoCompleteModel {
  author_email: string;
  id: number;
}

interface UpdateTodoModel {
  author_email: string;
  id: number;
  newTitle: string;
}

interface AddTodoModel {
  author_email: string;
  title: string;
}

interface GetTodoModel {
  title: string;
  id: number;
  status: string;
}
