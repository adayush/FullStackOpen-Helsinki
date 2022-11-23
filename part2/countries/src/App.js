import { useState, useEffect } from 'react'
import axios from 'axios'

const Results = ({ filterData, handleShow }) => {
  if (filterData.length > 10)
    return (
      <p>Too many matches, specify another filter</p>
    )
  else if (filterData.length > 1)
    return (
      <>
        {filterData.map((country, i) => 
          <div key={i}>
            <span >{country.name.common}</span>
            <button onClick={() => handleShow(country.name.common)}>show</button>
          </div>
        )}
      </>
    )
  else if (filterData.length === 1)
    return (
      <div>
        <h1>{filterData[0].name.common}</h1>
        <p>capital {filterData[0].capital[0]}</p>
        <p>area {filterData[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(filterData[0].languages).map((v, i) =>
            <p key={i}>{v}</p>
          )}
        </ul>
        <img src={`${filterData[0].flags.png}`} alt="country flag" />
      </div>
    )
  else
    return (
      <p>No results found</p>
    )
}

const App = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
  }, [])
  //console.log(data[0].name.common)

  const filterData = search === "" ? data : data.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  const handleInput = (e) => {
    setSearch(e.target.value)
  }

  const handleShow = (country) => {
    setSearch(country)
  }

  return (
    <div className="App">
      <span>find countries </span>
      <input onChange={handleInput} value={search}></input>
      {search !== "" &&
        <Results filterData={filterData} handleShow={handleShow}/>
      }
    </div>
  );
}

export default App;
