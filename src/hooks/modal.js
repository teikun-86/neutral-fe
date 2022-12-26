const { atom } = require("recoil");

const modalState = atom({
    key: "modalState",
    default: ""
})

export default modalState