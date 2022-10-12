export type TTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  hidden: boolean;
}

export type ResponseUser = {
  id: string;
  email: string;
  name: string;
  tasks:TTask[]
}
