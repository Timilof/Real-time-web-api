const fs = require('fs');

exports.breadFetch = function(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/bread.json', function(error, data) {
      const jsonData = JSON.parse(data.toString());
      const filteredData = jsonData.data.filter(loafs => {
        return loafs.type == 'bread';
      })
      let result = {
        amount: 5,
        val: filteredData
      }
      resolve(result);
    });
  })
}

exports.topsFetch = function(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/bread.json', function(error, data) {
      const jsonData = JSON.parse(data.toString());
      const filteredData = jsonData.data.filter(top => {
        return top.type == 'topping';
      })
      let result = {
        amount: 4,
        val: filteredData
      }
      resolve(result);
    });
  })
}

exports.cheeseFetch = function(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/bread.json', function(error, data) {
      const jsonData = JSON.parse(data.toString());
      const filteredData = jsonData.data.filter(slice => {
        return slice.type == 'cheese';
      })
      let result = {
        amount: 3,
        val: filteredData
      }
      // const newNine = await getUnique(9, filteredData);
      resolve(result);
      // console.log('vanaf helper datafetch 'result.val);
    });
  })
}

exports.clickedBooks = function(body, ) {
return new Promise((resolve, reject) => {
  const resh = [];
  fs.readFile('src/bread.json', function(error, data) {
    const jsonData = JSON.parse(data.toString());
    const filteredData = jsonData.data.filter(loafs => {
      return loafs.type !== null;
    })
    // const filteredData = filteredDada.filter(loafs => {
    //   return loafs.type == 'bread';
    // })

         Object.keys(body).forEach(items=>{
             // console.log(items)
             filteredData.forEach(loafs=>{
               if (items === loafs.name){
                  resh.push(loafs)
               }
           })
           // console.log(resh, 'coming from helper')
           resolve(resh);
           //check of title in filtered data zit----- Done
           //zo ja haal ze eruit en stop ze in een array----- Done
           // render array op detail page
           // render 20 willekeurige items op detail page:----- Done
         })
})

})
}

exports.getUnique = function(count, data) {
  return new Promise((resolve, reject) => {
    const tmp = data.slice(data);
    const ret = [];
    for (let i = 0; i < count; i++) {
      let index = Math.floor(Math.random() * tmp.length);
      let removed = tmp.splice(index, 1);

      ret.push(removed[0]);
    }
    resolve(ret);
  })
}
