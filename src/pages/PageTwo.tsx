import { useEffect, useState } from 'react'
import '../App.css'

type ApiType = {
  id: number
  icon_url: string
  created_at: string
  updated_at: string
  url: string
  value: string
  categories: string[]
}

function PageTwo() {
  const [data, setData] = useState<ApiType>()
  const [time, setTime] = useState<number>(15)
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
      setLastUpdate(Date.now())
      fetchData()
      setTime(15)
    }
  }, [time])

  const formatDate = (date: string | number) => {
    const newDate = new Date(date)
    const formattedDate = `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`
    return formattedDate
  }

  const fetchData = () => {
    fetch('https://api.chucknorris.io/jokes/random?category=dev')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
      })
  }

  return (
    <>
      <h1>Chuck page</h1>
      <div className="infoPage">
        {data && (
          <>
            <img src={data.icon_url} alt="chuck norris icon" />
            <div className="quote">"{data.value}"</div>
            <div className="categoryContainer">
              <div>Categories</div>
              <div className="categories">
                {!!data.categories.length ? (
                  data.categories.map((val, index) => {
                    return (
                      <div key={index} className="category">
                        {val}
                      </div>
                    )
                  })
                ) : (
                  <div> No categories </div>
                )}
              </div>
            </div>

            <div className="extraData">
              <h3>Extra data</h3>
              <div>
                <div className="label">id</div>
                <div>{data.id}</div>
              </div>
              <div>
                <div className="label">Created at</div>
                <div>{formatDate(data.created_at)}</div>
              </div>
              <div>
                <div className="label">Updated at</div>
                <div>{formatDate(data.updated_at)}</div>
              </div>
              <div>
                <div className="label">Url</div>
                <a href={data.url}>{data.url}</a>
              </div>
            </div>
            <div>
              <div>Next page update: {time}s</div>
              <div>Last page update: {formatDate(lastUpdate)}</div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default PageTwo
