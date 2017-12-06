/*
 * @Author: hzy 
 * @Date: 2017-12-06 14:12:09 
 * @Last Modified by: hzy
 * @Last Modified time: 2017-12-06 16:11:33
 */
/**
 * 返回json模型
 */
class JsonModel{
    constructor(code = 'OK', msg = 'success', data){
        this.code = code;
        this.msg = msg;
        this.data = data || null;
    }
    set _msg (msg){
        this.code = "NO";
        this.msg = msg;
    }
    get _msg(){
        return this.msg;
    }
}
export default JsonModel;