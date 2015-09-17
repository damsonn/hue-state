# Hue state
Small deamon to manage state of your hue lights after power off.

## Setup

### npm
```
npm install
```

### Bridge ip
You need to know your bridge ip address. You can visit [meethue site](http://www.meethue.com/api/nupnp) to help you out.

### Create username
run the following in a terminal (you need curl)
```
curl -H "Content-Type: application/json" -X POST -d '{"devicetype":"my_hue_app#android yourname"}' http://BRIDGE_IP/api
```
it will tell you to push the button, do it, then call that again. It should return a new username.

## Run
```
node main.js --host=BRIDGE_IP --username=USERNAME
```
or even better using [forever](https://github.com/foreverjs/forever)
```
forever start main.js --host=BRIDGE_IP --username=USERNAME
```
