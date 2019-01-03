const rippleLib  = require('ripple-lib').RippleAPI
const fs         = require('fs')
const api        = new rippleLib()
const lookFor    = process.argv.slice(2).map(function (f) { return f.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') })

console.log('\x1b[36m%s\x1b[0m', 'XRP Vanity Wallet Generator')
console.log('\x1b[36m%s\x1b[0m', '   by @WietseWind (Twitter) /u/pepperew (Reddit)')
console.log('')

//only look for nixer - make it possible to start with pm2
lookFor.push('nixer')

if (lookFor.length > 0) {

  console.log('Looking for wallet addresses with keywords at the start/end:')
  lookFor.forEach(function (k) {
    console.log('   - ', k)
  })
  var re = '^(r)(' + lookFor.join('|') + ')(.+)$|^(r.+)(' + lookFor.join('|') + ')$'
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
      log(' > Match: [ ' + address + ' ] with secret [ ' + account.secret + ' ]\n')
    } else {
      if (i % 100000 === 0) process.stdout.write("\r" + i + ' ')
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