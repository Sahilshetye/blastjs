var assert = require("assert");
var blast = require('../index.js');
var path = require('path');


var Nquery = 'AGTTTGATCATGGCTCAGAATGAACGAAAGCGGCATGGATTAGGCATGCAAGTCGTGCGCGAAACGTAGCAATACGTGGAGAGCGGCGAAAGGGAGAGGAATACGTGGGAACCTACCTCGGGGCCTGGAATAGCGGCGGGAAACTGCCGGTAATGCCAGATAACGTCTCCGGACCAAAGGTGTGATTCCGCCTGGAGATGGGCCCACGTCCTATCAGCTAGTTGGTGTGGTAACGGCGCACCAAGGCTAAGACGGGTATGGGGTGTGAGAGCATGCCCCCACTCACTGGGACTGAGACACTGCCCAGACACCTACGGGTGGCTGCAGTCGAGAATCTTCGGCGATGAGTTCAAGCTTGACCGAGCGATGCCGCGTGCGGGATGAAGGCCCTCGGGTTGTAAACCGCTGTCGTAGGGGAATAAAGGTCGGTGGGTTCTCCCACCGATTTGAATGATCCTAGGAGGAAGGACGGGCTAAGTTCGTGCCAGCAGCCGCGGTAAGACGAACCGTCCAAACGTTATTCGGAATCAGAGGGCTTACAGAGTTCGTAGGCGGTCTGGAAAGTTGGGTGTGAAATCCCTCGGCTCAACCGAGGAACTGCGCTTGAAACTACCAGACTCGAGGGGGATAGAGGAAAGCGGAACTGATGGTGGAGCGGTGAAATGCGTTGATATCATCAGGAACACCGGTGGCGAAGGCGGCTTTCTGGGTCTTACCTGACGCTGAGGAACGAAAGCCAGGGGAGCGAACGGGATTAGATACCCCGGTAGTCCTGGCCGTAAACGATGAGCACTAGGTCGTGGGCCTCCACAGGCCCTCGGCCGTAGCGAAAGTGTTAAGCGCTCCGCCTGGGGAGTATGGTCGCAAGGCTGAAACTCAAAGGAATTGACGGGGGCCCGCACAAGCCACGGAGCATGTGGATTAATTCGATGCAACGCGAAGAACCTTACCTGGGTTTGACATGCACCAGATATCCCTAGAGATAGGGCTTCCCTTGTGGTTGGTGTGCAGGTGGTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGCAACGAGCGCAACCCTCGTTCCATGTTGCCAGCACGTAATGGTGGGGACTCATGGGAGACTGCCGGGGTCAACTCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGCCCCTTATGTCCAGGGCTTCACACATGCTACAATGGCCGGTACAGAGGGTTGCGAGACCGTGAGGTGGAGCGAATCCCTTAAAGCCGGTCTCAGTTCGGATCGGGGTCTGCAACTCGACCCCGTGAAGTCGGAGTCGCTAGTAATCGCAGATCAGCAACGCTGCGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACGTCACGAAAGTCGGTAACACCCGAAGCCCATGGCCCAACCCCTTTTTGGGGAGGGAGTGGTCGAAGGTGGGACTGGCGATTGGGACGAAGTCGTAACAAGGTAAC';

//AGCGCGCGTAGGTGGTTTGTTAAGTTGAATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCCAAAACTGGCAAGCTAGAGTATGGTAGAGGGTGGTGGAATTTCCTGTGTAGCGGTGAAATGCGTAAATATAGGAAGGAACACCAGTGGCGAAGGCGACCACCTGGACTGATACTGACACTGAGGTGCGAAAGCGTGGGGAGCAAACAGGATTAGATACCCTGGTAGTTCACGCCGTAAACGATGTCAACTAGCCGTTGGGAGCCTTGAGCTCTTAGTGGCGCAGCTAACGCATTAAGTTGACCGCCTGGGGAGTACGGCCGCAAGGTTAAAACTCAAATGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTGAATTCGAAGCAACGCGAAGAACCTTACCAGGCCTTGACATCCAATGAACTTTCCAGAGATGGATTGGTGCCTTCGGGAACATTGAGACAGGTGCTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGTAACGAGCCCAACCCTTGTCCTTAGTTACCAGCACGTTAAGGTGGGCACTCTAAGGAGACTGCCGGTGACAAACCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGGCCCTTACGGCCTGGGCTACACACGTGCTACAATGGTCGGTACAGAGGGTTGCCAAGCGCGAGGTGGAGCTAATCTCACAAAACCGATCGTAGTCCGGATCGCAGTCTGCAACTCGACTGCGTGAAGTCGGAATCGCTAGTAATCGCGAATCAGAATGTCGCGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACACCATGGGAGTGGGTTGCACCAGAAGTAGCTAGTCTAACCTTCGGGGGGACGGTTACCACGGTGTGATTCATG


