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
console.log(isInvalidInput("1e3")); // result = [ '1e3', index: 0, input: '1e3', groups: undefined ]












