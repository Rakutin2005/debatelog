// const pointText = "<li> <textarea rows=\"1\" class=\"editline\"></textarea> </li>"
var shift = false, ctrl = false;
var currentLevel, rootLevel;

function closeMenu(){
    document.getElementById("sidemenu").style.width = "0px";
}

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
function focusOnPrevious(current, ignore){
    let a;
    if(ignore) a = current;
    else a = current.previousSibling
    if(a != null){
        if(a.children[1].children.length > 0){
            focusOnPrevious(a.children[1].children[a.children[1].children.length-1], true);
        }else if(!ignore){
            a.children[0].focus();
        }else{
            current.children[0].focus();
        }
    }
    else{
        current.parentElement.parentElement.children[0].focus();
    }
}
function focusOnNext(current, ignore){
    if(current.children[1].children.length > 0 && !ignore){
        currentLevel.style.borderLeft = 'none';
        currentLevel = current.children[1];
        currentLevel.children[0].children[0].focus();
    }else if(current.nextSibling != null){
        current.nextSibling.children[0].focus();
    }
    else if(current.parentElement != rootLevel){
        // console.log(current.parentElement.parentElement.nextSibling);
        // console.log(current.parentElement.parentElement.nextSibling.children[0]);
        focusOnNext(current.parentElement.parentElement, true);
    }
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
        currentLevel.style.borderLeft = 'none';
        if(shift&&ctrl){
            // nex point on top level
            currentLevel = rootLevel;
            addNewPoint();
        }else if(shift){
            // New layer of proof
            var parent = document.activeElement.parentElement;
            currentLevel = parent.children[1];
            addNewPoint();
        }else if(ctrl && currentLevel != rootLevel){
            currentLevel = currentLevel.parentElement.parentElement;
            addNewPoint();
        }
        else{
            //On same level
            currentLevel.style.borderLeft = 'solid';
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
    document.getElementById("overlay").addEventListener('click', (event)=>{
        document.getElementById("sidemenu").style.width = "0px";
        document.getElementById("sidemenu").style.padding = "0px";
        document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0)";
        document.getElementById("overlay").style.visibility = "hidden";
    });
    document.getElementById("sidemenu_btn").addEventListener('click', (event)=>{
        document.getElementById("sidemenu").style.width = "25%";
        document.getElementById("sidemenu").style.padding = "25px";
        document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0.4)";
        document.getElementById("overlay").style.visibility = "visible";
        // console.log
    });
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