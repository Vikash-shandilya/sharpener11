// GET REQUEST
function getTodos() {
  console.log('GET Request');
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')//axios return a promise thats 
  .then(res=>{//                                                     why we use .then 
    showOutput(res)
  })
  .catch(err=>{
    console.log(err)
  })
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/posts',{title:'this is new title',body:'this is body'})
  .then((res)=>{
    showOutput(res)
  })
  .catch((err)=>{console.log(err)})
}

// PUT/PATCH REQUEST(patch just changes the content that we provide but put changes eveything )
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/posts/1',{title:'new one',body:'new body'})
  .then((res)=>{showOutput(res)})
  .catch((err)=>{console.log(err)})
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then((res)=>{showOutput(res)})
  .catch((err)=>{console.log(err)})
  console.log('DELETE Request');
}

// SIMULTANEOUS DATA//to get data from different routes simultanouesly
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://jsonplaceholder.typicode.com/photos')])
  .then(axios.spread((res1,res2)=>{showOutput(res2)}))//read about axios spread
  .catch((err)=>{console.log(err)})
}

// CUSTOM HEADERS
function customHeaders() {
  const config=
  {
    headers:{
      'ContentType':'some type',
      Authorization:'some'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/posts',{title:'new',body:'new_body'},config)
  .then((res)=>{showOutput(res)})
  .catch((err)=>{console.log(err)})
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const abc={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/posts',
    data:
    {
      title:'new one',
      body:'new_body'
    },
    transformResponse:axios.defaults.transformResponse.concat((data)=>{
      data.title=data.title.toUpperCase()
      return data

    })

  }
  axios(abc).then((res)=>{showOutput(res)})
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/posts/')
  .then((out)=>{showOutput(out)})
  .catch((err)=>{
    if(err.response)//this means response is not in range of 200
    {
      console.log(err)
      console.log(err.response.data)
      console.log(err.response.headers)
      console.log(err.response.status)

      if (err.response.status===404)
      {
        alert('page not found')
      }

    }
    else if (err.request)//means request made but no response 
    {
      console.error(err.message)
    }
    else
    {
      console.error(err.message)
    }
  })
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
  console.log('Cancel Token');
}

  


// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use((config)=>
{
  console.log(`so method ${config.method} is sent at time ${new Date()} `)
  return config
},(error)=>{
  Promise.reject(error)
}
  
)

// AXIOS INSTANCES

const axioinstance=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
});

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
