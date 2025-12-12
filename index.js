let myLeads=[];
const inputBtn=document.querySelector("#input-btn");
const inputEl=document.querySelector("#input-el");
const ulEl=document.querySelector("#ul-el");
const deleteAllBtn=document.querySelector("#delete-all-btn");
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
const tabBtn=document.querySelector("#tab-btn");

if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    renderArray(myLeads);
} else {
    console.log("No items in localStorage");
}

function renderArray(paramArray){
    let listItems="";
    inputEl.value="";
    for (let i=0;i<paramArray.length;i++){
        listItems+=`
            <li>
                <a href='${paramArray[i]}' target='_blank'>
                    ${paramArray[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML=listItems;
}

inputBtn.addEventListener("click", function(){
    if (inputEl.value){
        myLeads.push(inputEl.value);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        renderArray(myLeads);
    } else{
        alert("No empty strings allowed");
    }    
})

deleteAllBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    renderArray(myLeads);
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        if (tabs[0].url){
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads",JSON.stringify(myLeads));
            renderArray(myLeads);
        } else{
            alert("No empty strings allowed");
        }
    })    
})
