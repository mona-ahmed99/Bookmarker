var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var nameError = document.getElementById("nameError");
var nameExist= document.getElementById("nameExist");
var urlError = document.getElementById("urlError");
var modelSiteName = document.getElementById("modelSiteName");
var modelSiteUrl = document.getElementById("modelSiteUrl");
var updateIndex;


var siteContainer;

if (localStorage.getItem("siteList") == null) {
    siteContainer = [];
}
else {
    siteContainer = JSON.parse(localStorage.getItem("siteList"));
    displaySite();
}

function addSite() {
    if(checkInputs() == false) {
        if (siteName.value == "") {
            nameError.style.display = "block";
        }
        if (siteUrl.value == "") {
            urlError.style.display = "block";
        }
        if (siteName.value == "" && siteUrl.value == "") {
            nameError.style.display = "block";
            urlError.style.display = "block";
        }
       
    }
    else if(checkSiteName()==true){
        nameExist.style.display = "block";
    }
    else {
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        }
        siteContainer.push(site);
        localStorage.setItem("siteList", JSON.stringify(siteContainer));
        clearForm();
        displaySite();
    }
    
    
    


}


function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function displaySite() {
    var cartoona = ``;
    for (var i = 0; i < siteContainer.length; i++) {
        cartoona += `
    <section>
        <div class="container my-5 ">
            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <h2>${siteContainer[i].name}</h2>
                        </td>
                        <td>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="updateSite(`+ i + `)">
                        Update
                       </button>
                            <a class=" btn btn-info"  href="${siteContainer[i].url}" target="_blank">Visit</a>
                            <button class=" btn btn-danger" onclick="deleteSite(`+ i + `)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    `
    }
    document.getElementById("siteSection").innerHTML = cartoona;
}

function checkInputs() {
    if (siteName.value != "" && siteUrl.value != "") {
        return true;
    }

    else {
        return false;
    }
}

function deleteSite(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem("siteList", JSON.stringify(siteContainer));
    displaySite();
}


function updateSite(index){
    modelSiteName.value=siteContainer[index].name;
    modelSiteUrl.value=siteContainer[index].url;
    updateIndex=index;
}

function saveChanges(){

    var modelSite={
        name:modelSiteName.value,
        url:modelSiteUrl.value,
    }
      siteContainer.splice(updateIndex,1,modelSite);
      localStorage.setItem("siteList", JSON.stringify(siteContainer));
        clearForm();
        displaySite();

}

function checkSiteName(){
    for(var i=0; i<siteContainer.length ;i++){
        if(siteContainer[i].name==siteName.value){
            return true;
        }
        else{
            return false;
        }
    }
}
