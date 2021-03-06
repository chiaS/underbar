/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
	  return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
	  return n > array.length ? array : (n === undefined ? array[array.length-1] : array.slice(array.length-n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
	  if(Array.isArray(collection)){
		  for(var i=0; i<collection.length; i++){
			  iterator(collection[i], i, collection);  
		  }		  
	  }else{
		  for(var prop in collection){
			  iterator(collection[prop], prop, collection);
		  }
	  }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
	var result=[];
	_.each(collection, function(item, index){
		if(test(item))
		   result.push(item);
	});
	return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
	var result=[];
	var filterResult = _.filter(collection, test);
	for(var i=0; i<collection.length; i++){
		if(filterResult.indexOf(collection[i]) === -1){
			result.push(collection[i]);
		}
	}
	return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
	  var result = [];
	  _.each(array, function(item, index){
		  if(result.indexOf(item) === -1)
			  result.push(item);
	  });
	  return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
	  var result=[];
	  _.each(collection, function(item){
		 result.push(iterator(item));
	  });
	  return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {	  		  	 
	 return _.map(collection, function(item){
		 return (typeof functionOrKey === 'function' ? functionOrKey : item[functionOrKey]).apply(item, args);
	  });  
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
	  var total = (accumulator === undefined)? collection[0] : accumulator;
	  _.each(collection, function(item){
		  return total = iterator(total, item);
	  });
	  return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) { //once the target is found, _.reduce will always return true on the rest of the items
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
	return _.reduce(collection, function(isMatch, item){
		if(!isMatch)
			return false;
		return isMatch = (iterator === undefined)? Boolean(item) : Boolean(iterator(item));
	}, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
	return  _.reduce(collection, function(isMatch, item){
		  if(isMatch) 
			  return true;
		  return isMatch = (iterator === undefined)? Boolean(_.identity(item))//_identity is the default iterator when its not provided
				  : Boolean(iterator(item));
	  }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
	  var args = arguments;	  
	  for(var i=1; i<args.length; i++){
		  for(var prop in args[i]){
			  obj[prop] = args[i][prop];
		  }
	  }
	  return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
	  var args = arguments;
	  for(var i=1; i<args.length; i++){
		  for(var prop in args[i]){
			  if(!obj.hasOwnProperty(prop)) //add new key if obj doesnt have it
				  obj[prop] = args[i][prop];
		  }
	  }
	  return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
	  var cache = []; //store objects with args and result properties
	  return function(){		 
		  var result; //for return
		  var equalArgs = true; //if there is a object in cache having the same args as arguments
		 
		  var inputArgs = arguments; // create a reference for arguments as it will be used in callback
		  //search if arguments exists in cache 
		  _.each(cache, function(item, index){
			  if(item.args.length === inputArgs.length){
				  //compare 2 array elements one by one 
				  for(var i=0; i<item.args.length; i++){
					  if(item.args[i] !== inputArgs[i]){
						  equalArgs = false; //arguments have not been computed
						  break;//stop comapring
					  }						  
				  }
			  }			  
			  //save computed result when arguments and cache args are equal
			  if(equalArgs){
				  result = item.result;				  
			  }
		  });
		 if(!equalArgs||cache.length===0){
			 //create a new obj and compute a new result with new arguments, and store it to cache	
			  var obj=new Object();//store args and return result
			  obj.args = arguments;
			  obj.result = func.apply(this, arguments);
			  cache.push(obj);
			  result = obj.result;
		 }		 
		  return result;		  
	  }
	  
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
	  var args = Array.prototype.slice.call(arguments, 2); //remove first 2 elements	  
	  var self = func;
	  setTimeout(function(){
		  self.apply(this, args);
	  }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
	  var times = array.length;
	  var result = [], arrayCopy=array.slice(0);	//make a copy
	  while(times>0){		
		  var randomIndex = Math.floor(Math.random()*times);	 
		  result.push(arrayCopy[randomIndex]);
		  arrayCopy.splice(randomIndex, 1);	//remove 1 element at a time so it won't pick the same element	 
		  times--;
	  }
	  return result;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
	  return collection.sort(function(a, b){
		  //collection is either an array of objects or values
		  if(typeof a !== 'object'){ //sort values
			 if(typeof a === 'string') //sort array by string length
				 return a.length - b.length;
			 else
				 return a-b;
		  } else{ //sort objects by iterator
			  if(typeof iterator(a) === 'string')
				  return iterator(a).length - iterator(b).length;
			  else
				  return iterator(a) - iterator(b);
		  }
	  });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
	  var args = arguments;
	  var result = [];
	  var dimension = arguments.length;
	  //run dimension rounds to fill sub-arrays
	  for(var i=0; i<dimension; i++){
		var subArray = [];
		_.each(args, function(item){
			if(item[i] === undefined)
				subArray.push(undefined);
			else
				subArray.push(item[i]);
		});
	    result.push(subArray);
	  }	
	  return result;
	  
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
	  var flattenResult = (result===undefined)? [] : result;
	  _.each(nestedArray, function(item){
		  if(Array.isArray(item)){
			  _.flatten(item, flattenResult);
		  }else{
			  flattenResult.push(item);
		  }
	  });
	  return flattenResult;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
	  var result = [];
	  var isCommon = false;
	  var arrays = arguments;
	  var shortLength, shortIndex;
	  //starts from the shortest array
	  _.each(arrays, function(array, index){
		  if(array.length < shortLength || shortLength === undefined){
			  shortLength = array.length;
			  shortIndex = index;
		  }
	  });
	  var shortArray = arguments[shortIndex];
	  for(var i=0; i<shortLength; i++){
		  _.every(arrays, function(array){
			  if(_.contains(array, shortArray[i])){
				  isCommon = true;
			  }else
				  isCommon = false;
		  });
		  if(isCommon)
			  result.push(shortArray[i]);
	  }
	  return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
	  var result = [];
	  var otherArrays = Array.prototype.slice.call(arguments, 1);
	  //loop through 'array'
	  _.each(array, function(item){
		  //diff- false: other arrays have the item,  true:other arrays do not have the item
		  var isDiff = _.reduce(otherArrays, function(diff, otherArray){
			  if(!diff)
				  return false;
			  return _.contains(otherArray, item)? false : true;				
		  }, true);
		  //at the end of the loop, push the 'array' element to result when other arrays do not have it
		  if(isDiff)
			  result.push(item);
	  })	 
	  //return result
	  return result;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
	  var result = null;
	  var timer=0;
	  var firstCall = true;
	  //newInterval - true: no function has been called in this interval;
	  //false: one function is waiting to be called
	  var newInterval = true; 	 
	  var args = Array.prototype.slice.call(arguments, 2);
	  
	  //there are 2 timers in stopwatch. One is to reset the timer every wait milliseconds, 
	  //the other one is to increase the timer. Once stopwatch is invoked, timer will be updated by itself
	  var stopwatch = function(){
		  setInterval(function(){ timer=0; newInterval=true;}, wait);//reset timer every wait duration
		  setInterval(function(){ timer+=16; }, 16);//update timer
	  }	
	  return function(){		 
		 //if this is the first call, execute the function and start the timer.
		 //the second call will be scheduled in 'wait' time, 
		 if(firstCall){
			 firstCall = false;		
			 //Dont set newInterval = false!, it will block the schedule for the 2nd call
			 result = func.apply(null, args);
			 stopwatch();//only start timer at after firstcall
		 }else if(newInterval && timer<wait){
			 //schedule the next call
			 setTimeout(function(){
				 newInterval = false; //do not accept other calls within this interval
				 result = func.apply(null, args);			 
			 }, wait);
		 }
		 return result;
	  };
	  
	  
  };

}).call(this);
