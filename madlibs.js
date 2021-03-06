/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  let ArrayofObjects = [];
  const result = rawStory.split(" ")
  for(let i=0;i<result.length;i++)
  {
    if ((/\[n\]/).test(result[i]) === true) {
      ArrayofObjects.push({
        word: result[i].replace("[n]", ""),
        pos: "noun"
      })
    }
    else if ((/\[v\]/).test(result[i]) === true) {
      ArrayofObjects.push({
        word: result[i].replace("[v]", ""),
        pos: "verb"
      })
    }
    else if ((/\[a\]/).test(result[i]) === true) {
      ArrayofObjects.push({
        word: result[i].replace("[a]", ""),
        pos: "adjective"
      })
    }
    else{
      ArrayofObjects.push({
        word: result[i],
      })
    }
  
  }
  return ArrayofObjects
}

getRawStory().then(parseStory).then((processedStory) => {
  StoryFunctionality(processedStory)
});
function StoryFunctionality(Array)
{
  const editSection = document.querySelector('.madLibsEdit')
  const PreviewSection = document.querySelector('.madLibsPreview')
  let counter=0;
  for (let i=0;i<Array.length;i++) {
    if(Array[i].pos!=null)
    {
      const EditInput=`<input type="text" placeholder="${Array[i].pos}" class="EditInput" tabIndex="${counter}" maxlength="20">`
      counter+=1
      const PreviewInput=`<input type="text" class="PreviewInput" disabled maxlength="20">`
      editSection.innerHTML+=" "+EditInput
      PreviewSection.innerHTML+=" "+PreviewInput
    }
    else
    {
      editSection.innerHTML+= " "+Array[i].word
      PreviewSection.innerHTML+= " "+Array[i].word
    }
}
let BlankInputs = document.querySelectorAll(".EditInput");
let ViewInputs = document.querySelectorAll(".PreviewInput");
for (let i = 0 ; i < BlankInputs.length; i++) {
  //LiveUpdate
 BlankInputs[i].addEventListener('input', function () {
        ViewInputs[i].value = BlankInputs[i].value;
  })
  //HotKeys
  BlankInputs[i].addEventListener("keypress", function(e){
      if (e.keyCode  == 13) {
         e.preventDefault();
         let nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) +'"]');
         nextInput[0].focus();
      }
   })
}
}
