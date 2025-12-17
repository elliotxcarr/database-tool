export const CONDITIONS_DICT: Record<string, string> = {
  'Contains': 'contains',
  'Equals' : 'equals',
  'Not Equal': 'ne',
  'Exisits': 'exists'
}

export const USER_FIELDS_DICT: Record<string, string> = {
  'Name': 'name',
  'ID' : '_id',
  'Username': 'username',
  'Email': 'email',
  'Role' : 'role',
  'Client': 'client',
  'Features': 'features',
  'Vessels': 'vessels',
}

export const VESSEL_FIELDS_DICT: Record<string, string> = {
  'Name': 'information.name',
  'ID' : '_id',
  'Vessel Type': 'information.vessel_type',
  'IMO': 'information.imo',
  'Form Config': 'form_configuration',
  'Has Incomplete Vessel Report': 'has_incomplete_vessel_report',
  'Client': 'client',
  'Navtor ID': 'navtor_vessel_id'
}

export const OBJECT_ID_FIELDS= ['client', '_id', 'vessels']