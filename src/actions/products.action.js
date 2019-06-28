import {productConstants} from '../constants/index';
import {productService} from '../service/product.service';

export const productAction = {
    product_display,
    handle_sorting,
    prod_by_Id,
    project_edit,
    project_delete
};

// const product_display= () => dispatch =>{
//     dispatch({
//         type:productConstants.PRODUCT_DETAILS,
//     })
// };
function product_display () {
    return dispatch => {
        return new Promise ((resolve,reject)=>{
            productService.getProduct()
                .then((data)=>{
                     dispatch({
                        type: productConstants.PRODUCT_DETAILS,
                        data:data,
                    })
                return resolve(data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        })

    }
};

function handle_sorting(data){
    return dispatch =>{
        dispatch({
            type:productConstants.PRODUCT_SORT,
            data:data
        });
    }
}

function prod_by_Id(id){
    return dispatch=>{
        return new Promise((resolve ,reject)=>{
            productService.getProductById(id)
                .then((data)=>{
                    dispatch({
                        type:productConstants.PRODUCT_DETAILS_ID,
                        data:data
                    });
                    return resolve(data);
                })
                .catch((err)=>{
                    console.log(err);
                    return reject(err);
                })
        })
    }
}

function project_edit(data){
    return dispatch=>{
        return new Promise((resolve,reject)=>{
            try{
                productService.editProject(data)
                    .then((data)=>{
                        dispatch({
                            type:productConstants.PRODUCT_EDIT,
                            data:data
                        });
                        return resolve(data);
                    })
                    .catch((err)=>{
                        console.log("err",err);
                        return reject(err);
                    })
            }
            catch{
                console.log("err");
            }
        })
    }
}

function project_delete(id){
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            try{
                productService.deleteProj(id)
                    .then((data)=>{
                        dispatch({
                            type:productConstants.PRODUCT_DELETE,
                            data:data
                        })
                    })
                    .catch((e)=>{
                        return reject(e);
                    })
            }catch{
                console.log("err");
            }
        })
    }
}