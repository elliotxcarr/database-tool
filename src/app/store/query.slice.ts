export interface Statement {
  field: string;
  condition: string;
  value: string | number | boolean;
}

export interface Query {
  queries: Statement[];
  results: any[];
}

export const initialQuerySlice: Query = {
  queries: [{} as Statement],
  results: [
    { id: 1, name: 'result1', username: 'elliotxcarr', email: 'email@email.com', role: 'admin' },
    { id: 2, name: 'result2',username: 'elliotxcarr', email: 'email@email.com', role: 'shore_user' },
    { id: 3, name: 'result3',username: 'elliotxcarr', email: 'email@email.com', role: 'internal_admin' },
    { id: 4, name: 'result4',username: 'elliotxcarr', email: 'email@email.com', role: 'ship_user' },
    { id: 5, name: 'result5',username: 'elliotxcarr', email: 'email@email.com', role: 'admin' },
    { id: 6, name: 'result6', email: 'email@email.com', role: 'admin' },
    { id: 1, name: 'result1', email: 'email@email.com', role: 'admin' },
    { id: 2, name: 'result2', email: 'email@email.com', role: 'shore_user' },
    { id: 3, name: 'result3', email: 'email@email.com', role: 'internal_admin' },
    { id: 4, name: 'result4',username: 'elliotxcarr', email: 'email@email.com', role: 'ship_user' },
    { id: 5, name: 'result5', email: 'email@email.com', role: 'admin' },
    { id: 6, name: 'result6', email: 'email@email.com', role: 'admin' },
    { id: 1, name: 'result1', email: 'email@email.com', role: 'admin' },
    { id: 2, name: 'result2',username: 'elliotxcarr', email: 'email@email.com', role: 'shore_user' },
    { id: 3, name: 'result3', email: 'email@email.com', role: 'internal_admin' },
    { id: 4, name: 'result4',username: 'elliotxcarr', email: 'email@email.com', role: 'ship_user' },
    { id: 5, name: 'result5',username: 'elliotxcarr', email: 'email@email.com', role: 'admin' },
    { id: 6, name: 'result6', email: 'email@email.com', role: 'admin' },
    { id: 1, name: 'result1', email: 'email@email.com', role: 'admin' },
    { id: 2, name: 'result2', email: 'email@email.com', role: 'shore_user' },
    { id: 3, name: 'result3', email: 'email@email.com', role: 'internal_admin' },
    { id: 4, name: 'result4',username: 'elliotxcarr', email: 'email@email.com', role: 'ship_user' },
    { id: 5, name: 'result5', email: 'email@email.com', role: 'admin' },
    { id: 6, name: 'result6', email: 'email@email.com', role: 'admin' },
  ],
}