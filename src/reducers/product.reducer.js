import {productConstants} from '../constants/index';

// const initial = {
//       productsData : [
//           { id : '1',language : 'React JS', project : 'Sidecar Learning' },
//           { id : '2',language : 'Angular JS', project : 'John Snow Labs' },
//           { id : '3',language : 'Vue JS', project : 'Udemy' },
//           { id : '4',language : 'Electron JS', project : 'Trello' },
//           { id : '5',language : 'Native', project : 'Rastrack' },
//           { id : '6',language : 'React JS', project : 'TenderWatch' }
//
//       ]
//    };
const initial={
    products:[]
};

export const productsReducer = (state=initial , action)=>{
 switch (action.type) {
     case productConstants.PRODUCT_DETAILS:
         return {...state,products:action.data};
     case productConstants.PRODUCT_SORT:
         return {...state,products:[...action.data]};
     case productConstants.PRODUCT_DETAILS_ID:
         return {...state,products:{productsData:[...action.data]}};
     case productConstants.PRODUCT_EDIT:
         return {
           ...state,products:{productsData: [...action.data]}
         };
     case productConstants.PRODUCT_DELETE:
         return {
             ...state,products:{productsData:[...action.data]}
         };
     default :
         return state;
 }
};