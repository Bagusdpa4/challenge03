import React, { useState } from 'react'
import pencil from '../../img/pencil.png'
import trash from '../../img/trash.png'

export const RenderList = (props) => {
    const [Task, setTask] = useState(props.data.task)
    const [Complete, setComplete] = useState(props.data.complete)
    const [Edit, setEdit] = useState(false)

    // Fungsi untuk menangani perubahan checkbox
    const handleCheckbox = (e) => {
    const isChecked = e.target.checked
      setComplete(isChecked)
      props.onCheckboxChange(props.data.id, isChecked)
    }

    // fungsi menghandle edit
    const handleEdit = () => {
      if (Edit) {
        props.data.task = Task
        props.data.complete = Complete
      }
      setEdit(!Edit)
    }

    // fungsi menghandle hapus
    const handleDelete =()=>{
    // konfirmasi pop up hapus agar lebih aman dan sekedar memastikan
    const confirm = window.confirm("Apakah anda yakin ingin menghapus task ini?")
    if (confirm) {
      props.deleteButton(
        props.DataAll.filter(valueFilter => valueFilter.id !== props.data.id)
      )
    }
  }

  return (
    <div className="bg-white p-3 rounded-sm shadow-md w-3/5 mx-auto font-semibold ">
        <div className="flex items-center space-x-2 justify-between">
          {/* line-through apabila task telah selesai */}
          <span className={`${Complete ? "line-through" : ""}`}>{props.data.task}</span>
            <div className='flex gap-3'>
              {/* checkbox */}
              <input checked={Complete} type='checkbox' className='w-6' onChange={handleCheckbox}/>
              {/* apabila klik icon edit maka akan menampilkan input */}
              {Edit ? <input value={Task} onChange={(e)=>{setTask(e.target.value)}} className='border-2 border-black flex-grow'/> : ""}
              <img src={pencil} alt='' className='w-6 pl-1' onClick={handleEdit}></img>
              <img src={trash} alt='' className='w-6 pl-1' onClick={()=>{handleDelete()}}></img>
            </div>
        </div>
     </div>
  )
}
