
//Schema Report

export interface schemaReportDepartment {
  project_id: string;
  projectCode: string;
  description: string | null;
  startAt: string;
  endAt: string;
  turnover: string | null;
  document: string | null;
  investor: string | null;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  ProjectProperty: ProjectProperty;
  information: information;
  tasks: Task[];
}

export interface UserInformation {
  user_id: string;
  username: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  name: string;
  birthday: string | null;
  createdAt: string;
  createdBy: string;
  deletedMark: boolean;
  UserProperty: {
    user_property_id: string;
    department_id: string | null;
    role: {
      name: string;
    };
  };
}

export interface Activity {
  activity_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string | null;
  createdAt: string;
  ActivityProperty: ActivityProperty;
  user_information: UserInformation;
}

export interface Activities {
  [date: string]: Activity[];
}

export interface ActivityProperty {
  activity_property_id: string;
  user_property_id: string;
  activity_id: string;
  task_property_id: string;
}

export interface Task {
  task_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string | null;
  createdAt: string;
  TaskProperty: {
    task_property_id: string;
    task_id: string;
  };
  activities: Activities;
}

export interface ProjectProperty {
  project_property_id: string;
  project_id: string;
  department_id: string;
  client_id: string;
}

export interface information {
  total_user: number;
  total_task: {
    total_task_is_done: number;
    total_task_is_not_done: number;
  };
}
