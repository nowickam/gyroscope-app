import * as firebase from 'firebase';



export function cleanup(){
    let gyro=firebase.database().ref('/gyroscope/2020-2-15');
    let acc=firebase.database().ref('/accelerometer/2020-2-15');

    console.log("CLEANUP");
    let i=0;
    
    gyro.once('value')
    .then(snapshot=>{
        snapshot.forEach(data=>{
            if(i===0 && data.key.substr(data.key.length-2)==="_1"){console.log(data.key);i++}
            if(data.key.substr(data.key.length-2)==="_1"){
                console.log("Inside if")
                let oldRef=firebase.database().ref('/gyroscope/2020-2-15/'+data.key);
                let newRef=firebase.database().ref('/gyroscope/2020-2-16/'+data.key.substr(0,data.key.length-2));
                moveRecord(oldRef,newRef)
            }            
        })
    })
    .catch(e=>console.log(e))
    .finally(()=>console.log("CLEANUP DONE!"))
}

function moveRecord(oldRef, newRef) {  
    console.log("Moving!");  
    oldRef.once('value', function(snap)  {
         newRef.set( snap.value(), function(error) {
              if( !error ) {  oldRef.remove(); console.log("Moved!")}
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
}