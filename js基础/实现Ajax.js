const GET = "GET";
const POST = "POST";
const noop = () => {};

class Ajax {
  constructor() {
    // IE6以下不支持XMLHttpRequest，需要实例化ActiveXObject对象，但基本上不考虑
    this.xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
  }

  /**
   * 格式化数据
   * {name: 'aa', age: 10} => name=aa&age=10
   */
  formatData(data = {}) {
    const arr = [];
    for (let key in data) {
      arr.push(encodeURIComponent(key) + "=" + data[key]);
    }
    return arr.join("&");
  }

  /**
   * 发送请求，分为GET请求和POST请求
   */
  request(options = {}) {
    const self = this;
    this.data = this.formatData(options.data);
    this.type = (options.type || GET).toUpperCase();
    this.url = options.url;
    if (!this.url) {
      throw new Error("ajax url is required.");
    }
    this.success = options.success || noop;
    this.error = options.error || noop;

    if (this.type === GET) {
      this.xhr.open(this.type, this.url + "?" + this.data, true);
      this.xhr.send();
    } else if (this.type === POST) {
      this.xhr.open(this.type, this.url, true);
      this.xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.xhr.send(this.data);
    }
    this.xhr.onreadystatechange = function () {
      if (self.xhr.readyState === 4) {
        // 200-请求成功
        // 204-请求成功，但是没有资源返回
        // 206-请求成功，部分返回
        if ([200, 204, 206].indexOf(self.xhr.status) > -1) {
          const result = self.xhr.responseText;
          typeof self.success === "function" &&
            self.success.call(self.xhr, result);
        } else {
          const error = self.xhr.responseText;
          typeof self.error === "function" && self.error.call(self.xhr, error);
        }
      }
    };
  }
}
