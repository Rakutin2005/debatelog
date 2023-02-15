// const pointText = "<li> <textarea rows=\"1\" class=\"editline\"></textarea> </li>"
var shift = false, ctrl = false;
var timemmark_start;
var currentLevel, rootLevel;

function saveSpeech(){
    let data = "data:text/plain;charset=UTF-8;page=21,";
    data += encodeURIComponent(levelToString(rootLevel, 0));
    var element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', 'speech.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function levelToString(level, lvlnum){
    let data = ""
    for(let c of level.children){
        data += ('\t'.repeat(lvlnum))+c.children[0].value+'\n';
        if(c.children[1].children.length > 0)
            data += levelToString(c.children[1], lvlnum+1);
    }
    return data;
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
    } else if(event.keyCode == 38){ //Up
        focusOnPrevious(event.srcElement.parentElement);
        event.preventDefault();
    } else if (event.keyCode == 40){ //Down
        focusOnNext(event.srcElement.parentElement);
        event.preventDefault();
    } else if(event.keyCode == 39){ //Right
        if(ctrl){
            
        }
    } else if(event.keyCode == 37 && ctrl){ //Left
        if(event.srcElement.style.backgroundColor == ''){
            event.srcElement.style.backgroundColor = 'var(--theme-highligh)';
        }else{
            event.srcElement.style.backgroundColor = '';
        }
        event.preventDefault();
    }
}
// function listenerFont(ev){
//     if(ev.keyCode == 13){
//         updateFont();
//     }
// }
// function updateFont(){
//     const fontpick = document.getElementById("fontpick");
//     console.log(fontpick.value);
//     document.body.style.fontSize = fontpick.value;
// }
window.onload = function(){
    rootLevel = document.getElementById("pointlist");
    currentLevel = rootLevel;
    addNewPoint();
    // var fontpick = document.getElementById("fontpick");
    // fontpick.oninput = listenerFont;
    document.body.style.paddingTop = document.getElementById("header").offsetTop;
    document.getElementById("overlay").addEventListener('click', (event)=>{
        document.getElementById("sidemenu").style.width = "0px";
        document.getElementById("sidemenu").style.padding = "0px";
        document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0)";
        document.getElementById("overlay").style.visibility = "hidden";
    });
    document.getElementById("sidemenu_btn").addEventListener('click', (event)=>{
        document.getElementById("sidemenu").style.width = "480px";
        document.getElementById("sidemenu").style.padding = "25px";
        document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0.4)";
        document.getElementById("overlay").style.visibility = "visible";
        // console.log
    });
    document.getElementById("timer_btn").addEventListener('click', (event) => {
        if(timemmark_start == null){
            timemmark_start = new Date();
        }else{
            timemmark_start = null;
        }
    });
    window.setInterval(updateTimer, 500);
}
function updateTimer(){
    if(timemmark_start != null){
        let endDate = new Date();
        var seconds = (endDate.getTime() - timemmark_start.getTime()) / 1000;
        document.getElementById('timer').innerText = Math.floor(seconds/60) + ':';
        if( + Math.floor(seconds%60) < 10) document.getElementById('timer').innerText+='0';
        document.getElementById('timer').innerText += Math.floor(seconds%60);
        document.getElementById('timer_btn').setAttribute('src', './svg/timestop.svg');
    }else{
        document.getElementById('timer_btn').setAttribute('src', './svg/timestart.svg');
        document.getElementById('timer').innerText = "0:00";
    }
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