/*********************************************/
/* Oggetti, prototipi e ereditarietà / Object prototype inheritance
function Animale(eta) {
  this.eta = eta;
}
function Cane(nome, eta) {
  $this.nome = nome;
  Animale.call(this, eta);
}
Animale.prototype.corri = function() {
  console.log("Wrooom");
};
Cane.prototype = Object.create(Animale);
Cane.prototype.mangia = function() {
  console.log("GnamGnam!");
};
var Cane1 = new Cane("Pulce", 10);
var Cane2 = new Cane("Hope", 2); */

/*********************************************/
/* Ternary operator
gameStatus = gameStatus === 1 ? 0 : 1; */
/*********************************************/
/* High order Functions - Funzioni di prima classe (reference : http://reactivex.io/learnrx/)
--> map/filter/concatAll/reduce/zip
-->Tout to understand :
-1) Standard loop with for
  var names = ["Ben", "Jafar", "Matt], i;
  for(i = 0; i < names.length; i++) { console.log(names[i]); }
********
-2) Standard loop with foreach
  var names = ["Ben", "Jafar", "Matt"];
  names.forEach(function(name) { console.log(name);	});
********
-3) Proiettare un array di oggetti di film in un array di oggetti con solo id/title
  var film = [
              {"id": 70111470, "title": "Die Hard", "rating": 5 },
              {"id": 654356453,"title": "Bad Boys", "rating": 6 },
              {"id": 345643432,"title": "Dumbo"   , "rating": 7 }
            ],	arrayFilm = [];
 return arrayFilm.forEach(function(f) { arrayFilm.push({ id: f.id, title: f.title });	});
 ********
 -4) Implementazione della funzione map
 Array.prototype.map = function(projectionFunction) {
  var results = [];
	this.forEach(function(itemInArray) { results.push(projectionFunction(itemInArray));	});
	return results;
}; // JSON.stringify([1,2,3].map(function(x) { return x + 1; })) === '[2,3,4]'
********
-5) Usare map per proiettare un array di oggetti film (ex - 3) in un array di id/title
return film.map(function(x) { return { id: x.id, title: x.title }; });
********
-6) Usare foreach per selezionare solo i film (arr ex -3)  con rating > 5
film.forEach(function(f) { if (f.rating > 5) {	arrayFilm.push(f);}	});
********
-7) Implementazione di filter
Array.prototype.filter = function(predicateFunction) {
	var results = [];
	this.forEach(function(itemInArray) { if (predicateFunction(itemInArray)) { results.push(itemInArray); }	});
	return results;
}; // JSON.stringify([1,2,3].filter(function(x) { return x > 2})) === "[3]"
********
-8) Concatenare filter e map per tornare gli id dei film che hanno rating > 5
return film.filter(function(f) { return f.rating > 5; }).map(function(f) {return f.id;});
********
-9) Appiattire listafilm in un array di soli id
var listafilm = [
                  {
                    name: "New Releases",
                    film: [
                            { "id": 70111470, "title": "Die Hard", "rating": 9, "boxart": [{ w: 150, h: 200, url: "DH.jpg" },{ w: 200, h: 200, url: "DH2.jpg" }] },
                            { "id": 65435643, "title": "Bad Boys", "rating": 4, "boxart": [{ w: 150, h: 200, url: "BB.jpg" },{ w: 200, h: 200, url: "BB2.jpg" }] }
                          ]
                  },
                  {
                    name: "Dreams",
                    film: [
                            { "id": 65432445, "title": "The Chamber", "rating": 8, "boxart": [{ w: 300, h: 200, url: "TC.jpg" },{ w: 200, h: 200, url: "TC2.jpg" }] },
                            { "id": 67546511, "title": "Fracture"   , "rating": 6, "boxart": [{ w: 100, h: 200, url: "FR.jpg" },{ w: 200, h: 200, url: "FR2.jpg" }] }
                          ]
                  },
              ],	idListafilm = [];
return listafilm.forEach(function(listafilm) { listafilm.film.forEach(function(film) { idListafilm.push(film.id); });	});
********
-10) Implementazione concatAll
Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {	results.push.apply(results, subArray);	});
	return results;
}; // JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()) === "[1,2,3,4,5,6,7,8,9]"
  // [1,2,3].concatAll(); // throws an error because this is a one-dimensional array
********
-11)  Uso di map e concatAll per appiattire l'array listafilm in un array di soli id.
return listafilm.map((x) => x.film.map((y) => y.id)).concatAll();
********
-12) Recuperare id, titolo e le boxart di 150x200 per ogni film di lista film (ex -9)
// usare map(), concatAll(), and filter().
// illegale usare gli index = movieLists[0];
return listafilm.********completare*********
listafilm.map((o)=>o.film).concatAll().map((f)=>f.boxarts.filter((x)=>x.width===150&&x.height===200).map((i)=>({"id":f.id,"title":f.title,"boxart":i.url }))).concatAll()
********
-13) Implementazione concatMap()

*/

// IMPORTANTE
// return object literal from arrow function
// https://mariusschulz.com/blog/returning-object-literals-from-arrow-functions-in-javascript
