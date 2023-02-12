// const pointText = "<li> <textarea rows=\"1\" class=\"editline\"></textarea> </li>"
var shift = false, ctrl = false;
var currentLevel, rootLevel;

function addNewPoint(){
    var statement = document.createElement('li');
    var textbox = document.createElement('textarea');
    textbox.setAttribute('rows', '1');
    textbox.className = 'editline';
    textbox.onkeydown = onPointTyping;
    textbox.addEventListener('input', function(){
        this.style.height = 'auto';
        this.style.height = this.scrollHeight+'px';
    });
    textbox.addEventListener('focus', (event) => {
        currentLevel.style.borderLeft = 'none';
        currentLevel = document.activeElement.parentElement.parentElement;
        currentLevel.style.borderLeft = 'solid';
    });
    var proof = document.createElement('ul');
    proof.className = 'editfield';
    statement.append(textbox);
    statement.append(proof);
    currentLevel.append(statement);
    statement.focus();
    textbox.focus();
}
function focusOnPrevious(current){
    if(current.previousSibling != null)
        current.previousSibling.children[0].focus();
    else
        current.parentElement.parentElement.children[0].focus();
}
function focusOnNext(current){
    console.log(current);
    console.log(current.children[1]);
    console.log(current.children[1].children[0]);
    console.log(current.children[1].children[0].children[0]);
    if(current.children[1].length > 0){
        currentLevel = current.children[1].children[0];
        currentLevel.children[0].focus();
    }else if(current.nextSibling != null)
        current.nextSibling.children[0].focus();
    // else
    //     current.parentElement.parentElement.children[0].focus();
}
async function onPointTyping(event){
    if(event.keyCode == 8){
        if (event.srcElement.value == "" || event.srcElement.value == null){
            //deleting
            var reqToDelete = event.srcElement.parentElement;
            if(!(reqToDelete.parentElement == rootLevel &&
                reqToDelete.parentElement.children.length == 1) &&
                reqToDelete.children[1].children.length == 0){
                focusOnPrevious(reqToDelete);
                reqToDelete.parentElement.removeChild(reqToDelete);
            }
            event.preventDefault();
        }
    } else if (event.keyCode == 13){
        if(shift){
            currentLevel.style.borderLeft = 'none';
            // New layer of proof
            var parent = document.activeElement.parentElement;
            currentLevel = parent.children[1];
            addNewPoint();
        }else if(ctrl){
            currentLevel.style.borderLeft = 'none';
            // nex point
            currentLevel = rootLevel;
            addNewPoint();
        }
        else{
            //On same level
            addNewPoint();
        }
        event.preventDefault();
    } else if(event.keyCode == 38){
        focusOnPrevious(event.srcElement.parentElement);
        event.preventDefault();
    } else if (event.keyCode == 40){
        focusOnNext(event.srcElement.parentElement);
        event.preventDefault();
    }
}
function listenerFont(ev){
    if(ev.keyCode == 13){
        updateFont();
    }
}
function updateFont(){
    const fontpick = document.getElementById("fontpick");
    console.log(fontpick.value);
    document.body.style.fontSize = fontpick.value;
}
window.onload = function(){
    rootLevel = document.getElementById("pointlist");
    currentLevel = rootLevel;
    addNewPoint();
    var fontpick = document.getElementById("fontpick");
    fontpick.oninput = listenerFont;
    document.body.style.paddingTop = document.getElementById("header").offsetTop;
}
window.onkeydown = function(ev){
    if(ev.keyCode == 16){
        shift = true;
    } else if(ev.keyCode == 17){
        ctrl = true;
    }
}
window.onkeyup = function(ev){
    if(ev.keyCode == 16){
        shift = false;
    } else if(ev.keyCode == 17){
        ctrl = false;
    }
}