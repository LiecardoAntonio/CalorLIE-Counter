const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  //When the user inputs their daily calorie budget, the input field will only accept numerical values. However, if a number is entered with a + or - sign, you'll need to remove those characters.

  //before cleaning the string
  console.log("original string: ", str);
  //1
  //const regex = /hello/; //To match specific characters in a string, you can use Regular Expressions or "regex" for short.
  //The current pattern will match the exact text "hello", which is not the desired behavior. Instead, you want to search for +, -, or spaces. Replace the pattern in your regex variable with \+- to match plus and minus characters.

  //2
  //const regex = /\+-\s/; //we want to only get number so we remove any other value except number starting with +, -, and space " " symbol

  //3
  //const regex = /[+-\s]/; //Your current pattern won't work just yet. /+-\s/ looks for +, -, and a space in order. This would match +- hello but would not match +hello. To tell the pattern to match each of these characters individually, you need to turn them into a character class. This is done by wrapping the characters you want to match in brackets. For example, this pattern will match the characters h, e, l, or o /[helo]/. Note that you no longer need to escape the + character, because you are using a character class.

  //4
  const regex = /[+-\s]/g;
  //Regex can also take specific flags to alter the pattern matching behavior. Flags are added after the closing /. The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match. Here is an example: const helloRegex = /hello/g;

  return str.replace(regex, ""); //JavaScript provides a .replace() method that enables you to replace characters in a string with another string. This method accepts two arguments. The first argument is the character sequence to be replaced, which can be either a string or a regex pattern. The second argument is the string that replaces the matched sequence. Since strings are immutable, the replace method returns a new string with the replaced characters.
}

//testing the cleaning string function
console.log(cleanInputString("+-99"));

function isInvalidInput(str) {
  // In HTML, number inputs allow for exponential notation (such as 1e10). You need to filter those out.

  //1
  //const regex = /e/i; //The e in a number input can also be an uppercase E. Regex has a flag for this, however – the i flag, which stands for "insensitive".

  //2
  //const regex = /[0-9]e[0-9]/i; //Number inputs only allow the e to occur between two digits. To match any number, you can use the character class [0-9]. This will match any digit between 0 and 9.

  //3
  //const regex = /[0-9]+e[0-9]+/i; //The + modifier in a regex allows you to match a pattern that occurs one or more times. To match your digit pattern one or more times, add a plus after each of the digit character classes. For example: [0-9]+.

  //4
  const regex = /\d+e\d+/i; //There is a shorthand character class to match any digit: \d. Replace your [0-9] character classes with this shorthand.

  return str.match(regex); //Strings have a .match() method, which takes a regex argument. .match() will return an array of match results – containing either the first match, or all matches if the global flag is used.
}

//test the checking invalid input function 
console.log(isInvalidInput("1e3")); // result = [ '1e3', index: 0, input: '1e3', groups: undefined ] -> The match method returns an array with any matches found in the string.
console.log(isInvalidInput("10")); //null in JavaScript is a special primitive that represents the intentional absence of a value. In a boolean context, null is considered falsy which evaluates to false in a conditional statement.

function addEntry() {
  //const targetId = "#" + entryDropdown.value; //this will contain the id of selected dropdown target for example #breakfast
  

  //1
  //const targetInputContainer = document.querySelector(targetId + ' .input-container');  //this will create am imitation that works as css selector for example #breakfast .input-container

  //2
  //const targetInputContainer = document.querySelector(`${targetId} .input-container`);

  //3
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length+1;
  
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories" >`; //store literals sting of a HTML element (Label and Input).

  //1
  //targetInputContainer.innerHTML += HTMLString; //concat the HTML string to targetInputContainer
  //Your other bug occurs if you add a Breakfast entry, fill it in, then add a second Breakfast entry. You'll see that the values you added disappeared. This is because you are updating innerHTML directly, which does not preserve your input content. Change your innerHTML assignment to use the insertAdjacentHTML() method of targetInputContainer instead. Do not pass any arguments yet.

  //2
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) {
  //e stands for event, bcoz this function is a eventListener function
  e.preventDefault(); //this will prevent an event to do what it's meant to do, like submit button will reload page when clicked, and checkbox will check the box if clicked, check more default action of an event.
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type="number"]'); //will store all breakfast entries inputs.
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  //calculate the calories
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs); 
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); //basically bcoz the function use an array or nodelist to work, we need to make the budgetNumberInput treated as an array by placing it on array []
  //You also need to get the value of your #budget input. You already queried this at the top of your code, and set it to the budgetNumberInput variable. However, you used getElementById, which returns an Element, not a NodeList. A NodeList is an array-like object, which means you can iterate through it and it shares some common methods with an array. For your getCaloriesFromInputs function, an array will work for the argument just as well as a NodeList does. Declare a budgetCalories variable and set it to the result of calling getCaloriesFromInputs – pass an array containing your budgetNumberInput as the argument.

  if(isError) {
    //because if the getCaloriesFromInputs has a wrong input, it will set isError to true
    return;
  }
}

function getCaloriesFromInputs(list) {
  let calories = 0;
  for(const item of list) {
    //The NodeList values you will pass to list will consist of input elements. So you will want to look at the value attribute of each element.
    const currVal = cleanInputString(item.value);  //cleaning the input
    const invalidInputMatch = isInvalidInput(currVal); //cleaning & storing invalid input
    if(invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`); //tell the user there is invalid input using alert
      isError = true;
      return null;
    }
    calories += Number(currVal); //curval is in string format so we need to make it Number
  }
  return calories;
}

//apply function
addEntryButton.addEventListener('click', addEntry);













