function alpha_numeric_filter (string) {

  let filtered_string = ''

  const letters =  Array.from('qwertyuioplkjhgfdsazxcvbnm')
  const alphabet = letters.sort().join('')
  const alpha_caps = alphabet.toUpperCase()
  const numeric = '0123456789'

  const alpha_numeric = Array.from(' ' + alphabet + alpha_caps + numeric)

  for (let i = 0; i < string.length; i++) {

    let char = string[i]
    let index = alpha_numeric.indexOf(char)
    if (index > -1) {
      filtered_string += alpha_numeric[index]
    }

  }

  return filtered_string

}

function longest_word (sentence) {

  let word = ''

  let str = alpha_numeric_filter(sentence)
  let words = str.split(' ')

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > word.length) {
      word = words[i]
    }
  }

  return word

}

// Remove all non-alphanumeric characters and preserve capitalization and spaces between words
let string = '/_&_This!&!! is!@#$% a%^&*() Sentence+=-[]{} 123:;\|\\]||~`/.,><'
console.log(alpha_numeric_filter(string)) //=> This is a Sentence 123

// Find Longest Word:
// If 2 words are identical or 2 words have the same length
// return the first instance of the identical word or
// return the first instance of the word with the same length.
let str1 = 'This is an Example. What is the Longest word in this example?!'
console.log(longest_word(str1)) //=> Example