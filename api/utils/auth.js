const jwt = require("jsonwebtoken");

class Auth {
    constructor(pd,store) {
        const def = {
            AccessTokenExpiry:"30s",
            RefreshTokenExpiry:"7d"
        };

        this.f = Object.assign(def,pd);
        this.store = store;
    }

    async set(key,value) {
       const a = await this.store.query()
             .insert({
                 RefreshToken:key,
                 AccessToken:value
             });
    }

    async has (key) {
        const a = await this.store.query()
                .findOne({RefreshToken:key});

        if(a === undefined) {
            return false;
        } else {
            return true;
        }
    };

    async update (key,value) {
        const a = await this.store.query()
                .findOne({RefreshToken:key})
                .patch({
                    AccessToken:value
                });
    }

    async login(user) {
        const AccessToken = jwt.sign(user, this.f.AccessTokenSecret, {expiresIn : this.f.AccessTokenExpiry});
        const RefreshToken = jwt.sign(user, this.f.RefreshTokenSecret, {expiresIn : this.f.RefreshTokenExpiry});
        
        await this.set(RefreshToken,AccessToken);

        return {
            AccessToken,
            RefreshToken
        };

    }

    async refresh(RefreshToken,cb) {
        if(await this.has(RefreshToken) && RefreshToken) {
            jwt.verify(RefreshToken,this.f.RefreshTokenSecret,(err,user)=>{
                if(err) {
                    cb({type:"error",msg:[{msg:"The refresh token is invalid."}]})
                } else {
                    const AccessToken = jwt.sign({id:user.id,username:user.username},this.f.AccessTokenSecret,{expiresIn:this.f.AccessTokenExpiry});
                    this.update(RefreshToken,AccessToken);
                    cb(null,{AccessToken})
                }
            });
        } else {
            cb({type:"error",msg:[{msg:"The refresh token is missing."}]})
        }
    }

    verify (headers,cb) {
        const token = headers["authorization"] && headers["authorization"].split(" ")[1];

        if(!token) {
            cb({type:"error",msg:[{msg:"Access token is missing"}]})
        } else {
            const p = new Promise((resolve,reject)=>{
                jwt.verify(token,this.f.AccessTokenSecret,(err,user)=>{
                    if(err) reject(err);
                    resolve(user);
                })
            });

            p.then((user)=>cb(null,user))
            .catch(()=>cb({type:"error",msg:[{msg:"The access token is invalid"}]}))
        }
    }
} 

module.exports = Auth;