var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var _ = require('lodash');
var uuid = require('uuid');
var parseString = require('xml2js').parsestring;

export class blast{
    static stringOutput:Boolean=false;
    static customBlastLocation:string=null;


    blast(options:option, cb) {
        var nonBlastOptions = ['type', 'outputDirectory', 'rawOutput'];
        var optArr:Array<String> = [];
        var guid = uuid.v1();
        var queryString;
        var opts:option = {
            type: 'blastn',
            outputDirectory: '/tmp',
            rawOutput: false,
            db: 'nt',
            outfmt: 5
        };

        //overiding the  old options default..
        _.merge(opts, options);

        queryString = opts.query;

        if (!queryString) {
            return cb(new Error('Query must be supplied.'));
        }

        opts.query = path.join(opts.outputDirectory, guid + '.fasta');
        opts.out = path.join(opts.outputDirectory, guid + '.out');

        if(opts.remote) {
            opts.remote = '';
        }

        _.each(opts, function(value, key) {
            if(nonBlastOptions.indexOf(key) > -1){
                return;
            }

            optArr.push('-' + key);
            optArr.push(value);
        });

        fs.writeFile(opts.query, queryString, function(err) {
            if (err) {
                return cb(err);
            }

            run(opts.type + ' ' + optArr.join(' '), function(err, stdOut, stdError) {
                postBlast(err, stdOut, stdError, opts, cb);
            });

        });
        cb();
    };



    outputString(bool:Boolean) {
        blast.stringOutput = !!(!bool || bool == true);
    };

    blastN (db, query, cb) {
        blaster('blastn', db, query, cb);
    };

    blastP (db, query, cb) {
        blaster('blastp', db, query, cb);
    };

    blastX (db, query, cb) {
        blaster('blastx', db, query, cb);
    };

    tblastN (db, query, cb) {
        blaster('tblastn', db, query, cb);
    };

    tblastX (db, query, cb) {
        blaster('tblastx', db, query, cb);
    };

    //overiding the  old options default..


    makeDB(type, fileIn, outPath, name, cb) {

        if (!type) {
            return cb(new Error('no type supplied'));
        }
        if (!fileIn) {
            return cb(new Error('no file supplied'));
        }
        if (!outPath) {
            return cb(new Error('no output path supplied'));
        }

        var fileNamePartOne = fileIn.replace(/^.*[\\\/]/, '');// remove directories from path
        var filename = fileNamePartOne.substr(0, fileNamePartOne.lastIndexOf('.')); //remove file extensions

        if (outPath.slice(-1) !== '/') {
            outPath = outPath + '/'; // add / out path is one is not supplied
        }

        var fileOut = outPath + filename;

        var makeCommand = 'makeblastdb -in ' + fileIn + ' -dbtype ' + type + ' -out ' + fileOut + ' -title ' + name;
        run(makeCommand, function(err, stdOut, stdErr) {
            return cb(err, stdOut, stdErr, fileOut);
        });
        cb();
    };

}

export function lookupCustomBlastLocation() {
    var lookDir = path.join(__dirname, '../bin');
    var binStats;
    var binFiles;
    var pathToFirst;
    var innerBin;
    var innerBinStats;

    binStats = fs.lstatSync(lookDir);
    if (binStats.isDirectory()) {
        binFiles = fs.readdirSync(lookDir);
        if (binFiles.length) {
            pathToFirst = path.join(lookDir, binFiles[0]);
            innerBin = path.join(pathToFirst, 'bin');
            innerBinStats = fs.lstatSync(innerBin);
            if (innerBinStats.isDirectory()) {
                blast.customBlastLocation = innerBin;
            }
        }
    }


}

export function postBlast(err, stdOut, stdError, options, cb) {
    var outFile = options.out;
    var isRaw = options.rawOutput || blast.stringOutput || !options.outfmt.toString().match(/^(.)?5/);

    if (err) {
        return cb(err);
    }

    fs.readFile(outFile, 'utf8', function(err, data) {
        if(isRaw){
            return cb(null, data);
        }

        parseString(data, function(err, result) {
            return cb(null, result);
        });
    });
}

export function blaster(type, db, query, cb) {
    var pathW = '/tmp/' + Date.now() + '.fasta';
    fs.writeFileSync(pathW, query);

    var outPath = '/tmp/';
    var outFile = outPath + uuid.v1() + '.out';
    var blastCommand = type + ' -query ' + pathW + ' -out ' + outFile + ' -db ' + db;

    if (!blast.stringOutput) {
        blastCommand += ' -outfmt 5';
    }

    run(blastCommand, function(err, stdOut, stdError) {
        postBlast(err, stdOut, stdError, {out: outFile, outfmt: 5},  cb);
    });
}

export function run(toRun:String, cb){
    if (blast.customBlastLocation) {
        toRun = path.join(blast.customBlastLocation, toRun);
    }

    console.log('Blasting: ', toRun);
    exec(toRun, cb);
}

export interface option{

    type: 'blastn',
    outputDirectory: '/tmp',
    rawOutput: false,
    db: 'nt',
    outfmt: 5,
    remote?:String,
    query?:String,
    out?:String

}




module.exports = new blast();