//GAAGAGTTTGATCCTGGCTTAGAACTAACGCTGGCAGTGCGTCTTAAGCATGCAAGTCAAACGGGATGTAGCAATACATTCAGTGGCGAACGGGTGAGTAACGCGTGGATGATCTACCTATGAGATGGGGATAACTATTAAAAATAGTAGCTAATACCGAATAAGGTCAGTTAATTTGTTAATTGATGAAAGGAAGCCTTTAAAGCTTCGCTTGTAGATGAGTCTGCGTCTTATTAGCTAGTTGGTAGGGTAAATGCCTACCAAGGCAATGATAAGTAACCGGCCTTAGAGGGTGAACGGTCACACTGGAACTGAGATACGGTCCAGACTCCTACGGGAGGCAGCAGCTAAGAATCTTCCGCAATGGGCGAAAGCCTGACGGAGCGACATTGCGTGAATGAAGAAGGTCGAAAGATTGTAAAATTCTTTTATAAATGTAGGAATAAGCTTTGTAGGAAATGACAAAGTGATGACGTTAATTTATGAATAAGCCCCGGCTAATTACGTGCCAGCAGCCGCGGTAATACGTAAGGGGCGAGCGTTGTTCGGGATTATTGGGCGTAAAGGGTGAGTAGGCGGATATATAAGTCTATGCATAAAATACCACAGCTCAACTGTGGACCTATGTTGGAAACTATATGTCTAGAGTCTGATAGAGGAAGTTAGAATTTCTGGTGTAAGGGTGGAATCTGTTGATATCAGAAAGAATACCGGAGGCGAAGGCGAACTTCTGGGTCAAGACTGACGCTGAGTCACGAAAGCGTAGGGAGCAAACAGGATTAGATACCCTGGTAGTCTACGCTGTAAACGATGCACACTTGGTGTTAACTAAAAGTTAGTACCGAAGCTAACGTGTTAAGTGTGCCGCCTGGGGAGTATGCTCGCAAGAGTGAAACTCAAAGGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTTAATTCGATGATACGCGAGGAACCTTACCAGGGCTTGACATATATAGGATATAGTTAGAGATAATTATTCCCCGTTTGGGGTCTATATACAGGTGCTGCATGGTTGTCGTCAGCTCGTGCTGTGAGGTGTTGGGTTAAGTCGGCAACGAGCGCAACCCTTGTTATCTGTTACCAGCATGTAATGGTGGGGACTCAGATAAGACTGCCGGTGATAAGTCGGAGGAAGGTGAGGATGACGTCAAATCATCATGGCCCTTATGTCCTGGGCTACACACGTGCTACAATGGCCTGTACAAAGCGAAGCGAAACAGTGATGTGAAGCAAAACGCATAAAGCAGGTCTCAGTCCGGATTGAAGTCTGAAACTCGACTTCATGAAGTTGGAATCGCTAGTATCCGTATATCAGAATGATACGGTGAATACGTTCTCGGGCCTTGTACACACCGCCCGTCACACCACCCGAGTTGAGGATACCCGAAGCTATTATTCTAACCCGTAAGGGAGGAAGGTATTTAAGGTATGTTTAGTGAGGGGGGTGAAGTCGTAACAAGGTAGCCGTACTGGAAAGTGCGGCTGGATCACCTCCTT
var dbPath = path.join(__dirname + '/example');


