export type TTask = {
  id: string;
  title: string;
  done: boolean;
  date: Date;
  hour: string;
  hidden: boolean;
}

export type ResponseUser = {
  id: string;
  email: string;
  name: string;
  tasks:TTask[]
}
