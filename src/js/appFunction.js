const { ipcRenderer } = require("electron");
const maxResBtn = document.getElementById("maxResBtn");
const ipc = ipcRenderer;

//const mySidebar = document.getElementById("mySidebar");
//let isLeftMenuActive = true;

minimizeBtn.addEventListener("click", () => {
    ipc.send("minimizeApp");
})

const changeRestore = () => {
   maxResBtn.title = "Restore"; 
   maxResBtn.classList.remove("maximizeBtn");
   maxResBtn.classList.add("restoreBtn");
};

const changeMaximize = () => {
    maxResBtn.title = "Maximize"; 
    maxResBtn.classList.remove("restoreBtn");
    maxResBtn.classList.add("maximizeBtn");
};

ipc.on("isMaximized", changeRestore);
ipc.on("isRestored", changeMaximize);

maxResBtn.addEventListener("click", () => {
    ipc.send("maximizeRestoreApp");
})

closeBtn.addEventListener("click", () => {
    ipc.send("closeApp");
})

/*
showHideMenus.addEventListener("click", () => {
    if(isLeftMenuActive){
        mySidebar.style.width = "0px"
        isLeftMenuActive = false;
        return
    }
    mySidebar.style.width = "280px"
    isLeftMenuActive = true;
});
*/