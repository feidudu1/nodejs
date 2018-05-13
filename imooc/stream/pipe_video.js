var fs = require('fs')

fs.createReadStream('./eco.mp3').pipe(fs.createWriteStream('./eco_pipe.mp3'))
