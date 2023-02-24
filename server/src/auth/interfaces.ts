export interface User {
  _id: string,
  username: string,
  accessToken?: string,
  fullname?: string,
  userpic?: string,
}

export interface credentials {
  username: string,
  password: string
}

export interface userData {
  _id: string,
  username: string,
  password: string,
  fullname?: string,
  userpic?: string,
}

export interface JwtPayload {
  id: string
}