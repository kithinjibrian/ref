import Vue from "vue";
import VueGtag from "vue-gtag";

export default ({ app }) => {
    Vue.use(VueGtag, {
        config: { id: 'G-H1YDT0QKGB' },
    }, app.router);
}