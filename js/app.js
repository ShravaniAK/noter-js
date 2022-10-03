showNotes();

let editIndex = 0;

document.getElementById('addBtn').addEventListener("click" , function(e){
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');

    notesObj = getNotes()
    if(addTxt.value === '' || addTxt.value===null){
      SlimNotifierJs.notification('error', 'Error', 'Input Field cannot be blank.', 2000);
    }

    else {

SlimNotifierJs.notification('success', 'Success', 'Note added successfully.', 2000, false);
    notesObj.push({title: addTitle.value,content: addTxt.value});
    notesObj.forEach(function(note, index){
      notesObj[index].title = note.title ? note.title : `Note ${index+1}`
   
    })};

    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes(addTxt.value,"");
    addTxt.value="";
    addTitle.value="";

    // console.log(notesObj);
  
})

document.getElementById('editBtn').addEventListener("click",function(){

  notesObj = getNotes();
  notesObj[editIndex].content = document.getElementById('addTxt').value;
  notesObj[editIndex].title = document.getElementById('addTitle').value;
  localStorage.setItem("notes", JSON.stringify(notesObj));

  document.getElementById('addTxt').value="";
  document.getElementById('addTitle').value="";
  editIndex=0;

  showNotes();
  document.getElementById('editBtn').classList.add("invisible")
})

function updateEdit(noteContent,noteTitle){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    addTxt.value = noteContent || "";
    addTitle.value = noteTitle || "";
}
function showNotes() {
    notesObj = getNotes()
    console.log(notesObj)

    let html = "";

    notesObj.forEach(function(element, index) {
      document.getElementById("notes").classList.remove("margin")
      html += `
              <div class="col-md-4 col-sm-6 col-12  pb-4">
                      <div class="bg-white p-3 pb-0" >
                          <h5 class="card-title">Note ${index + 1}</h5>
                          <p class="card-text"> ${element}</p>
                          <button id="${index}"onclick="editNote(this.id)" class="btn btn-warning mb-3">Edit Note</button>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger mb-3">Delete Note</button>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
      notesElm.innerHTML = html;
    } else {
      document.getElementById("notes").classList.add("margin")
      notesElm.innerHTML = `  <font color="#FFFFFF">Nothing to show! Write some notes.</font>`;
    }
  }
  
  function deleteNote(index) {
      notesObj = getNotes()
      notesObj.splice(index,1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
  }
  function editNote(index){

    notesObj = getNotes()

    document.getElementById('editBtn').classList.remove("invisible");
    let {title,content} = notesObj[index];
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    editIndex = index;

    addTxt.value = content || "";
    addTitle.value = title || "";
  }
  
  function getNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    return notesObj
  }

  let search = document.getElementById('searchTxt');
  search.addEventListener("input",()=>{

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
      })
    })

// Ripple Effect when Purple Buttons are clicked
(function() { var cleanUp, debounce, i, len, ripple, rippleContainer, ripples, showRipple;

  debounce = function(func, delay) {
    var inDebounce;
    inDebounce = undefined;
    return function() {
      var args, context;
      context = this;
      args = arguments;
      clearTimeout(inDebounce);
      return inDebounce = setTimeout(function() {
        return func.apply(context, args);
      }, delay);
    };
  };
  
  showRipple = function(e) {
    var pos, ripple, rippler, size, style, x, y;
    ripple = this;
    rippler = document.createElement('span');
    size = ripple.offsetWidth;
    pos = ripple.getBoundingClientRect();
    x = e.pageX - pos.left - (size / 2);
    y = e.pageY - pos.top - (size / 2);
    style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
    ripple.rippleContainer.appendChild(rippler);
    return rippler.setAttribute('style', style);
  };
  
  cleanUp = function() {
    while (this.rippleContainer.firstChild) {
      this.rippleContainer.removeChild(this.rippleContainer.firstChild);
    }
  };
  
  ripples = document.querySelectorAll('[ripple]');
  
  for (i = 0, len = ripples.length; i < len; i++) {
    ripple = ripples[i];
    rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple--container';
    ripple.addEventListener('mousedown', showRipple);
    ripple.addEventListener('mouseup', debounce(cleanUp, 2000));
    ripple.rippleContainer = rippleContainer;
    ripple.appendChild(rippleContainer);
  }
   }());
