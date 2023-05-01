const posts = [
    { title: 'post one', body: 'this is post 1' },
    { title: 'post two', body: 'this is post 2' }
  ];
  
  let usertime = [new Date()];
  
  function getpost() {
    setTimeout(() => {
      console.log(posts)
      },1000);
      
    }
  
  
  function createpost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        posts.push(post);
        const error = false;
        if (!error) {
          resolve();
        } else {
          reject('error : something is wrong');
        }
      }, 2000);
    });
  }
  
  function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newdate= new Date();
        usertime.push(newdate)
        resolve();
      }, 1000);
    });
  }

  function deletepost()
  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          posts.pop()
          resolve();
        }, 2000);
      });
  }
  
//   createpost({ title: 'post 3', body: 'yeah this is post 3' })
//     .then(function () {
//       console.log(`before creating ${posts[posts.length-1].title}`, usertime);
      
//       updateLastUserActivityTime().then(() => {
//         console.log(`after creating ${posts[posts.length-1].title}`, usertime);
//       });
//     });

Promise.all([createpost({ title: 'post 3', body: 'yeah this is post 3' })
,updateLastUserActivityTime()]).then(()=>{
    console.log(`before creating ${posts[posts.length-1].title}`,'user activity time'+ usertime[usertime.length-2]);
    console.log('after creating '+`${posts[posts.length-1].title}`+'user activity time is'+`${usertime[usertime.length-1]}`);
    getpost();
    console.log('last activity time of user'+`${usertime[usertime.length-1]}`)
    deletepost()
    .then(()=>{
        console.log(posts)
    })
})
  