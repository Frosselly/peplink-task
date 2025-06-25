import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  DataItem,
  SortDirection,
  TableColumn,
  UserSortFields,
  UserSorting
} from '../../types'
import styles from './Table.module.css'
// import ellipsisHorizontal from '/assets/ellipsis-solid.svg'
import ellipsisVertical from '/ellipsis-vertical-solid.svg'

const compareString = (s1: string, s2: string) => {
  return s1.localeCompare(s2)
}

type TableProps<T extends DataItem> = {
  data: T[]
  columns: TableColumn[]
  setData: React.Dispatch<React.SetStateAction<T[]>>
}

function Table<T extends DataItem>({
  data = [],
  columns = [],
  setData
}: TableProps<T>) {
  const [dragState, setDragState] = useState({
    isDragging: false,
    dragIndex: 0,
    dragOffset: { x: 0, y: 0 },
    initialMousePos: { x: 0, y: 0 },
    initialRowPos: { x: 0, y: 0 }
  })

  const tableRef = useRef<HTMLTableElement>(null)
  const dragRowRef = useRef<HTMLDivElement>(null)

  const tableColumns = columns

  const handleMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    if (e.button !== 0) return
    e.preventDefault()
    const trElement = e.currentTarget.closest('tr')
    if (!trElement) return
    const row = trElement
    const rowRect = row.getBoundingClientRect()

    setSortValue({
      field: 'unsorted',
      direction: 'asc'
    })

    setDragState({
      isDragging: true,
      dragIndex: index,
      dragOffset: { x: 0, y: 0 },
      initialMousePos: { x: e.clientX, y: e.clientY },
      initialRowPos: {
        x: rowRect.left,
        y: rowRect.top
      }
    })
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || dragState.dragIndex === null) return

      const deltaX = e.clientX - dragState.initialMousePos.x
      const deltaY = e.clientY - dragState.initialMousePos.y

      setDragState((p) => ({
        ...p,
        dragOffset: { x: deltaX, y: deltaY }
      }))

      if (dragRowRef.current && tableRef.current) {
        const dragRect = dragRowRef.current.getBoundingClientRect()
        const tableBody = tableRef.current.querySelector('tbody')
        if (!tableBody) return
        const allRows = Array.from(tableBody.querySelectorAll('tr'))

        const dragCenterY = dragRect.top + dragRect.height / 2

        for (let i = 0; i < allRows.length; i++) {
          if (i === dragState.dragIndex) continue

          const rowRect = allRows[i].getBoundingClientRect()
          const rowCenterY = rowRect.top + rowRect.height / 2

          if (dragCenterY >= rowRect.top && dragCenterY <= rowRect.bottom) {
            const shouldSwap =
              dragState.dragIndex < i
                ? dragCenterY > rowCenterY
                : dragCenterY < rowCenterY
            if (shouldSwap) {
              const newRows = [...data]
              const [draggedRow] = newRows.splice(dragState.dragIndex, 1)
              newRows.splice(i, 0, draggedRow)

              setData(newRows)

              setDragState((p) => ({
                ...p,
                dragIndex: i
              }))

              break
            }
          }
        }
      }
    },
    [dragState, data, data.length]
  )

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      dragIndex: 0,
      dragOffset: { x: 0, y: 0 },
      initialMousePos: { x: 0, y: 0 },
      initialRowPos: { x: 0, y: 0 }
    })
  }, [])

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp])

  const [sortValue, setSortValue] = useState<UserSorting>({
    field: 'unsorted',
    direction: 'asc'
  })

  const sortedUsers = useMemo(() => {
    if (sortValue.field === 'unsorted') return data
    const sorted = data.slice().sort((a, b) => {
      const column = columns.find((col) => col.key === sortValue.field)
      if (!column) return 0

      switch (column.type) {
        case 'string':
          return compareString(String(a[column.key]), String(b[column.key]))
        case 'number':
          return Number(a[column.key]) - Number(b[column.key])
        default:
          return 0
      }
    })
    if (sortValue.direction === 'desc') return sorted.reverse()
    return sorted
  }, [data, sortValue])

  const handleDeleteUser = (deleteIndex: number) => {
    const newUsers = sortedUsers.filter((_v, index) => index !== deleteIndex)
    setData(newUsers)
  }

  const handleChangeSort = (sortField: UserSortFields) => {
    const sortDirection: SortDirection =
      sortValue.field === sortField
        ? sortValue.direction === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc'
    setSortValue({ field: sortField, direction: sortDirection })
  }

  const renderSortDirection = (fieldName: UserSortFields) => {
    if (sortValue.field === 'unsorted' || sortValue.field !== fieldName)
      return ''
    return sortValue.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <div>
      <table ref={tableRef} className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {tableColumns.map((col) => (
              <th
                key={col.key}
                className={styles[col.key]}
                role="button"
                onClick={() => handleChangeSort(col.key as UserSortFields)}>
                <span>
                  {col.label}{' '}
                  <div>{renderSortDirection(col.key as UserSortFields)}</div>
                </span>
              </th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!sortedUsers.length ? (
            <tr>
              <td colSpan={6}>The user list is empty</td>
            </tr>
          ) : (
            sortedUsers.map((_user, index) => {
              return (
                <tr
                  key={index}
                  className={[
                    styles.tableRow,
                    dragState.isDragging && dragState.dragIndex === index
                      ? styles.dragging
                      : ''
                  ].join(' ')}>
                  <td className={styles.movement}>
                    <div>
                      <button
                        onMouseDown={(e) => handleMouseDown(e, index)}
                        style={{
                          backgroundColor: 'transparent'
                        }}>
                        <img
                          src={ellipsisVertical}
                          className={styles.ellipsis}
                        />
                        <img
                          src={ellipsisVertical}
                          className={styles.ellipsis}
                        />
                      </button>
                    </div>
                  </td>
                  {tableColumns.map((col) => (
                    <td
                      key={col.key + 'table'}
                      className={col.type === 'number' ? styles.number : ''}>
                      {sortedUsers[index]?.[col.key]}
                    </td>
                  ))}
                  <td>
                    <button
                      className={'redBtn'}
                      onClick={() => handleDeleteUser(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      {dragState.isDragging && dragState.dragIndex !== null && (
        <div
          ref={dragRowRef}
          className={styles.dragPreview}
          style={{
            left: `${dragState.initialRowPos.x + dragState.dragOffset.x}px`,
            top: `${dragState.initialRowPos.y + dragState.dragOffset.y}px`,
            width: tableRef.current?.offsetWidth ?? 0
          }}>
          <table className={styles.dragTable}>
            <tbody>
              <tr>
                <td className={styles.movement}>
                  <div>
                    <button
                      style={{
                        backgroundColor: 'transparent'
                      }}>
                      <img src={ellipsisVertical} className={styles.ellipsis} />
                      <img src={ellipsisVertical} className={styles.ellipsis} />
                    </button>
                  </div>
                </td>
                {tableColumns.map((col) => (
                  <td key={col.key} className={styles.dragCell}>
                    {data[dragState.dragIndex]?.[col.key]}
                  </td>
                ))}
                <td>
                  <button className={'redBtn'}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Table
