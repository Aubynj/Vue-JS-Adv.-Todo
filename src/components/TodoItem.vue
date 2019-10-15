<template>
    <div>
        <input type="checkbox" v-model="completed" @change="checkSingle">
        <div :class="{ cancelTodo:completed }" @dblclick="editddTodo" v-if="!edited">{{name}}</div>
        <input type="text" v-model="name" v-if="edited" @blur="editTodo" @keyup.enter="editTodo" @keyup.esc="cancelTodo" v-focus>
        <div class="times" @click="removeTodoEvent">&times</div>
    </div>
</template>

<script>
    export default {
        name : "todo-item",
        props : {
            todo : {
                type: Object,
                required : true
            },
            index : {
                type : Number,
                required : true
            },
            checkAllT : {
                type : Boolean,
                required : true
            }
        },
        watch : {
           checkAllT() {
               this.completed = this.checkAllT ? true : this.todo.bcompleted
           }
        },
        data () {
            return {
                'id' : this.index,
                'name' : this.todo.name,
                'completed' : this.todo.completed,
                'edited' : this.todo.edited,
                'defaultNameCache' : '',
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
            editddTodo() {
                this.defaultNameCache = this.name
                this.edited = true
            },
            editTodo() {
                if (this.name.length <= 0){
                    this.name = this.defaultNameCache
                }
                this.defaultNameCache = this.name
                this.edited = false

                this.$emit('editTodoSingle', {
                    'id' : this.index,
                    todo : {
                        'name' : this.name,
                        'completed' : this.completed,
                        'edited' : this.edited,
                    }
                })
            },
            checkSingle() {
                this.completed = this.completed ? true : false
                this.$emit('checkSing', {
                    'index' : this.index,
                    todo : {
                        'name' : this.name,
                        'completed' : this.completed,
                        'edited' : this.edited,
                    }
                })
            },
            removeTodoEvent() {
                this.$emit('removeTodoEvent', this.index)
            }
        }
    }
</script>

<style scoped>
.times {
    cursor: pointer;

    &:focus {
        color: red;
    }
}
.cancelTodo{
    text-decoration: line-through;
}
</style>