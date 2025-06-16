import { useEffect, useState } from 'react'
import styles from './PageTwo.module.css'

type ApiType = {
  id: number
  icon_url: string
  created_at: string
  updated_at: string
  url: string
  value: string
  categories: string[]
}

const UPDATE_TIME = 5

function PageTwo() {
  const [data, setData] = useState<ApiType>()
  const [time, setTime] = useState<number>(UPDATE_TIME)
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now())

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (time === 0) {
      if (navigator.onLine)
        fetchData().then((res) => {
          if (res) {
            setLastUpdate(Date.now())
          }
        })
      setTime(UPDATE_TIME)
    }
  }, [time])

  const formatDate = (date: string | number) => {
    const newDate = new Date(date)
    const formattedDate = `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`
    return formattedDate
  }

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://api.chucknorris.io/jokes/random?category=dev'
      )
      if (!res.ok) return false
      const data = await res.json()
      setData(data)
      return true
    } catch {
      return false
    }
  }

  return (
    <>
      <h1>Chuck page</h1>
      <div className={styles.infoPage}>
        {data && (
          <>
            <img
              className={styles.img}
              src={data.icon_url}
              alt="chuck norris icon"
            />
            <div className={styles.quote}>&quot;{data.value}&quot;</div>
            <div className={styles.categoryContainer}>
              <div>Categories</div>
              <div className={styles.categories}>
                {data.categories.length ? (
                  data.categories.map((val, index) => {
                    return (
                      <div key={index} className={styles.category}>
                        {val}
                      </div>
                    )
                  })
                ) : (
                  <div> No categories </div>
                )}
              </div>
            </div>

            <div className={styles.extraData}>
              <h3>Extra data</h3>
              <div>
                <div className={styles.label}>id</div>
                <div>{data.id}</div>
              </div>
              <div>
                <div className={styles.label}>Created at</div>
                <div>{formatDate(data.created_at)}</div>
              </div>
              <div>
                <div className={styles.label}>Updated at</div>
                <div>{formatDate(data.updated_at)}</div>
              </div>
              <div>
                <div className={styles.label}>Url</div>
                <a href={data.url}>{data.url}</a>
              </div>
            </div>
            <div className={styles.updateData}>
              <div>
                <div>Next page update:</div>
                <div>{time}s</div>
              </div>
              <div>
                <div>Last page update:</div>
                <div>{formatDate(lastUpdate)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default PageTwo
