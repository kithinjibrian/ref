const sdk = require("facebook-nodejs-business-sdk");

const api = sdk.FacebookAdsApi.init(process.env.FACEBOOK_PIXEL_ACCESS_TOKEN);

module.exports = (data,cb) => {

    const UserData = sdk.UserData,
          CustomData = sdk.CustomData,
          EventRequest = sdk.EventRequest,
          ServerEvent = sdk.ServerEvent;

    const userData = (new UserData())
                    .setEmails([data.email])
                    .setPhones([data.contact])
                    .setClientIpAddress(data.ipAddress)
                    .setClientUserAgent(data.userAgent)
                    .setExternalId(data.userID)
                    .setFbp(data.fbp);

    const customData = (new CustomData())
                        .setCurrency("KES")
                        .setValue(data.amount);

    const serverEvent = (new ServerEvent())
                        .setEventName('Purchase')
                        .setEventTime(Math.floor(new Date() / 1000))
                        .setEventId(data.id)
                        .setUserData(userData)
                        .setCustomData(customData)
                        .setEventSourceUrl('https://cloud360.co.ke/checkout')
                        .setActionSource('website');

    const eventRequest = (new EventRequest(process.env.FACEBOOK_PIXEL_ACCESS_TOKEN,process.env.FACEBOOK_PIXEL_ID))
                         .setEvents([serverEvent]);

    eventRequest.execute().then(a=>cb(a),e=>console.log({error:e}))
}

