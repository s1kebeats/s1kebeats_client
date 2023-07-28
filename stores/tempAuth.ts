import { defineStore } from 'pinia';

const useTempAuthStore = defineStore('tempAuth', {
  state: (): {
    username: string;
    password: string;
  } => {
    return {
      username: '',
      password: '',
    };
  },
  actions: {
    setData(data: typeof this) {
      this.username = data.username;
      this.password = data.password;
    },
  },
  getters: {
    getData(): typeof this {
      return {
        username: this.username,
        password: this.password,
      };
    },
  },
});

export default useTempAuthStore;
