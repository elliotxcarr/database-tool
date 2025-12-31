enum DataType {
  objId = 'object_id',
  str = 'string',
  num = 'number',
  bool = 'boolean',
  arr = 'array'
}

export interface Field{
  label: string;
  path: string;
  type: string;
}

export const CONDITIONS_DICT: Record<string, string> = {
  'Contains': 'contains',
  'Equals' : 'equals',
  'Not Equal': 'ne',
  'Exisits': 'exists'
}

export const USER_FIELDS_DICT: Field[] = [
  {
    label: 'Name',
    path: 'name',
    type: DataType.str
  },
  {
    label: 'ID',
    path: '_id',
    type: DataType.objId
  },
  {
    label: 'Username',
    path: 'username',
    type: DataType.str
  },
  {
    label: 'Email',
    path: 'email',
    type: DataType.str
  },
  {
    label: 'Role',
    path: 'role',
    type: DataType.str
  },
  {
    label: 'Client',
    path: 'client',
    type: DataType.str
  },
  {
    label: 'Features',
    path: 'features',
    type: DataType.arr
  },
  {
    label: 'Vessels',
    path: 'vessels',
    type: DataType.arr
  },
]

export const VESSEL_FIELDS_DICT: Field[] = [
  {
    label: 'ID',
    path: '_id',
    type: DataType.objId
  },
  {
    label: 'Name',
    path: 'information.name',
    type: DataType.str
  },
  {
    label: 'Form Config',
    path: 'form_configuration',
    type: DataType.str
  },
  {
    label: 'Client',
    path: 'client',
    type: DataType.objId
  },
  {
    label: 'Navtor ID',
    path: 'navtor_vessel_id',
    type: DataType.num
  },
  {
    label: 'Has Incomplete Vessel Report',
    path: 'has_incomplete_vessel_report',
    type: DataType.bool
  },
  {
    label: 'Has Incomplete Engine Report',
    path: 'has_incomplete_engine_report',
    type: DataType.bool
  },
  {
    label: 'Report No.',
    path: 'report_number',
    type: DataType.num
  },
  {
    label: 'IMO',
    path: 'information.imo',
    type: DataType.num
  },
  {
    label: 'Vessel Type',
    path: 'information.vessel_type',
    type: DataType.str
  },
  {
    label: 'Engine Type',
    path: 'information.engine_type',
    type: DataType.str
  },
  {
    label: 'Prime Mover Type',
    path: 'information.prime_mover_type',
    type: DataType.str
  },
  {
    label: 'Tanks',
    path: 'tanks',
    type: DataType.arr
  }
]

export const OBJECT_ID_FIELDS= ['client', '_id', 'vessels']

export const DATABASES: Record<string, string> = {
  'User':'user',
  'Vessel':'vessel',
  'Report':'report'
}

export const ENVS = ['LOCAL', 'DEV', 'QA'];