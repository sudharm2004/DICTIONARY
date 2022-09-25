console.log('Dictionary project');

let searchBtn=document.getElementById('searchBtn');
searchBtn.addEventListener("click",searchDefinition);

async function fetchData(word)
{
        let response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data=await response.json();
        return data;

}

function searchDefinition() {
    let inputVal=document.getElementById('inputVal');
    let list=document.getElementById('list');
    let uiString="";
    let definitions="";
    if(inputVal.value==undefined||inputVal.value.length==0)
    {
        alert('please enter the word to search');
    }
    else
    {
        fetchData(inputVal.value).then((data)=>{
            data.forEach(element => {
                let meanings=element.meanings;
                meanings.forEach(elem=>{
                    let definitions=elem.definitions;
                    definitions.forEach(definitionsElem=>{
                        if (definitionsElem.example!=undefined) {
                            uiString+=`<li class="list-group-item">${definitionsElem.definition}<br>For example:-${definitionsElem.example}</li>`
                        } else {
                            uiString+=`<li class="list-group-item">${definitionsElem.definition}</li>`
                        }
                        // console.log(uiString)
                    });
                });
            });
        }).catch(()=>alert('invalid word or word not present in dictionary'))
    }
    setTimeout(()=>{
        // console.log(uiString)
        inputVal.value="";
        list.innerHTML=uiString;
    },1000)
    
}