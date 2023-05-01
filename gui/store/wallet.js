export const state = () => ({
    wallet : {
        streams:[]
    }
});

export const getters = {
    getAllTotals:(state) => {
        const st = state.wallet.streams.reduce((a,b)=>a+b.total,0);
        return +st + +state.wallet.total;
    },
    getWalletTotal:(state) =>{
        return state.wallet.total
    },
    getOtherTotal:(state) => (type) => {
        const t = state.wallet.streams.find(a=>a.type===type);
        return (t!==undefined) ? t.total : 0;
    }
}

export const mutations = {
    set(state,data) {
        state.wallet=Object.assign({},state.wallet,data);
    }
}

export const actions = {
    all ({commit}) {
        return new Promise((resolve,reject)=>{
            (async function(commit,resolve,reject,self){
                try {
                    const r = await self.$axios.$get("/api/wallet");
                    resolve(r);
                    commit("set",r)
                } catch ({response}) {
                    reject(response);
                }
            })(commit,resolve,reject,this);
        })
    },
    deposit (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/wallet/deposit",data);
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
                    const r = await self.$axios.$post("/api/wallet/order",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    },
    checkout (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/wallet/checkout",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    },
    depositOther (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/wallet/deposit/other",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    },
    withdrawOther (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/wallet/withdraw/other",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    }
}