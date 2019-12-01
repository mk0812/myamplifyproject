<template>
  <div id="app">
    <button @click="createNewTodo">Add Todo</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.name}} - {{todo.description}}
      </li>
    </ul>
  </div>
</template>

<script>
import API, {  graphqlOperation } from '@aws-amplify/api';
import { createTodo } from "./graphql/mutations";
import { listTodos } from './graphql/queries';
import { onCreateTodo } from './graphql/subscriptions';

window.LOG_LEVEL = 'VERBOSE';
export default {
  name: 'app',
  data(){
    return {
      todos: []
    }
  },
  methods: {
    async createNewTodo(){
      const todo = { name: "Todo Title" , description: "あれをやる" + Date()};
      await API.graphql(graphqlOperation(createTodo,{input: todo}))
    },
    async getData(){
      const todoData = await API.graphql(graphqlOperation(listTodos))
      this.todos.push(...this.todos, ...todoData.data.listTodos.items)
    },
    subcribe(){
      API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onCreateTodo;
          this.todos.push(todo);
        }
      })
    }
  },
  created(){
    this.getData();
    this.subcribe();
  }
}
</script>
