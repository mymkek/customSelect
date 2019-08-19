NodeList.prototype.customSelect = customSelect;

function customSelect() {
  var selectList = this;
  
  selectList.forEach(function(currentValue) {
    var select = createHtml(currentValue);
    changeCurrentOption.call(select);
  });
  
  function changeCurrentOption() {
    var textContainer = this.querySelector('.customSelectCurrent'),
        selectedIndex = this.querySelector('select').options.selectedIndex,
        selectedOption = this.querySelector('select').options[selectedIndex],
        currentText =  document.createTextNode(selectedOption.text);
    textContainer.innerHTML = "";
    textContainer.appendChild(currentText);
  }
  
  function createHtml(element) {
    var outer = document.createElement("div"),
        currentValueOuter = document.createElement("div"),
        openIcon = document.createElement("div"),
        list = document.createElement("ul");
    
    outer.classList.add("customSelect");
    currentValueOuter.classList.add("customSelectCurrent");
    openIcon.classList.add("customSelectOpen");
    element.parentNode.insertBefore(outer, element);
    outer.appendChild(element);  
    element.parentNode.insertBefore(list, element);
    outer.appendChild(element);  
    element.parentNode.insertBefore(currentValueOuter, list);
    element.parentNode.insertBefore(openIcon, list);  
    
    for(var i = 0; i < element.options.length; i++) {
      var optionsListItem = document.createElement("li"),
          optionText = document.createTextNode(element.options[i].text),
          optionValue = element.options[i].value,
          isOptionDisabled = typeof(element.options[i].getAttribute("disabled")) == 'string';
      
      list.parentNode.insertBefore(optionsListItem, list);
      list.appendChild(optionsListItem); 
      optionsListItem.setAttribute("data-name", optionValue);
      optionsListItem.appendChild(optionText); 
      if(isOptionDisabled) {
        optionsListItem.classList.add("disabled");
      }  
      optionsListItem.addEventListener("click", toggleOption);
    }
    //создание поиска
    if(element.options.length > 10) {
        var searchInput = document.createElement("input");
        searchInput.setAttribute('placeholder', "Поиск по списку...")
        element.parentNode.insertBefore(searchInput, element);
        list.prepend(searchInput);
        
        searchInput.addEventListener("input", searchOptions);
    }
    
    currentValueOuter.addEventListener("click", toggleList);
    
    return outer;
  }
  
  function searchOptions() {
      var seacrhValue = this.value.toLowerCase();
      var options = this.parentNode.querySelectorAll('li');
      
      if(seacrhValue === "") {
        options.forEach(function(element) {
            element.style.display = "block";
        });
      } else {
        options.forEach(function(element) {
            var elementText = element.innerHTML.toLowerCase();
            
            element.style.display = "block";
            
            if(elementText.indexOf(seacrhValue) == -1) {
                element.style.display = "none";
            }
        });          
      }
  }
  
  function toggleList() {
    this.parentNode.querySelector("ul").classList.toggle("openned");
  }
  
  function toggleOption() {
    var selectedOptionValue = this.getAttribute("data-name"),
        parentContainer = this.parentNode.parentNode;
    if(!this.classList.contains("disabled")) {
      parentContainer.querySelector("select").value = selectedOptionValue;
      changeCurrentOption.call(parentContainer);
      toggleList.call(this.parentNode);
    }
  }
  
}
