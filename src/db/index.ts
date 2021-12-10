// import { User } from '../resources/users/user.model';
// import { Board } from '../resources/board/board.model';
// import { Task } from '../resources/task/task.model';

// const database = {
//   users: [],
//   tasks: [],
//   boards: [],
// };

// type Collection = 'users' | 'tasks' | 'boards';

// export function getAll(collection: Collection): User | Board | Task[] {
//   return database[collection];
// }

// export function findOne(collection: Collection) {
//   return (param: string, key: string) =>
//     database[collection].filter((item) => item[key] === param);
// }

// export function addItem(collection: Collection) {
//   return (item: User | Board | Task) => database[collection].concat(item);
// }

// export function findAndUpdate(collection: Collection) {
//   return (param: string, key: string, fields: any) => {
//     const item = findOne(collection)(param, key);
//     return { ...item, ...fields };
//   };
// }

// export function findAndUpdateMany(collection: Collection) {
//   return (param: string, key: string, fields: any) =>
//     database[collection].map((item: any) => {
//       if (item[key] === param) return { ...item, ...fields };
//       return item;
//     });
// }

// export function deleteOne(collection: Collection) {
//   return (param: string, key: string) => {
//     const index = database[collection].findIndex(
//       (item: any) => item[key] === param
//     );
//     database[collection].splice(index, 1);
//   };
// }

// export function deleteMany(collection: Collection) {
//   return (param: string, key: string) => {
//     database[collection] = database[collection].filter(
//       (item: any) => item[key] !== param
//     );
//   };
// }
