export const initialStore=()=>{
  return{
    message: null,
    todos: []
  }
}

export default function storeReducer(store, action) {
  let id
  switch(action.type){
    case 'get_tasks':
      fetch("https://playground.4geeks.com/contact/agendas/EnriqueM/contacts")
      .then(response => response.json())
      .then(data => {
      // console.log(data);
        
        return {
          ...store,
          todos:data.contacts
        }
      })
      break;



    case 'add_task':
      id = action.payload.id
      color = action.payload.color
    
      
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
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