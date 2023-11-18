import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Pokemon from './components/Pokemon'
import PokeDetail from './components/pokeDetail'

export default function App() {

  const baseUrl = "https://pokeapi.co/api/v2/pokemon"
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [NowUrl, setNowUrl] = useState(baseUrl)
  const [input ,setInput] = useState("")
  const [NextUrl, setNextUrl] = useState("")
  const [PrevUrl, setPrevUrl] = useState("")
  const [pokeDetail, setPokeDetail] = useState()


  const list = async () => {
    setLoading(true)
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

  const inputform = (event) =>{
    setInput(event.target.value)
  }

  const search = async() =>{
    if(!input) return alert("Masukkan Nama Pokemon")
    const x = await axios.get(`${baseUrl}/${input.toLocaleLowerCase()}`)
    setPokeDetail(x.data)
  }

  const cards = (param) => {
    setPokeDetail(param)
  }
  
  return (
    <div className='app-container'>
      <div className='search-bar'>
        <input type="text" onChange={inputform}/>
        <button onClick={search}>search</button>
      </div>
      <div className='content'>
      {
        pokemon && !loading ? (
          <Pokemon data={pokemon} handler={cards}/>
          ): null
      }
      {
        pokeDetail ? (
          <PokeDetail data={pokeDetail} />
        ): null
      }
      {
        loading ? (
          <h3>Loading....</h3>
          ): null
      }
      </div>
      <div className='btn-ctr'>
        <button onClick={klikprev}> Previous </button>
        <button onClick={kliknext}> Next </button>
      </div>
    </div>
  )
}