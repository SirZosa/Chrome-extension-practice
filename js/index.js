// Declare an empty array to store our links
let myLeads = []

// Get the DOM elements we need
const inputBtn = document.getElementById("input-btn")
const inputBtn2 = document.getElementById("input-btn2")
const tabBtn = document.getElementById("tab-btn")
let inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")


//Declare an array to store the data from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//Check if the localStorage is empety or not
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Add a click event to the "SAVE" button
inputBtn.addEventListener("click", function(){
    // Check if the input field is empty
    if(inputEl.value===""){
    }
    else{
        // Add the value of the input field to our links array
        myLeads.push(inputEl.value) 
        // Clear the input field
        inputEl.value = ""
        //save value into the local data
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        // Render the updated links list
        render(myLeads)
    }
})

//Add a click event to store the active tab on Chrome in myLeads array using an google api
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// Add a click event to the "REMOVE" button
inputBtn2.addEventListener("click", function(){
    // Check if the links array is not empty
    if (myLeads.length > 0) {
        // Remove the last element from the links array and the local storage
        myLeads.pop()
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        // Render the updated links list
        render(myLeads)
    } else {
        console.log("myLeads is empety")
    }
})

// Function to render the links list
function render(leads) {
    // Create a new array containing HTML list items
    let listedItems = leads.map(function(item) {
        return `
            <li>
                <a target='_blank' href='${item}'>
                    ${item}
                </a>
            </li>
        `
    })
    // Join all elements of the array into a string and set it as the content of the <ul> element
    ulEl.innerHTML = listedItems.join("")
}