import { request } from "../index"

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  // 模块一
  /**
   * @description 用户登录
   * @param {string} username - 用户名
   * @return {HttpResponse} result
   */
  static async login(params: any) {
    // 登录
    return request("/user/login", params, "post")
  }
  static async register(params: any) {
    // 注册
    return request("/user/register", params, "post")
  }
  // static async login3(params: any) {
  //   // 接口三
  //   return request("/login", params, "post")
  // }
}

/**
 * @description -封装Village类型的接口方法
 */
export class VillageService {
  // 模块二
  /**
   * @description 乡村数据
   * @return {HttpResponse} result
   */
  static async getPage(params: any) {
    return request("/village/getPage", params, "post")
  }
  static async search(params: any) {
    return request("/village/searchForData", params, "post")
  }
  static async delete(params: any) {
    return request("/village/deleteData", params, "post")
  }
  static async edit(params: any) {
    return request("/village/editData", params, "post")
  }
  static async addForm(params: any) {
    return request("/village/addForm", params, "post")
  }
  static async downloadVillage() {
    return request("/village/download", {}, "blob")
  }
  static async uploadData(params: any) {
    return request("/village/upload", params, "upload")
  }
  static async getChartData() {
    return request("/village/getChartData", "", "get")
  }
}

/**
 * @description -封装news类型的接口方法
 */
export class PersonalService {
  /**
   * @description 新闻数据
   * @return {HttpResponse} result
   */
  static async getPage(params: any) {
    return request("/personal/getPage", params, "post")
  }
  static async search(params: any) {
    return request("/personal/searchForData", params, "post")
  }
  static async delete(params: any) {
    return request("/personal/deleteData", params, "post")
  }
  static async edit(params: any) {
    return request("/personal/editData", params, "post")
  }
  static async addForm(params: any) {
    return request("/personal/addForm", params, "post")
  }
  static async getVillageList() {
    return request("/personal/villageList", {}, "get")
  }
  static async downloadPersonal(params: any) {
    return request("/personal/download", params, "blob")
  }
  static async uploadData(params: any) {
    return request("/personal/upload", params, "upload")
  }
}

/**
 * @description -封装news类型的接口方法
 */
export class NewsService {
  /**
   * @description 新闻数据
   * @return {HttpResponse} result
   */
  static async getNewsList() {
    return request("/news/getNewsList", {}, "get")
  }
  static async getNewsDetail(params: any) {
    return request("/news/getNewsDetail", params, "get")
  }
}

/**
 * @description -封装数据分析analysis类型的接口方法
 */
export class AnalysisService {
  /**
   * @description 数据分析
   * @return {HttpResponse} result
   */
  static async getLineData() {
    return request("/analysis/getLineData", {}, "get")
  }
  static async getRatioData() {
    return request("/analysis/getRatioData", {}, "get")
  }
  static async getAnnalData() {
    return request("/analysis/getAnnual", {}, "get")
  }
  static async updateAnnal() {
    return request("/analysis/updateAnnual", {}, "get")
  }
  static async getPanData() {
    return request("/analysis/getPanData", {}, "get")
  }
}
