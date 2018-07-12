import Axios from 'axios';
import {Notice} from 'iview';
import Config from './config.js'

//异步请求结果处理
const resultFun = function (data, $this, option) {
  data = data.data;
  switch (data.code) {
    case 100: //正确
      if (option.success) {
        $this
          ? option
            .success
            .call($this, data.extend)
          : option.success(data.extend);
      } else {
        $this && ($this.isSubmitLoading = true);
      }
      break;
    case 200:
      if (data.msg == "nologin") {
        if (option.error) {
          $this
            ? option
              .error
              .call($this, data.msg)
            : option.error(data.msg);
        } else {
          $this
            .$router
            .replace({name: 'login', params: $this.$route});
        }
      } else {
        if (option.error) {
          $this
            ? option
              .error
              .call($this, data.extend)
            : option.error(data.extend);
        } else {
          $this && ($this.isSubmitLoading = false);
          Notice.error({title: '错误信息/Error', desc: data.msg});
        }
      }
      break;
    case 300: //未登录
      $this
        .$router
        .replace({name: 'login', params: $this.$route});
      break;
    case 600: //未登录
      $this
        .$router
        .replace({name: 'backlogin', params: $this.$route});
      break;
    default: //位置的状态码
      $this
        .$router
        .replace({name: 'login'});
      break;
  }
};

Axios.defaults = Object.assign(Axios.defaults, {
  baseURL: Config.baseUrl,
  withCredentials: true,
  timeout: 0,
  responseType: 'json'
});

class Tool {
  get(option, $this) {
    Axios({url: option.url, params: option.data}).then(data => resultFun(data, $this, option), error => console.error(error));
  }

  getLang(langType) {
    return Axios({url: `/static/lang/${langType}.json`, baseURL: '/'});
  }

  post(option, $this) {
    Axios({url: option.url, method: 'post', data: option.data}).then(data => resultFun(data, $this, option), error => console.error(error));
  }

  delete(option, $this) {
    Axios({url: option.url, method: 'delete', data: option.data}).then(data => resultFun(data, $this, option), error => console.error(error));
  }

  put(option, $this) {
    Axios({url: option.url, method: 'put', data: option.data}).then(data => resultFun(data, $this, option), error => console.error(error));
  }

  find(array, key, val) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] === val) {
        return element;
      }
    }
    return null;
  }

  findIndex(array, key, val) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] === val) {
        return i;
      }
    }
    return -1;
  }
}

export default new Tool();
