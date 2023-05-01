const { DateTime } = require("luxon"),
      { raw } = require("objection"),
      math = require("currency.js"),
      Tiers = require("../models/tiers");

const one = async (t) => {
    const pd = DateTime.fromISO(t.touch);
    const nd = DateTime.now();
    const {days} = nd.diff(pd,"days").toObject();
    if(days >= 1) {
        const interest = math(t.amount).multiply(0.1);
        const tier = await Tiers.query()
                    .findById(t.id)
                    .patch({
                        interest:raw("interest + ?",interest.value),
                        touch:DateTime.now().toString()
                    });
    }
};

module.exports = async () => {
    const r = await Tiers.query();
    r.map(async i=>await one(i))
}