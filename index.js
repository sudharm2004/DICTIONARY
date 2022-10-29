console.log('Dictionary project');

let searchBtn=document.getElementById('searchBtn');
searchBtn.addEventListener("click",displayDefinitons);

async function fetchData(word)
{
    

    
        let response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data=await response.json();
    console.log(data);
        return data;

}

async function displayDefinitons() {

    let inputVal=document.getElementById('inputVal');
    let list=document.getElementById('list');
    let uiString="";
    let definitions="";
    let word=inputVal.value.toLowerCase();
    word=word.trim()

    if(word==undefined||word.length==0)
        {
            alert('please enter the word to search');
        }
    else
        {
            fetchData(word).then((data)=>{
                if (data.title=='No Definitions Found') {
                    uiString=`<li class="list-group-item">${data.message}</li>`;
                    inputVal.value="";
                    list.innerHTML=uiString;
                } else {
                    console.log('after',data);
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
                    inputVal.value="";
                    list.innerHTML=uiString;
                }
            });
            
                
        }
}
