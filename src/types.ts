export type User = {
  name: string
  position: string
  gender: GenderType
  age: number
}

type GenderType = 'male' | 'female' | 'other' | ''


export type SortDirection = 'asc' | 'desc'

export type UserSortFields = 'unsorted' | 'name' | 'position' | 'gender' | 'age'

export type UserSorting = {
  field: UserSortFields
  direction: SortDirection
}
