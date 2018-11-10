/*this function converts our firebase get response into an array of objects 
that we can more easily use. (see can docs)*/

const firebaseLooper = (snapshot) => {
  
  let data = [];

  snapshot.forEach((childSnapshot) => {
    //push an object with all childSnapshot values and an id value
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });

  return data;
};

export default firebaseLooper;