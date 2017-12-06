import crypto from "crypto";

export default function toMd5(str){
    return crypto.createHash("md5").update(str+'hzy', "utf8").digest("hex");
}