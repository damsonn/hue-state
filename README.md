# Hue state
Small deamon to manage state of your hue ligths after power off.

## Setup

### npm
```
npm install
```

### Bridge ip
Then you need to know your bridge ip address. You can visit [meethue|http://www.meethue.com/api/nupnp]

### Create username
```
curl -H "Content-Type: application/json" -X POST -d '{"devicetype":"my_hue_app#android yourname"}' http://BRIDGE_IP/api
```
it will tell you to push the button, do it, then call the same. It should return a new username.

## Run
```
node main.js --host=BRIDGE_IP --username=USERNAME
```

## TODO
Improved logging
