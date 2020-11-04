import { users } from "../db";

// code 400: 잘못된 문법으로 인해 서버가 요청을 이해할 수 없음
// code 409: 요청이 현재 서버 상태와 충돌할 때를 의미

export const getUsers = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();

  res.status(200).json(user);
};

export const addUser = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflict = users.find((user) => user.name === name);
  if (isConflict) return res.status(409).end();

  const newId = users[users.length - 1].id + 1;
  const user = { id: newId, name };
  users.push(user);

  res.status(201).json({ users, user });
};

export const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;
  if (Number.isNaN(id) || !name) return res.status(400).end();

  const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).end();

  user.name = name;
  res.status(201).json(user);
};

export const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return res.status(404).end();
  users.splice(index, 1);
  res.status(200).json(users);
};
