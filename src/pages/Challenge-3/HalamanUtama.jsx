import React, { useState } from 'react'
import { RenderList } from '../../assets/component/RenderList/RenderList'
import search from '../../assets/img/search.png'
import book from '../../assets/img/book.png'

export const HalamanUtama = () => {
  // function Search
  const [Search, setSearch] = useState("")
  // Input Task Baru
  const [Input, setInput] = useState("")
  // Button Todo List
  const [checkTask, setCheckTask] = useState("all") 
  // Data Todo List
  const [Data, setData] = useState(
    [{
      "id": 1,
      "task": "Nyuci mobil",
      "complete": true
    }, {
      "id": 2,
      "task": "Memberi makan kucing",
      "complete": true
    }, {
      "id": 3,
      "task": "Olahraga 10 menit",
      "complete": false
    }, {
      "id": 4,
      "task": "Sarapan sereal",
      "complete": true
    }, {
      "id": 5,
      "task": "Belanja harian",
      "complete": false
    }, {
      "id": 6,
      "task": "Ngeprint tugas",
      "complete": true
    }, {
      "id": 7,
      "task": "Bayar tagihan bulanan",
      "complete": true
    }, {
      "id": 8,
      "task": "Berangkat kuliah",
      "complete": false
    }, {
      "id": 9,
      "task": "Les bahasa Inggris",
      "complete": true
    }, {
      "id": 10,
      "task": "Ke rumah Sabrina",
      "complete": false
    }]  
  )

// function renderList Data mapping
const renderList =()=>{
  return filterTask.map((value)=>{
     return <RenderList key={value.id} data={value} deleteButton={setData} DataAll={Data} onCheckboxChange={handleCheckboxChange}/>
  })
}

//function Search
const SearchTask = (SearchTerm)=>{
  return Data.filter((task) => {
    return task.task.toLowerCase().includes(SearchTerm.toLowerCase())
  })
}

const handleSearch =()=>{
  if (Search === "") {
    setData(Data)
  }else {
    const filterData = SearchTask(Search)
    setData(filterData)
    setSearch("")
  }
}

// function renderSubmit new task
const renderSubmit =()=>{
  const dataInput = Input
  
  if (dataInput !== ""){
    let dataAwal = Data

    dataAwal.push({
      id : Data.length + 1,
      task : dataInput,
      complete : false
    })
    setData(dataAwal) 
    setInput("")
    }else {
      alert("Inputan tidak boleh kosong!!")
  }
}

// Function untuk menangani perubahan nilai task complete pada checklist yang dipanggil ke component RenderList
const handleCheckboxChange = (taskId, isChecked) => {
  const updatedData = filterTask.map((task) => {
    if (task.id === taskId) {
      return { ...task, complete: isChecked }
    }
    return task
  })
  setData(updatedData)
}

// function todo list 
const handleShowTask = ()=>{
  let showData = Data
  if (checkTask === "todo") {
    showData = showData.filter((task) => !task.complete)
  }
  else if (checkTask === "done") {
    showData = showData.filter((task) => task.complete)  
  }
  return showData
}
const filterTask = handleShowTask()

//function hapus all task 
const handleDeleteAllTask =()=>{
// memastikan apabila data telah kosong maka pop up berubah menjadi seperti ini
  if (Data.length === 0) {
    alert("Task kosong!!!")
    return
  }
  // konfirmasi pop up hapus agar lebih aman dan sekedar memastikan
  const confirm = window.confirm("Apakah anda yakin ingin menghapus semua task anda?")
  if (confirm) {
    setData([])
  }
}

//function hapus all task yang telah selesai
const handleDeleteTaskDone =()=>{
// memastikan apabila data telah kosong maka pop up berubah menjadi seperti ini
  if (Data.length === 0) {
    alert("Task kosong!!!")
    return
  }
  // data di filter dulu berdasarkan yang telah done
  const updateData = Data.filter((task) => !task.complete)
  // konfirmasi pop up hapus agar lebih aman dan sekedar memastikan
  const confirm = window.confirm("Apakah anda yakin ingin menghapus semua task anda yang telah selesai?")
  if (confirm) {
  setData(updateData)
  }
}

  return (
    <div className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 min-h-screen p-5">
      <h1 className="text-center font-bold text-3xl pb-3">TodoSearch</h1>
      <div className="bg-white p-7 rounded-lg shadow-md w-3/5 mx-auto">
        {/* Search Task */}
        <div className='flex items-center'>
          <img src={search} className='w-[3rem] bg-cyan-500' alt=''></img>
          <input type="text" placeholder="Search ToDo" className="p-2 flex-grow border-2 border-black rounded text-center font-medium"
          onChange={(e)=>{setSearch(e.target.value)}} value={Search}></input>
        </div>
        <div className="pt-3 flex flex-wrap items-center mb-7 ">
          <button type="submit" className="w-2/4 px-4 py-2 bg-cyan-500 text-white rounded mx-auto"
          onClick={()=>{handleSearch()}}>Search</button>
        </div>
        {/* Input New Task */}
        <h1 className="text-center font-semibold text-3xl pb-3">TodoInput</h1>
        <div className='flex items-center'>
          <img src={book} className='w-[3rem] bg-cyan-500' alt=''></img>
          <input type="text" placeholder="Input New Task" className="p-2 flex-grow border-2 border-black rounded text-center font-medium"
          onChange={(e)=>{setInput(e.target.value)}} value={Input}></input>
        </div>
        <div className="pt-3 flex flex-wrap items-center">
          <button type="submit" className="w-2/4 px-4 py-2 bg-cyan-500 text-white rounded mx-auto"
          onClick={()=>{renderSubmit()}}>Submit</button>
        </div>
      </div>
      {/* Button TodoList */}
      <h1 className="text-center font-semibold text-3xl pt-4">TodoList</h1>
      <div className='flex justify-center items-center pt-4 pb-12 space-x-16'>
      <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded w-1/6"
        onClick={()=>{setCheckTask("all")}}>All</button>
        <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded w-1/6"
        onClick={()=>{setCheckTask("done")}}>Done</button>
        <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded w-1/6"
        onClick={()=>{setCheckTask("todo")}}>Todo</button>
      </div>
      {/* Data List */}
      <div className='flex justify-center items-center flex-col space-y-3 '>
        {renderList()} 
      </div>
      {/* Button Delete */}
      <div className='flex justify-center items-center pt-10 space-x-14'>
        <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded w-[28%]"
        onClick={()=>{handleDeleteTaskDone()}}>Delete done tasks</button>
        <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded w-[28%]"
        onClick={()=>{handleDeleteAllTask()}}>Delete all tasks</button>
      </div>
    </div>
  )
}
