import {useRef} from 'react'
import { useAppDispatch } from '../../store/store';
import { addPerson } from '../../store/features/personSlice';

const Add = () => {
  const name = useRef<string>("");
  const dispatch = useAppDispatch()
  return (
    <div className=''>
      <label htmlFor="">Person Name:</label>
      <input onChange={e => name.current = e.target.value}/>
      <button onClick={() => dispatch(addPerson({name: name.current}))} className=' btn btn-primary'>Add</button>
    </div>
  )
}

export default Add