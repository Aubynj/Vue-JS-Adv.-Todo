<template>
    <div>
        <h2>Todo in store</h2>
        <div class="todo-form">
            <input type="text" v-model="name" placeholder="Enter Fruit name" @keyup.enter="add">
        </div>
        <div class="list-item" v-for="(todo, index) in todos" :key="index">
            <input type="checkbox" v-model="todo.completed" @change="checkSingleTodo(todo)">
            <div class="todo-name" :class="{cancelTodo: todo.completed}" @dblclick="doubleClick(todo)" v-if="!todo.edited">
                {{ todo.name }}
            </div>
            <input type="text" v-model="todo.name" @blur="finishedEdit(todo)" @keyup.enter="finishedEdit(todo)" v-if="todo.edited" v-focus>
            <div class="times" @click="remove(todo.id)">
                &times
            </div>
        </div>
        <div class="extra-container">
           <div class="form-group">
                <input type="checkbox" :checked="!checkall" @change="checkAllTodos">
                <div class="font">check all</div>
            </div>
            <div>{{ remainingTodo }} item left</div>

        </div>
        <div>

        </div>
        <div>
            {{ availableTodo }}
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

    export default {
        name : 'TodoWithStore',
        data() {
            return {
                name : '',
                i : 1,
                id : 1,
                beforeCacheName : ''
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
        computed : {
            ...mapState([
                "todos"
            ]),
            ...mapGetters([
                "availableTodo",
                "remainingTodo"
            ]),
            checkall() {
                return this.remainingTodo != 0
            }
        },
        beforeDestroy : {
            
        },
        methods : {
            add() {
                if (this.name.length < 1){
                    return
                }
                this.$store.commit('addTodo', {
                    id : this.id++,
                    name : this.name
                })
                this.name = ''
            },
            
            checkAllTodos(e){
                this.$store.commit('checkAllTodos', {check: e.target.checked})
            },
            checkSingleTodo(todo) {
                this.$store.commit('checkSingleTodo', {
                    id : todo.id,
                    name : todo.name,
                    completed : todo.completed,
                    edited : todo.edited
                })
            },
            remove(index){
                this.$store.commit('removeTodo', {
                    id : index
                })
            },
            finishedEdit(todo) {
                if (todo.name.length < 1){
                    todo.name = this.beforeCacheName
                }
                this.$store.commit('checkSingleTodo', {
                    id : todo.id,
                    name : todo.name,
                    completed : todo.completed,
                    edited : false
                })
            },
            doubleClick(todo) {
                this.beforeCacheName = todo.name
                todo.edited = true
            }
        }
    }
</script>

<style scoped>
.todo-form{
    margin-bottom: 10px;
}
.list-item{
    display: flex;
    margin: 0px auto;
    width: 20%;
    border: 1px solid #ccc;
    padding: 5px;
    justify-content: space-between
}
.times{
    cursor: pointer;
}
.cancelTodo{
    text-decoration: line-through;
}
.todo-name{
    font-size: 16px;
}
.extra-container{
    display: flex;
    justify-content: space-between;
    margin: 0px auto;
    width: 20%;
    margin-top:3px;
}
.form-group{
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
}
</style>