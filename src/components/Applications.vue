<template>
    <div id="head">
        <h1>Simple Todo App</h1>
        <form v-on:submit="addTodos" style="margin-bottom: 5px">
            <input type="text" placeholder="Enter Fruit name" v-model="newTodos.name"><br><br>
            <button type="submit"> Add</button>
        </form>
        <div class="todoContainer">
            <todo-item v-for="(todo, index) in todos" :key="todo.id" class="todo-name" :todo="todo" :index="index" 
            @removeTodoEvent="removeTodo"  @editTodoSingle="editTodo" @checkSing="checksingle" :checkAllT="!checkall">
                    
            </todo-item>
            
            <div class="extra-container">
                <div class="form-group">
                    <input type="checkbox" :checked="!checkall" @change="checkAllTodos">
                    <div class="font">check all</div>
                </div>
                <div>{{ remaining }} item left</div>
            </div>
            <div v-if="todos == ''">
               <h3>No Todos added yet</h3>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem'
    export default {
        name : 'Application',
        components : {
            TodoItem
        },
        data : () => ({
            todos : [
                {
                    id : 1,
                    name: "Mangoes",
                    completed: false,
                    edited : false
                },
                {
                    id : 2,
                    name: "Oranges",
                    completed: false,
                    edited : false
                },

            ],
            checkme : false,
            defaultNameCache : '',
            incrementID : 3,
            newTodos : []
        }),
        computed : {
            checkall() {
                return this.remaining != 0
            },
            remaining() {
                return this.todos.filter(todo => !todo.completed).length
            }
        },
        directives: {
            focus: {
                // directive definition
                inserted: function (el) {
                el.focus()
                }
            }
        },
        methods : {
            addTodos(e) {
                e.preventDefault()
                if (this.newTodos.name == undefined) {
                    return
                }

                this.todos.push({
                    id : this.incrementID++,
                    name : this.newTodos.name,
                    completed : false,
                    edited : false
                })
                this.newTodos.name = ''
            },
            editddTodo(todo) {
                this.defaultNameCache = todo.name
                todo.edited = true
            },
            checkAllTodos(e) {
                this.todos.forEach(todo => {
                    todo.completed = e.target.checked
                })
            },
            editTodoOld(todo) {
                if (todo.name.length <= 0){
                    todo.name = this.defaultNameCache
                }
                this.defaultNameCache = todo.name
                todo.edited = false
            },
            editTodo(data) {
                // console.log(data)
                this.todos.splice(data.id, 1, data.todo)
            },
            checksingle(data){
                this.todos.splice(data.index, 1, data.todo)
            },
            removeTodo(index) {
                this.todos.splice(index, 1)
            },
        }, 
        created(){
            console.log("Vue instance created")
        }
    }
</script>

<style  scoped>
    .line-dis{
        display: flex;
        flex-direction: row;
        width: 50px;
    }

    .todoContainer{
        margin: 0px auto;
        width: 25%;
    }

    .todo-name{
        font-size: 16px;
        padding: 5px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    
    .cancelTodo{
        text-decoration: line-through;
    }
    .extra-container{
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-between
    }
    .form-group{
        display: flex;
        
    }
    .font{
        font-size: 15px;
        margin-top: 4px;
    }
</style>