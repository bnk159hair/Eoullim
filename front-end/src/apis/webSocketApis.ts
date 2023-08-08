export class WebSocketApis {
  private static instance: WebSocketApis;
  public header = this.createHeader();

  static getInstance(): WebSocketApis {
    return this.instance || (this.instance = new this());
  }

  private createHeader(token?: string): any {
    const result: any = {};
    if (token) {
      result.Authorization = `Bearer ${token}`;
    } else if (localStorage.getItem('token')) {
      result.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    console.log(result);

    return result;
  }

  login(newToken: string) {
    this.header = this.createHeader(newToken);
  }

  logout() {
    this.header = this.createHeader();
  }
}
