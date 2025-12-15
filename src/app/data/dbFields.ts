export const conditionsDict: Record<string, string> = {
  'Contains': 'contains',
  'Equals' : 'equals',
  'Not Equal': 'ne',
  'Includes': 'in',
  'Exisits': 'exists'
}

export const userFieldsDict: Record<string, string> = {
  'Name': 'name',
  'ID' : '_id',
  'Username': 'username',
  'Email': 'email',
  'Role' : 'role'
}

export const vesselFieldsDict: Record<string, string> = {
  'Name': 'information.name',
  'ID' : '_id',
}