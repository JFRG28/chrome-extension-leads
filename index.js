let myLeads=[];
const inputBtn=document.querySelector("#input-btn");
const inputEl=document.querySelector("#input-el");
const ulEl=document.querySelector("#ul-el");
const deleteAllBtn=document.querySelector("#delete-all-btn");
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
const tabBtn=document.querySelector("#tab-btn");

/*testing tab only used when no API
const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]
*/

/*
localStorage.setItem("myLead","www.youtube.com");
console.log(localStorage.getItem("myLead"));
localStorage.clear()

// 1. Turn the myLeads string into an array
myLeads=JSON.parse(myLeads)
console.log(typeof myLeads)
// 2. Push a new value to the array
myLeads.push("www.google.com")
console.log(myLeads)
// 3. Turn the array into a string again
myLeads=JSON.stringify(myLeads)
// 4. Console.log the string using typeof to verify that it's a string
console.log(typeof myLeads)
*/

//Initial validation for localStorage
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
        /* alternative way to render de elements
            1. create element
            2. set text content
            3. append to ul
        
            const li=document.createElement("li")
            li.textContent=myLeads[i]
            ulEl.append(li)
        */
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
