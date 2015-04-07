var Problem = function(filename, data) {
  this.filename = filename;
  this.user = '';
  this.creation_date = new Date();
  this.number = 1;

  this.description = '';
  this.topics = [];
  this.test_cases = [];
  this.keywords = [];
  this.in_vars = [];
  this.out_vars = [];

  var fileInfo = filename.split(' ');
  this.user = fileInfo[0];
  this.number = fileInfo[2].substring(0, fileInfo.length - 2);

  var pdate = fileInfo[1];
  this.creation_date = new Date( 2000 + (+pdate.substring(4,6)),
    +pdate.substring(2,4), +pdate.substring(0,2) );

  var lines = data.split('\n\n');
  this.description = lines[0];
  // # Handle tuples
  // try:
  //   self.topics = make_tuple( lines[1] )
  //   self.test_cases = make_tuple( lines[2] )
  // except Exception, e:
  //   print "ERROR CREATING TUPLE FOR FILE: " + filename
  //   raise e
  // # List attributes
  var temp = lines[3].split(',');
  for (var i in temp ) {
    this.keywords.push( temp[i].trim() );
  }
  temp = lines[4].split(',');
  for (var i in temp ) {
    this.in_vars.push( temp[i].trim() );
  }
  temp = lines[5].split(',');
  for (var i in temp ) {
    this.out_vars.push( temp[i].trim() );
  }
}

module.exports = Problem;