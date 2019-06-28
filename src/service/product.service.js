const data = {
    productsData : [
        { id : '1',language : 'React JS', project : 'Sidecar Learning',date:'02/25/2018' ,img:''},
        { id : '2',language : 'Angular JS', project : 'John Snow Labs',date:'12/25/2018',img:'' },
        { id : '3',language : 'Vue JS', project : 'Udemy' ,date:'02/25/2018',img:''},
        { id : '4',language : 'Electron JS', project : 'Trello' ,date:'02/05/2018',img:''},
        { id : '5',language : 'Native', project : 'Rastrack' ,date:'02/04/2019',img:''},
        { id : '6',language : 'React JS', project : 'Sidecar' ,date:'08/02/2018',img:''},
        { id : '7',language : 'Molecular Framework', project : 'Nero' ,date:'13/10/2019',img:''},
        { id : '8',language : 'Java', project : 'Udp' ,date:'05/05/2018',img:''},
        { id : '9',language : 'Design', project : 'Live' ,date:'06/09/2019',img:''}
    ]
};

export const productService={
    getProduct,
    getProductById,
    editProject,
    deleteProj
};
function getProduct(){
    return new Promise((resolve ,reject)=>{
       try{
           return resolve(data);
       }
       catch{
           return reject("ERROR");
       }
    } )
}

function getProductById(id){
    return new Promise((resolve ,reject)=>{
        try{
            let filteredData = data.productsData.filter(obj=>obj.id===id);
            return resolve(filteredData);
        }
        catch{
            return reject('error');
        }
    })
}

function editProject(eData){
    return new Promise((resolve,reject)=>{
        try{
            let index=data.productsData.findIndex(e=>e.id===eData.id);
            return resolve(data.productsData.splice(index,1,eData));
        }
        catch{
            return reject('error');
        }
    })
}

function deleteProj(pid){
    return new Promise((resolve,reject)=>{
        try{
            let index=data.productsData.findIndex(e=>e.id===pid);
            return resolve(data.productsData.splice(index,1));
        }
        catch{
            return reject('err');
        }
    })
}