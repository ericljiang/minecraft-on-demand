export function getInstanceStatus(callback) {
  fetch("https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/minecraftInstanceStatus")
    .then((response) => response.json())
    .then(callback);
}

export function getServerStatus(callback) {
  fetch("https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/minecraftServerStatus/mc.ericjiang.me")
    .then((response) => response.json())
    .then(callback);
}

export function startServer() {
  fetch('https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/startMinecraftInstance', { method: 'POST' })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
