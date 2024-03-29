export interface IUser {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
  }

export interface ILoginParam {
    email: string,
    password: string,
  }

export interface IRegisterParam {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  }
  export interface ITodo {
    _id: string,
    author: IUser,
    assigned: Array<IUser>,
    title: string,
    content: string,
    completionDate: Date,
  }

  export interface ITodoCreateParam {
    assignedTo?: string,
    title?: string,
    content: string,
    completionDate?: Date,
  }

export default class InterfaceService {
    constructor() { }
}