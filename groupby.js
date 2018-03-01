var data = [
  { "id": 1, "lib": "A", "categoryID": 10, "categoryTitle": "Cat10", "moduleID": 2, "moduleTitle": "Workflow" },
  { "id": 2, "lib": "B", "categoryID": 10, "categoryTitle": "Cat10", "moduleID": 2, "moduleTitle": "Module 2" },
  { "id": 3, "lib": "B", "categoryID": 11, "categoryTitle": "Cat10", "moduleID": 2, "moduleTitle": "Module 2" },
  { "id": 4, "lib": "B", "categoryID": 11, "categoryTitle": "Cat10", "moduleID": 3, "moduleTitle": "Module 2" }
];

function compare(obj1, obj2) {
  let equal = false;

  Object.keys(obj1).every((e) => {
    equal = obj1[e] === obj2[e];
    return equal;
  });

  return equal;
}

function groupBy(data, id, text) {

  return data.reduce(function (rv, x) {
    let search = rv;
    id.forEach(element => {
      var index = search.findIndex(function (r) {
        return r && r[element] === x[element];
      });

      if (index >= 0) {
        if (search[index]['children']) {

          const rIndex = search.findIndex(function (r) {
            return r && compare(r, x);
          });

          if (rIndex >= 0) {
            search.splice(rIndex, 1);
          }

          search[index]['children'].push(x);
        }
        else if (compare(search[index], x)) {
          const obj = {};
          obj[element] = x[element],
            obj['children'] = [x];

          search[index] = obj;
        }

        search = search[index]['children'];

      } else {
        const obj = {};
        obj[element] = x[element],
          obj['children'] = [x];
        rv.push(obj);
        search = obj.children;
      }
    });
    return rv;
  }, []);
}

var result = groupBy(data, ['moduleID', 'categoryID', 'categoryTitle']);

console.log(result);