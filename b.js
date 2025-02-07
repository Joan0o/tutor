window.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#fetchQuotesBtn").addEventListener("click", function () { 

    // Get values from drop-downs
    const topicDropdown = document.querySelector("#topicSelection");
    const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
    const countDropdown = document.querySelector("#countSelection");
    const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

    // Get and display quotes
    fetchQuotes(selectedTopic, selectedCount); 
    
  });
});


// TODO: Modify to use Fetch API
async function fetchQuotes(topic, count) {

  let link = "https://wp.zybooks.com/quotes.php?topic=" + topic + "&count=" + count;
  let response = await fetch(link);
  let quotes = await response.json();

  count = quotes.length;
  
  if(quotes.error){
    showQuotes([], 0, topic);    
  } else {
    showQuotes(quotes, count, topic); 
  }
}



function showQuotes(quotes, count, topic) { 

  let html = "";  

  if(count !== 0){    
    html = "<ol>";
    for (let c = 0; c < count; c++) {  
     html +=  `<li>${quotes[c].quote} - ${quotes[c].source}</li>`;  
    }
    html += "</ol>";
  } else {
	  html += `Topic '${topic}' not found`;  
  }
  

  document.querySelector("#quotes").innerHTML = html 
}

