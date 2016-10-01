// ben nay la es6 ->>>>>>> es5

// // Thu goi tao 1 Promise
const findUser = new Promise((resolve, reject) => {
  // gio minh cho no delay 400ms giong nhu gia~ lap goi vao DB
  setTimeout(() => {
    resolve({name: 'admin', id:121});
  }, 400)

});

// lay babel-node test.js de~ hoc hanh` di











//async voi await nhu vay, khi nay minh bat dau 1 function cho phep cho` doi
// bang await
(async () => {

  const user = {
    name: 'teo',
    age: 22
  }

  // thang nay chay truoc, nhung vao db den 400ms nen no ra sau cunguh
  // minh giai quyet bang await
  let [userResult] = await Promise.all([findUser])

  console.log('waiting for ... userResult', userResult);

  const goldMember = [
    { name: 'Mama' },
    { name: 'Papa' },
    { name: 'Wife' },
  ];

// kieu nay goi la array destructuring
  let [ firstMember, ...otherMembers ] = goldMember;
  // kieu nay goi la object destructuring
  let {name, age} = user// ben nay phai result theo mang~ minh se lay dc gia tri


  console.log('hi, I am self execute es6', name, user, firstMember);

  console.log('other gold members', otherMembers)
})()

//mau me vl
// hieu ko cai nay tui biet roi

// hieu syntax k hieu
// master dc chua :)) de~ ma


