"use strict";

if(!window.taylorcode) window.taylorcode = {}

taylorcode.updateModel = updateModel;

function updateModel(oldObj, newObj) {

   if (oldObj.constructor !== newObj.constructor) {
      throw new Error("updateModel: both arguments passed must be of the same type.");
   }
   if (!oldObj instanceof Object) {
      throw new Error("updateModel: arguments passed cannot be primitive.");
   }

   function compareElementsAtKey(key) {
      // property simply doesn't exist in the new object
      if (!oldObj[key]) {
         oldObj[key] = newObj[key];
      } else
         // they are both either arrays or hashes, and are not of primitive types
         if (oldObj[key].constructor === newObj[key].constructor && oldObj[key] instanceof Object) {
            updateModel(oldObj[key], newObj[key]);
         } else if (oldObj[key] !== newObj[key]) {
            // all this compares is if primitives are equal, don't reassign
            oldObj[key] = newObj[key];
         }
   }

   if (oldObj instanceof Array) {
      // we can assume at this point that they are both arrays
      if (oldObj.length > newObj.length) {
         oldObj.length = newObj.length // actually mutate the length of the old object -- remove the items that are not in it
         ;
      }
      // the lengths are the same - one to one with new and old object
      for (var i = 0; i < newObj.length; i++) {
         compareElementsAtKey(i);
      }
   } else {
      // we can assume that they are both objects
      // if the old object has any properties that are not in the new object, remove them
      for (var oldProp in oldObj) {
         if (!newObj.hasOwnProperty(oldProp)) {
            delete oldObj[oldProp];
         }
      }
      // now the properties are the same between new and old object
      for (var prop in newObj) {
         compareElementsAtKey(prop);
      }
   }
}
//# sourceMappingURL=update-model.js.map