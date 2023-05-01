export const state = () => ({
    packages :[]
});

export const getters = {
    getPackages:(state)=> { 
        return state.packages[0];
    },
    has:(state) => {
        return (state.packages.length==0) ? true : false;
    },
    getPackage:(state)=>(id)=>{
        return state.packages.find(i=>i.id===id);
    },
    getPackageZero:(state)=>{
        return state.packages[0];
    }
};

export const mutations = {
    list(state,data) {
        state.packages = data;
    }
}

export const actions = {
    enroll (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/tier/enroll",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    },
    all ({commit}) {
        return new Promise((resolve,reject)=>{
            (async function(resolve,reject,self,commit){
                try {
                    const r = await self.$axios.$get("/api/tier/all");
                    commit("list",r)
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(resolve,reject,this,commit);
        })
    },
    deposit (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/tier/deposit",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    },
    withdraw (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/tier/withdraw",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    }
}