const { atom } = require("recoil");

const drawerState = atom({
    key: "drawerState",
    default: ""
})

export default drawerState