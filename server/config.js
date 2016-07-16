// social media auth configurations
ServiceConfiguration.configurations.remove({
 service: "facebook"
});
ServiceConfiguration.configurations.insert({
service: "facebook",
appId: "256222104715002",
secret: "cc59b02467ba1d24da52772dc3232da2"
});
ServiceConfiguration.configurations.remove({
service: "twitter"
});
ServiceConfiguration.configurations.insert({
service: "twitter",
consumerKey: "mKPyDdTVcY2lMJKRIpHXXQmPW",
secret: "7hQUAhojXET16IM1FhuPylTsqN70v5VR7ni56uPhI7wtw648l1"
});