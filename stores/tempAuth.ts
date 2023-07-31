import { defineStore } from 'pinia';

interface Data {
  username: string;
  password: string;
  rememberMe: boolean;
}

const useTempAuthStore = defineStore('tempAuth', {
  state: (): Data => {
    return {
      username: '',
      password: '',
      rememberMe: false,
    };
  },
  actions: {
    setData(data: Data) {
      this.username = data.username;
      this.password = data.password;
      this.rememberMe = data.rememberMe;
    },
    getData(): Data {
      const data = JSON.parse(JSON.stringify(this.$state));
      this.setData({} as Data);
      return data;
    },
  },
});

export default useTempAuthStore;
