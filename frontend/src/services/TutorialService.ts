import http from "../http-common";

const getAll = () => {
  return http.get("/todos");
};

const get = (id: any) => {
  return http.get(`/todos/${id}`);
};

const create = (data: any) => {
  return http.post("/todos", data);
};

const update = (id: any, data: any) => {
  return http.put(`/todos/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/todos/${id}`);
};

const removeAll = () => {
  return http.delete(`/todos`);
};

const findByTitle = (title: any) => {
  return http.get(`/todos?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
