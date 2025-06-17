import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from '../PageOne/PageOne.module.css'

function DraggableTable({ data = [], columns = [] }) {
  const [rows, setRows] = useState(data)
  const [dragState, setDragState] = useState({
    isDragging: false,
    dragIndex: null,
    dragOffset: { x: 0, y: 0 },
    initialMousePos: { x: 0, y: 0 },
    initialRowPos: { x: 0, y: 0 }
  })

  const tableRef = useRef(null)
  const dragRowRef = useRef(null)

  const defaultColumns = [
    { key: 'name', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'gender', label: 'Gender' },
    { key: 'age', label: 'Age' }
  ]

  const defaultData = [
    {
      name: 'Ahon Joberson PeterAhon Joberson PeterAhon Joberson Peter',
      position: 'Janitor',
      gender: 'male',
      age: 23
    },
    {
      name: 'Lucy',
      position: 'Director',
      gender: 'female',
      age: 42
    },
    {
      name: 'Sam',
      position: 'Developer',
      gender: 'male',
      age: 32
    }
  ]

  const tableColumns = columns.length > 0 ? columns : defaultColumns
  const currentRows =
    data.length > 0 ? data : rows.length > 0 ? rows : defaultData

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>, index: any) => {
      if (e.button !== 0) return
      e.preventDefault()

      const row = e.currentTarget
      const rowRect = row.getBoundingClientRect()

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
    },
    []
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || dragState.dragIndex === null) return

      //adjusting based on starting position
      const deltaX = e.clientX - dragState.initialMousePos.x
      const deltaY = e.clientY - dragState.initialMousePos.y

      setDragState((p) => ({
        ...p,
        dragOffset: { x: deltaX, y: deltaY }
      }))

      if (dragRowRef.current && tableRef.current) {
        const dragRect = dragRowRef.current.getBoundingClientRect()
        const tableBody = tableRef.current.querySelector('tbody')
        //get all the tr elements in the table
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
              //make copy
              const newRows = [...currentRows]
              //get the removed 1 element and name it draggedRow
              const [draggedRow] = newRows.splice(dragState.dragIndex, 1)
              //add the new element in position causing a swap
              newRows.splice(i, 0, draggedRow)

              if (data.length === 0) {
                setRows(newRows)
              }

              setDragState((p: any) => ({
                ...p,
                dragIndex: i
              }))

              break
            }
          }
        }
      }
    },
    [dragState, currentRows, data.length]
  )

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      dragIndex: null,
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

  return (
    <div>
      <h1>Users</h1>
      <input type="text" placeholder="Search" />
      <table ref={tableRef} className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {tableColumns.map((col) => (
              <th key={col.key} className={col.key} role="button">
                <span>{col.label}</span>
              </th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!currentRows.length ? (
            <tr>
              <td colSpan={6}>The user list is empty</td>
            </tr>
          ) : (
            currentRows.map((user, index) => {
              return (
                <tr
                  key={index}
                  className={[
                    styles.tableRow,
                    dragState.isDragging && dragState.dragIndex === index
                      ? styles.dragging
                      : ''
                  ].join(' ')}
                  onMouseDown={(e) => handleMouseDown(e, index)}>
                  <td className={styles.movement}>
                    <div></div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.position}</td>
                  <td>{user.gender}</td>
                  <td className={styles.number}>{user.age}</td>
                  <td>
                    <button className={'redBtn'} onClick={() => {}}>
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
            width: tableRef.current.offsetWidth
          }}>
          <table className={styles.dragTable}>
            <tbody>
              <tr>
                <td className={styles.movement}>
                  <div></div>
                </td>
                {tableColumns.map((col) => (
                  <td key={col.key} className={styles.dragCell}>
                    {currentRows[dragState.dragIndex]?.[col.key]}
                  </td>
                ))}
                <td>
                  <button className={'redBtn'} onClick={() => {}}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default DraggableTable
