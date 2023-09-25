document.addEventListener("DOMContentLoaded", () => {

    const topInputAttrs = {
        "id": "top",
        "type": "input",
        "placeholder": "Top Gif Text"
    }

    const bottomInputAttrs = {
        "id": "bottom",
        "type": "input",
        "placeholder": "Bottom Gif Text"
    }

    const urlInputAttrs = {
        "id": "url",
        "type": "input",
        "placeholder": "Gif Name"
    }

    const buttonAttrs = {
        "type": "button",
        "value": "Submit"
    }

    const parentDivAttrs = {
        "class": "container"
    } 

    let content = document.getElementById("content");
    let form = createElement("form", 0);
    let topInput = createElement("input", topInputAttrs);
    let bottomInput = createElement("input", bottomInputAttrs);
    let gifName = createElement("input", urlInputAttrs);
    let button = createElement("input", buttonAttrs);
    let parentDiv = createElement("ul", parentDivAttrs);

    form.append(topInput, bottomInput, gifName, button);
    content.append(form, parentDiv);

    button.addEventListener("click", () => {
        const d = async () => {
            let res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=g04RjPLTTX4K5HWGXmTEZG681jFsF2sC&q=${gifName.value}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);

            return res.data;
        } 
     
        d().then(data => {
            const src = data.data[0].images.original.url
            const alt = data.data[0].username;
            if(!src || !topInput.value || !bottomInput.value) {
                alert("form incomplete!")
                return;
            }else {
                const childLi = createGiphyAndButton(src, topInput.value, bottomInput.value, alt);
                
                if(parentDiv.children.length < 5) {
                    topInput.value = "";
                    bottomInput.value = "";
                    gifName.value = ""
                    parentDiv.append(childLi);
                }else {
                    alert("delete a gif in order to add another one")
                } 
            }
        }).catch((e) => {
            alert(e.message);
        })
    });

    function createGiphyAndButton(src,topValue, bottomValue, alt) {
        const imgAttr = {
            src,
            alt
        }
    
        const bottomImgValueAttr = {
            "class": "h3Value"
        }

        const btnAttr = {
            "class": "griphyBtn",
            "value": "Delete",
            "type": "button"
        }
    
        let li = createElement("li",0);
        let img = createElement("img", imgAttr);
        
        let topImgValue = createElement("h3", 0);
        let bottomImgValue = createElement("h3",bottomImgValueAttr);
        let btn = createElement("input", btnAttr);

        if(topInput.value.length > 20 || bottomInput.value > 20 ) {
            alert("Text has to be 20 characters are less!");
            return;
        }else {
            topImgValue.innerText = topValue;
            bottomImgValue.innerText = bottomValue;
            
            li.append(img ,btn, topImgValue, bottomImgValue);
        
            return li;
        } 
    }

    function createElement(element, attributes) {
        let el = document.createElement(element);
        if(attributes) {
            for(let attr in attributes) {
                el.setAttribute(attr, attributes[attr]);
            }
        }
        return el;
    }
    
    parentDiv.addEventListener("click",function(e) {
        if(e.target.className === "griphyBtn") {
           e.target.parentElement.remove();
        }
       
    })
});