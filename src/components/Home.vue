<template>
  <div class="home">
    <h1>ログイン済</h1>
    <div id="todo">
      title:<input type="text" v-model="title"/>
      description:<input type="text" v-model="description"/>
      <button @click="createNewTodo">Add Todo</button>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          {{todo.name}} - {{todo.description}}
        </li>
      </ul>
    </div>
    <!--ログアウトコンポーネント-->
    <amplify-sign-out></amplify-sign-out>
  </div>
</template>

<script>
import API, {  graphqlOperation } from '@aws-amplify/api';
import { createTodo } from "../graphql/mutations";
import { listTodos } from '../graphql/queries';
import { onCreateTodo } from '../graphql/subscriptions';

window.LOG_LEVEL = 'VERBOSE';
export default {
  name: 'home',
  data(){
    return {
      todos: [],
      title: '',
      description: ''
    }
  },
  methods: {
    async createNewTodo(){
      const todo = { name: this.title , description: this.description + Date()};
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