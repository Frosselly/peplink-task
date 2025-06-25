export type DataItem = {
  [key: string]: string | number | boolean;
}

export type User = DataItem & {
  name: string
  position: string
  gender: GenderType
  age: number
}

export type TableColumn = {
  key: string,
  label: string,
  type: string
}

type GenderType = 'male' | 'female' | 'other' | ''


export type SortDirection = 'asc' | 'desc'

export type UserSortFields = 'unsorted' | 'name' | 'position' | 'gender' | 'age'

export type UserSorting = {
  field: UserSortFields
  direction: SortDirection
}
