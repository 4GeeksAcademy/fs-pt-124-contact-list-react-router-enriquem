export const initialStore=()=>{
  return{
    message: null,
    contacts: []
  }
}

export default function storeReducer(store, action) {
  let id
  switch(action.type){
    case 'get_contacts':
      console.log(action.payload);
      
      return{
        ...store,
        contacts:action.payload
      }
      case 'delete_task':

      const id = action.payload

      return {
        ...store,
        todos: store.todos.filter((todo)=>(todo.id !== id))
      }
    default:
      return store;
      // throw Error('Unknown action.');
  }    
}