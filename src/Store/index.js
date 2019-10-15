import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        todos : [],

    },
    getters : {
        availableTodo(state){
            return state.todos.length < 1 ? "Ooops..No todos" : null
        },
        remainingTodo(state) {
            return state.todos.filter(todo => !todo.completed).length
        }
    },
    mutations : {
        addTodo(state, payload) {
            state.todos.push({
                id : payload.id,
                name : payload.name,
                completed : false,
                edited : false
            })
        },
        removeTodo(state, payload){
            state.todos.splice(state.todos.map(e => e.id).indexOf(payload.id), 1)
        },
        checkSingleTodo(state, payload) {
            state.todos.splice(state.todos.map(e => e.id).indexOf(payload.id), 1, {
                id : payload.id,
                name : payload.name,
                completed : payload.completed,
                edited : payload.edited
            })
        },
        checkAllTodos(state, payload) {
            state.todos.forEach(todo => {
                todo.completed = payload.check
            })
        }
    }
})

export default store