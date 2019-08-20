const rippleLib  = require('ripple-lib').RippleAPI
const fs         = require('fs')
const api        = new rippleLib()
const lookFor    = []//process.argv.slice(2).map(function (f) { return f.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') })

console.log('XRP Vanity Wallet Generator')
console.log('   by @WietseWind (Twitter) /u/pepperew (Reddit)')
console.log('')

//only look for nixer - make it possible to start with pm2
lookFor.push('aphael');
lookFor.push('4phael');
lookFor.push('aph4el');
lookFor.push('apha3l');
lookFor.push('aphae1');

if (lookFor.length > 0) {

  console.log('Looking for wallet addresses with keywords at the start/end:')
  lookFor.forEach(function (k) {
    console.log('   - ', k)
  })
  var re = '^(r)(' + lookFor.join('|') + ')(.+)$'
  console.log(' ')
  console.log('For the geeks: testing regular expression: ')
  console.log('  ', re)

  const regexp = new RegExp(re, 'i')

  console.log('')
  console.log('-- Press Control C to quit --');
  console.log('')

  for (let i = 0;;i++) {
    account = api.generateAddress();
    var test = regexp.exec(account.address)
    if (test) {
      var address = ''
      if (test[1] === undefined) {
        address = test[4] + test[5]
      } else {
        address = test[1] + test[2] + test[3]
      }
      log('\n > Match: [ ' + address + ' ] with secret [ ' + account.secret + ' ]\n')
    } else {
      if (i % 1000000 === 0) log(new Date().toLocaleString() + ": checked " + i + " addresses... still continuing!")
    }
  }

} else {
  console.log('Please enter one or more keywords after the script to search for.')
  console.log('Eg. "node ' + process.argv[1] + ' johndoe mywallet pepper"')
  console.log('')
  process.exit(0)
}

function log(text) {
  // add a line to a lyric file, using appendFile
  fs.appendFileSync('xrpwallet.log', text+"\n", (err) => {  
    if (err) log(JSON.stringify(err));
  });
}