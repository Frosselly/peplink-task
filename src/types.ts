export type User = {
  name: string
  position: string
  gender: string
  age: number
}

export type SortDirection = 'asc' | 'desc'

export type UserSortFields = 'unsorted' | 'name' | 'position' | 'gender' | 'age'

export type UserSorting = {
  field: UserSortFields
  direction: SortDirection
}
