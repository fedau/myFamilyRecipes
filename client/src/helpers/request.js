class Request {
    //Fetch data from api
    async get(url){
        const result = await fetch(url); //setup a proxy in package json because this is a react url right now
        return result.json()
    }

    delete(url){
        return fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"}
        })
    }

    post(url, payload) {
        return fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

    // post(url, payload){
    //     return fetch(url, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: payload
    //     })
    // }
    


        put(url, payload){
            return fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(payload)
            })
        }
    }



export default Request;