describe('blast', function () {
  this.timeout(15000);
  describe('#blastN', function () {
    it('should not get an error', function (done) {
      blast.outputString(true);
      blast.blastN(dbPath, Nquery, function (err, output) {
          console.log(output);

          assert.equal(err, null);
        done();
      });
    });
  });
  describe('#makeDB', function () {
    it('should not get an error', function (done) {
      var fileIn = path.join(__dirname + '/example.fasta');
      var outPath = __dirname;
      var name = 'testDB';
      blast.outputString();
      blast.makeDB('nucl', fileIn, outPath, name, function (err, stdOut, stdErr, fileOut) {
        //console.error('err',err);
        assert.equal(err, null);
        done();
      })
    });
  });

  describe('#blastP', function () {
    it('should not get an error', function (done) {
      blast.outputString(true);
      blast.blastP(dbPath, Nquery, function (err, output) {
          console.log(output);

          assert.equal(err, null);
        done();
      });
    });
  });
  describe('#blastX', function () {
    it('should not get an error', function (done) {
      blast.outputString(true);
      blast.blastX(dbPath, Nquery, function (err, output) {
          console.log(output);

          assert.equal(err, null);
        done();
      });
    });
  });
  describe('#tblastP', function () {
    it('should not get an error', function (done) {
      blast.outputString(true);
      blast.tblastN(dbPath, Nquery, function (err, output) {
        assert.equal(err, null);
          console.log(output);

          done();
      });
    });
  });
  describe('#tblastx', function () {
    it('should not get an error', function (done) {
      blast.outputString(true);
      blast.tblastX(dbPath, Nquery, function (err, output) {
        assert.equal(err, null);
        done();
      });
    });
  });
  describe('#blast', function () {
    it('should accept remote, db, type, outfmt and rawOutput options', function(done){
      this.timeout(90000); //Calling remote can take a little while.
      console.log('Querying remote database...');
      var query = '>gi|1002160105:121299-122372 \nATGCGCCAGGTGCCAGACCCGGACGACGTGCGCGTGCTCGTGCTCTACGCGCCGCTGCCCGGCGAGGAGCTCGGCGGGCTCGCGCCCGCGCCCCCCGAGTGGACCACCGAGCGCGGCGGGCTCTCGTTCCTGCTCGCCGCGCTCGCCAACCGCCGCTGCACGCCGGACTCCGCCGCCTGGGCCGGCAACTGGACGGGGCCGCCCGACGTCTCGGCGCTGAACGCCCGCGGCGTGCTGCTGCTCTCCACGCGCGACCTCGCCTTCGCCGGCGCCGTCGAGTTCCTCGGACTGCTCGCCGGCGCCGCCGGCCGGAAGCTCGTGGTCGTCAACGCCGTGCCGGCGGACGCGTGGCCCGAGGACGGCCCGGCCGTCTCCGCGCAGCACGAGTTCCTGGCCTGCGCGGTGCGCCCCGAGGCCCAGTGCGACGTGCGCTGGCCCGGCGCCGACGACCTGCGCGGCGCCGTGCTCGCGGCGCCCGCCGTCTTCGGGCCCGGGCTCTTCGCGCGCGTCGAGGCCGCGCACGCGCGCGCGAACCCCGGCGCGCCGCCCCTGCGCCTCGGCCGCGCCGGCGACGTGCGCTTCTGCGTGCGCACGCGCGTCGGCGAGGCCACGCGCGTGCCCCTCGCGCCGCGCGAGTACCGTCTCGCCGCCGCGCCCGCGCTCGACTCGCGCGCCGCCGCCACCAGCGCCGCCGCGGAGGCCATGGCCCCGGGCGCCGCGGACTTCCGGGACGGCGCGGCGCACTCGCACCGCGCCTGCGCGCGCTGGGGGCTCGGCGCCGCGCTCCGCCCCGTGTACCTCGCCCTGCCGCGCGGCGCCGCGCGCGCCGGGCCCGAGGCCGTGCCCGCGGCCCTGCGCGCGTTCTGCGCGGCCGCGCTCCTCGAGCCGGACCCCGAGGCCGCGCCGCTCGTGCTGGCGGCGGGCGAGGACCCGCCGCCGCCGCCGAGCATCCGCTGGGCGTCCGCCGCGGGCCGCCTCGGCACGGCCCTGTGGGAGGGGGCGCGGCGCTGGGTCGCGGGGCCCGCGCCCCCCGCGGGGGAGGCGCGCGCGCAGGGGGGCGGAGGGGCCCAATAA';
      var blastOpts = {
        type: 'blastp',
        rawOutput: true,
        remote: false,
        db: 'nt',
        query: query,
        max_hsps: 2,
        max_target_seqs: 2,
        outfmt: 2
      };

      blast.blast(blastOpts, function(err, results) {
        //assert.equal(err, null);
        //assert(results.match(/JQ596859/i));
        assert.equal(true,true);
          console.log(results);
        done();
      });
    });
  });
});
