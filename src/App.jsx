import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Pokemon from './components/Pokemon'

export default function App() {

  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [NowUrl, setNowUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [NextUrl, setNextUrl] = useState("")
  const [PrevUrl, setPrevUrl] = useState("")


  const list = async () => {
    setLoading(true)
    console.log(NowUrl)
    const res = await axios.get(NowUrl)
    setNextUrl(res.data.next)
    setPrevUrl(res.data.previous)
    getData(res.data.results)
    setLoading(false)
  }

  const getData = (res) => {
    res.map(async (data) => {
      const datas = await axios.get(data.url)
      setPokemon(prev => {
        prev = [...prev, datas.data]
        prev.sort((a, b) => a.id > b.id ? 1 : -1)
        return prev
      })
    })
  }

  const kliknext = () => {
    setNowUrl(NextUrl)
  }
  const klikprev = () => {
    setNowUrl(PrevUrl)
  }

  useEffect(() => {
    setPokemon([])
    list()
  }, [NowUrl])

  console.log(NextUrl)
  console.log(PrevUrl)
  console.log(pokemon)

  if (loading) return (<h3>Loading....</h3>)


  return (
    <div className='app-container'>
      <div className='search-bar'>
        <input type="text" />
        <button >search</button>
      </div>
      <Pokemon data={pokemon} />
      <div className='btn-ctr'>
        <button onClick={klikprev}> Previous </button>
        <button onClick={kliknext}> Next </button>
      </div>
    </div>
  )
}


