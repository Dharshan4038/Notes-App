const titleEl = document.querySelector('.notes-title');
const bodyEl = document.querySelector('.notes-body');
const btnEl = document.getElementById('btn');
const notesEl = document.querySelector('.left-content');


let state = [];

init();

function init() {
    let localState = JSON.parse(localStorage.getItem('notesApp'));
    if(localState !== null) {
        state = localState;
    }
    state.sort((a,b) => {
        return a.update > b.update ? -1 : 1;
    });
    updateState();
    initListener();
}

function updateState() {
    localStorage.setItem('notesApp',JSON.stringify(state));
    render();
}

function initListener () {
    btnEl.addEventListener("click",notesValues);
}

function render () {
    notesEl.innerHTML = '';
    for(let i=0; i < state.length; i++) {
        const note = document.createElement('div');
        note.classList.add('left-notes');
        note.setAttribute('data-note-id',state[i].id);
        note.setAttribute('onclick',`selectNote(${state[i].id})`);
        note.setAttribute('ondblclick',`deleteNote(${state[i].id})`);
        const headingEl = document.createElement('h4');
        const contentEl = document.createElement('p');
        const updateEl = document.createElement('small');
        updateEl.classList.add('date');
        headingEl.innerHTML = `<h4>${state[i].title}</h4>`;
        contentEl.innerHTML =  `<p>
                                    ${state[i].body.substring(0,60)}
                                    ${state[i].body.length > 60 ? "..." : ""}
                            </p>`   
        updateEl.innerHTML =  `<small>
                                    ${state[i].update}
                                </small>`;
        note.append(headingEl,contentEl,updateEl);
        notesEl.appendChild(note); 
    }
}



function notesValues () {
    let titleVal = titleEl.value;
    let bodyVal = bodyEl.value;
    if(titleVal !== '' && bodyVal !== '') {
        const note = {
            id: getID(),
            title: titleEl.value,
            body: bodyEl.value,
            update: getCurrentTime()
        };
        state.push(note);
        updateState();
    }
    else {
        alert("Please Enter any data in the note");
    }
    titleEl.value = "";
    bodyEl.value = "";
}

function selectNote(id) {
    for(let i=0;i<state.length;i++) {
        if(state[i].id == id) {
            titleEl.value = state[i].title;
            bodyEl.value = state[i].body;
            onNoteEdit(state[i]);
        }
    }
}

function onNoteEdit(note) {
    console.log(note);
    console.log(note.title,note.body);
    [titleEl,bodyEl].forEach(inputField => {
        inputField.addEventListener("blur", () => {
            note.title = titleEl.value.trim();
            note.body = bodyEl.value.trim();
        });
    })
    console.log(note);
    
}

// function displayNote(note) {
//     titleEl.value = note.title;
//     bodyEl.value = note.body;
//     saveNote(note);
// }


//Funtion to save Notes (update / insert) new note
function saveNote (noteToSave) {
    const newNote = state;
    const existing = newNote.find(note => note.id == noteToSave.id);
    if(existing) {
        existing.title = noteToSave.title;
        existing.body = noteToSave.body;
        existing.update = getCurrentTime();
        updateNote(existing);
    } else {
        noteToSave.id = getID();
        noteToSave.update = getCurrentTime();
        newNote.push(noteToSave);
    }
}


function updateNote(note) {
    for(let i=0;i<state.length;i++) {
        if(state[i].id == note.id) {
            state[i].title = note.title;
            state[i].body = note.body;
            state[i].update = getCurrentTime();
            render();
        }
    }
}
//Fution to get Random ID
function getID() {
    return Math.round(Math.random() * 100000);
}

//Function to get current time
function getCurrentTime () {
    var myDate = new Date();
    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
    let date = myDate.getDate();
    let month = monthsList[myDate.getMonth()];
    let year = myDate.getFullYear();
    let day = daysList[myDate.getDay()];
    let today = `${date} ${month} ${year}, ${day}`;
    let amOrPm;
    let twelveHours = function (){
        if(myDate.getHours() > 12)
        {
            amOrPm = 'PM';
            let twentyFourHourTime = myDate.getHours();
            let conversion = twentyFourHourTime - 12;
            return `${conversion}`

        }else {
            amOrPm = 'AM';
            return `${myDate.getHours()}`}
    };
    let hours = twelveHours();
    let minutes = myDate.getMinutes();
    let currentTime = `${hours}:${minutes} ${amOrPm}`;
    let q = today + ' ' + currentTime;
    return q;
}













