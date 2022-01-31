import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {

const [name,setName] = useState('')
const [list,setList] = useState([])
const [isEdit,setIsEdit] = useState(false)
const [alert, setAlert] = useState({show: false, msg: '', type: ''})
const [editID, setEditID] = useState(null)

const showAlert = (show = false, msg = '', type = '') => {
setAlert({show,msg,type})
}

const clearList = () => {
    showAlert(true, 'empty list', 'danger');
    setList([]);
  };

const removeItem =(id) => {
showAlert(true, 'Task Removed!','danger')
setList(list.filter((item) => item.id !== id))

}
const editItem = (id) => {

const specificItem = list.find((item) => item.id === id)
setIsEdit(true)
setEditID(specificItem.id)
setName(specificItem.title)
}



const handleSubmit = (e) => {
e.preventDefault()
console.log('hello')
if(!name)
{
 showAlert(true,'Please enter Task!','danger')
}

else if(name && isEdit)
{

 setList(list.map((item) => {
      if (item.id === editID)
    {
      return {...item,title: name }

    }
      else {
return item

      }

    })
 )
setName('');
      setEditID(null);
      setIsEdit(false);
      showAlert(true, 'value changed','success');

}

else
{
showAlert(true,'Task added!','success')
const newItem = {id: new Date().getTime().toString(), title: name }
setList([...list,newItem])
setName('')

}

}


  return <>
<section className = "section-center">
<form className = 'grocery-form' onSubmit = {handleSubmit}>
{alert.show && <Alert {...alert} removeAlert={showAlert}  />}
<h3>Task Tracker</h3>
<div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='Enter any task'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

  <button type='submit' className='submit-btn' >
  {isEdit ? 'Edit' : 'Submit'}
  </button>


</div>
</form>

{list.length > 0 && (

<div className='grocery-container'>
<List items = {list} removeItem = {removeItem} editItem = {editItem}/>
 <button className='clear-btn' onClick = {clearList}>
            clear items
          </button>
</div>
)
}

</section>


</>
}

export default App
